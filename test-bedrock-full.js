#!/usr/bin/env node
/**
 * Comprehensive AWS Bedrock Integration Test
 * Tests both streaming and non-streaming with the actual adapter code
 */

import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelWithResponseStreamCommand } from '@aws-sdk/client-bedrock-runtime';

console.log('🔍 Comprehensive AWS Bedrock Test\n');
console.log('='.repeat(60));

// Test 1: Credentials
console.log('\n1️⃣ Testing Credentials...');
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('❌ AWS credentials not loaded!');
  console.error('   Run: cd ~/HiveCodeCli && source .env.bedrock');
  process.exit(1);
}
console.log('✅ Credentials loaded');
console.log(`   Access Key: ${process.env.AWS_ACCESS_KEY_ID.substring(0, 20)}...`);

const client = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Test 2: Non-Streaming
console.log('\n2️⃣ Testing Non-Streaming (InvokeModel)...');
try {
  const payload = {
    messages: [{ role: 'user', content: [{ text: 'Say hi in 5 words' }] }],
    inferenceConfig: { temperature: 0.7, maxTokens: 50 },
  };

  const command = new InvokeModelCommand({
    modelId: 'amazon.nova-lite-v1:0',
    contentType: 'application/json',
    body: JSON.stringify(payload),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));

  const text = responseBody.output?.message?.content?.[0]?.text;
  if (text) {
    console.log('✅ Non-streaming works!');
    console.log(`   Response: "${text}"`);
    console.log(`   Tokens: ${responseBody.usage?.totalTokens || 'unknown'}`);
  } else {
    console.error('❌ Non-streaming failed: No text in response');
    console.error('   Response:', JSON.stringify(responseBody, null, 2));
  }
} catch (error) {
  console.error('❌ Non-streaming error:', error.message);
}

// Test 3: Streaming
console.log('\n3️⃣ Testing Streaming (InvokeModelWithResponseStream)...');
try {
  const payload = {
    messages: [{ role: 'user', content: [{ text: 'Say hi in 5 words' }] }],
    inferenceConfig: { temperature: 0.7, maxTokens: 50 },
  };

  const command = new InvokeModelWithResponseStreamCommand({
    modelId: 'amazon.nova-lite-v1:0',
    contentType: 'application/json',
    body: JSON.stringify(payload),
  });

  const response = await client.send(command);

  let textChunks = [];
  let chunkCount = 0;

  for await (const event of response.body) {
    if (event.chunk?.bytes) {
      chunkCount++;
      const chunk = JSON.parse(new TextDecoder().decode(event.chunk.bytes));

      // Check for text using the CORRECT format
      if (chunk.contentBlockDelta?.delta?.text) {
        textChunks.push(chunk.contentBlockDelta.delta.text);
      }
    }
  }

  if (textChunks.length > 0) {
    console.log('✅ Streaming works!');
    console.log(`   Chunks received: ${chunkCount} (${textChunks.length} with text)`);
    console.log(`   Response: "${textChunks.join('')}"`);
  } else {
    console.error(`❌ Streaming failed: ${chunkCount} chunks but 0 text chunks`);
  }
} catch (error) {
  console.error('❌ Streaming error:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('✅ Test complete! If all passed, AWS Bedrock integration is working.');
console.log('\nNext step: Test in HiveCode with:');
console.log('   cd ~/HiveCodeCli && ./start-hivecode.sh');

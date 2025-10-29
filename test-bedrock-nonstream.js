#!/usr/bin/env node
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const testNonStream = async () => {
  console.log('🔍 Testing AWS Bedrock NON-STREAMING...\n');

  const client = new BedrockRuntimeClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const payload = {
    messages: [{ role: 'user', content: [{ text: 'Say hi' }] }],
    inferenceConfig: { temperature: 0.7, maxTokens: 100 },
  };

  const command = new InvokeModelCommand({
    modelId: 'amazon.nova-lite-v1:0',
    contentType: 'application/json',
    body: JSON.stringify(payload),
  });

  try {
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log('✅ Response received!');
    console.log('\nFull response body:');
    console.log(JSON.stringify(responseBody, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testNonStream();

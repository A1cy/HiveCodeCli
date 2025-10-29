#!/usr/bin/env node
import { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand } from '@aws-sdk/client-bedrock-runtime';

const testStream = async () => {
  console.log('🔍 Testing AWS Bedrock STREAMING...\n');

  const client = new BedrockRuntimeClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const payload = {
    messages: [{ role: 'user', content: [{ text: 'Hello' }] }],
    inferenceConfig: { temperature: 0.7, maxTokens: 100 },
  };

  const command = new InvokeModelWithResponseStreamCommand({
    modelId: 'amazon.nova-lite-v1:0',
    contentType: 'application/json',
    body: JSON.stringify(payload),
  });

  const response = await client.send(command);
  
  let chunkCount = 0;
  for await (const event of response.body) {
    if (event.chunk?.bytes) {
      chunkCount++;
      const chunk = JSON.parse(new TextDecoder().decode(event.chunk.bytes));
      console.log(`Chunk ${chunkCount}:`, JSON.stringify(chunk, null, 2));
    }
  }
  
  console.log(`\n✅ Total chunks: ${chunkCount}`);
};

testStream();

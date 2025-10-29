#!/usr/bin/env node
// Test AWS Bedrock connection directly
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const testBedrock = async () => {
  console.log('🔍 Testing AWS Bedrock Connection...\n');

  // Show what credentials we're using
  console.log('Credentials:');
  console.log(`  AWS_ACCESS_KEY_ID: ${process.env.AWS_ACCESS_KEY_ID?.substring(0, 30)}...`);
  console.log(`  AWS_SECRET_ACCESS_KEY: ${process.env.AWS_SECRET_ACCESS_KEY ? '[SET]' : '[NOT SET]'}`);
  console.log(`  Region: ${process.env.BEDROCK_REGION || 'us-east-1'}\n`);

  try {
    const client = new BedrockRuntimeClient({
      region: process.env.BEDROCK_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    console.log('📤 Sending test request to amazon.nova-micro-v1:0...\n');

    const payload = {
      messages: [{ role: 'user', content: [{ text: 'Hello' }] }],
      inferenceConfig: {
        temperature: 0.7,
        maxTokens: 100,
      },
    };

    const command = new InvokeModelCommand({
      modelId: 'amazon.nova-micro-v1:0',
      contentType: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log('✅ SUCCESS! AWS Bedrock is working!\n');
    console.log('Response:', JSON.stringify(responseBody, null, 2));
  } catch (error) {
    console.error('❌ ERROR: AWS Bedrock request failed\n');
    console.error('Error details:');
    console.error(`  Name: ${error.name}`);
    console.error(`  Message: ${error.message}`);
    console.error(`  Code: ${error.code || 'N/A'}`);

    if (error.$metadata) {
      console.error(`  HTTP Status: ${error.$metadata.httpStatusCode}`);
      console.error(`  Request ID: ${error.$metadata.requestId}`);
    }

    console.error('\n💡 Troubleshooting:');

    if (error.name === 'UnrecognizedClientException' || error.message.includes('security token')) {
      console.error('  → Invalid AWS credentials');
      console.error('  → Check that your API key is active in AWS console');
      console.error('  → Verify the key hasn\'t been rotated or expired');
    } else if (error.name === 'AccessDeniedException') {
      console.error('  → Your AWS account doesn\'t have Bedrock access');
      console.error('  → Request access at: https://console.aws.amazon.com/bedrock/');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      console.error('  → Network connectivity issue');
      console.error('  → Check your internet connection');
    }

    process.exit(1);
  }
};

testBedrock();

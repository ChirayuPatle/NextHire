import { CodeSandbox } from '@codesandbox/sdk';
import env from '../configs/env-config';
import catchErrors from '../utils/catch-errors';

const sdk = new CodeSandbox(env.CSB_API_KEY);
console.log('CSB API KEY: ', sdk);
export const codeGenerationHandler = catchErrors(async (req, res) => {
  try {
    console.log('Creating sandbox...');
    const sandbox = await sdk.sandbox.create({});
    console.log('Sandbox created:', sandbox);
    res.json(sandbox);
  } catch (error) {
    console.error('Error creating sandbox:', error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
});

import { generateToken } from "../genJwtForAzure";
import * as fs from 'fs';

require('dotenv').config()

describe('JWT ', () => {
  it('should generate token', async () => {
    const JWT_AUDIENCE = 'https://login.microsoftonline.com/181724eb-b03a-43fe-806b-da9aa21606b4/v2.0'
    const PRIVATE_KEY = fs.readFileSync(process.env.PRIVATE_KEY_PATH, { encoding: 'utf-8' });
    const result = await generateToken(process.env.CLIENT_ID, PRIVATE_KEY, JWT_AUDIENCE);
    console.log(result)
    expect(result).toBeDefined()
  });
});

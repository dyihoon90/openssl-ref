import { v4 } from 'uuid';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
require('dotenv').config()

const JWT_AUDIENCE = 'https://login.microsoftonline.com/181724eb-b03a-43fe-806b-da9aa21606b4/v2.0'
const DEFAULT_ALGORITHM = 'RS512';
const PRIVATE_KEY = fs.readFileSync(process.env.PRIVATE_KEY_PATH, { encoding: 'utf-8' });

interface JWTPayload {
  sub: string;
  jti: string;
  iss: string;
  exp: number;
  nbf: number;
  [key: string]: unknown;
}

async function generateToken(
  clientApplicationId: string,
  algorithm: jwt.Algorithm = DEFAULT_ALGORITHM,
  secretKey: string = PRIVATE_KEY): Promise<string> {
  const payload: JWTPayload = {
    jti: v4(),
    iss: clientApplicationId,
    sub: clientApplicationId,
    nbf: moment().unix(),
    exp: moment().add(5, 'minutes').unix(),
    aud: JWT_AUDIENCE
  };
  const token = await new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { algorithm }, (err, encoded) => {
      if (!err) {
        resolve(encoded || '');
      } else {
        reject(err);
      }
    });
  }) as string;
  console.log(token)
  return token;
}

generateToken(process.argv[2] as string)

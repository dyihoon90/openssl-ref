import { v4 } from 'uuid';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
require('dotenv').config()

const DEFAULT_ALGORITHM = 'RS256';

interface JWTPayload {
  sub: string;
  jti: string;
  iss: string;
  exp: number;
  nbf: number;
  [key: string]: unknown;
}

/**
 *
 * @param clientApplicationId The client application ID from Azure AD. Passed to client during onboarding
 * @param algorithm The algo of this key. defaults to RS256
 * @param secretKey the private key. See exampleKey.pem for reference
 * @param audience The audience of this JWT.
 * @example 'https://login.microsoftonline.com/181724eb-b03a-43fe-806b-da9aa21606b4/v2.0'
 */
export async function generateToken(
  clientApplicationId: string,
  secretKey: string,
  audience: string,
  algorithm: jwt.Algorithm = DEFAULT_ALGORITHM,
): Promise<string> {
  const payload: JWTPayload = {
    jti: v4(),
    iss: clientApplicationId,
    sub: clientApplicationId,
    nbf: moment().unix(),
    exp: moment().add(5, 'minutes').unix(),
    aud: audience
  };
  const token = await new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { algorithm, header: { x5t: process.env.CERT_THUMBPRINT } }, (err, encoded) => {
      if (!err) {
        resolve(encoded || '');
      } else {
        reject(err);
      }
    });
  }) as string;
  return token;
}

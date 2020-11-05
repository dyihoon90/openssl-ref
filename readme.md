# To generate JWT for Azure AD OAuth2

## Steps

1. Generate the cert thumbprint for the JWT header. Azure requires a `x5t` which is the thumbprint of the x509 cert.

   Generate the thumbprint with `npm run gen-cert-thumbprint -- exampleCert.pem`

2. Create a `.env` file from `.env.template` and add the relevant fields, including the client ID and the cert thumbprint generated in step 1

3. Running `npm test`. See `__tests__/index.test.ts` for more information on how to use the `generateToken` function

TODO:

- make into a library that takes in all the relevant params to generate the JWT

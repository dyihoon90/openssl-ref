# more info: https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs

to generate pte key + CSR signed with pte key:
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365

to read:
openssl x509 -in exampleCert.pem -text

# to gen thumbprint for Azure
echo $(openssl x509 -in exampleCert.pem -fingerprint -noout) | sed 's/SHA1 Fingerprint=//g' | sed 's/://g' | xxd -r -ps | base64

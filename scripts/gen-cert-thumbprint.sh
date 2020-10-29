# usage: sh gen-cert-thumbprint exampleCert.pem
# output example: nLQOUw+YVciaTGcke3cRoYohw3k=
# for gen-jwt, add this line in the .env file: CERT_THUMBPRINT=nLQOUw+YVciaTGcke3cRoYohw3k=

PATH_TO_CERT=$1

echo $(openssl x509 -in $PATH_TO_CERT -fingerprint -noout) | sed 's/SHA1 Fingerprint=//g' | sed 's/://g' | xxd -r -plain | base64

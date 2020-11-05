# API Security

## Authenticity
Bearer proves he is who he is
## Authorization
Bearer is authorized to access some things, but when trying to access something else, the system will reject him
## Message Integrity
Ensuring there is no tampering of the request, header & body. TLS does this. To ensure integrity on HTTP appliaction request layer, see `http signature` for more info
## Replay attacks
Even if attacker cannot a generate token to access protected resources, he can steal a token and use it to access protected resources
To mitigate, tokens should have a short lifespan

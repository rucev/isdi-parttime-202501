curl -X POST http://localhost:4321/users/auth \
    -H "Content-Type: application/json" \
    -d '{"email": "percy@mail.com", "password": "12345Aa!"}' -v
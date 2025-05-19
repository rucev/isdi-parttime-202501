curl -X PATCH http://localhost:4321/users/email \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic 681d025ca644d79dddf3e3f3" \
    -d '{"email": "percy1@mail.com"}' -v
curl -X PATCH http://localhost:4321/users/password \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic 681d025ca644d79dddf3e3f3" \
    -d '{"new-password": "54321Aa!", "old-password": "12345Aa!"}' -v
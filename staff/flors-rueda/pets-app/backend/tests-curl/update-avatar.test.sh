curl -X PATCH http://localhost:4321/users/avatar \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic 681a579d433c0c69a5a4174a" \
    -d '{"avatar": "https://img.pokemondb.net/artwork/large/umbreon.jpg"}' -v
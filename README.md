# Disney Parents Api

https://disney-parent-api.herokuapp.com/api

## Authentication

#### /parents

| Method | Endpoint  | Description                                                                                                    |
| ------ | --------- | -------------------------------------------------------------------------------------------------------------- |
| POST   | /register | Requires {"username" or "orgName"} and {"password"}. Returns the new user, but doesn't send back the password. |
| POST   | /login    | Requires {"username" or "orgName"} and {"password"}. Returns a JWT token.                                      |

## Requests

[*] All endpoints from this point forward are protected. You must send back your login token on headers as "Authorization": \`\$\{token\}\` to access these.

#### /requests

| Method | Endpoint | Description                                                                                                                                                                                                                                        |
| ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /        | Returns all of the requests in the database.                                                                                                                                                                                                       |
| POST   | /        | Expects an object containing: {parents_id: integer, atLocation: string, atTime: HH:MM, num_kids: integer. <br /> - parents_id should come from the parent that is logged in and making the request. <br /> [-] Organizations cannot make requests. |

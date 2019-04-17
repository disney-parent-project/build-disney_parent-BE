# Disney Parents Api

https://disney-parent-api.herokuapp.com/api/parents

## Authentication

| Method | Endpoint  | Description                                                                                                    |
| ------ | --------- | -------------------------------------------------------------------------------------------------------------- |
| POST   | /register | Requires {"username" or "orgName"} and {"password"}. Returns the new user, but doesn't send back the password. |
| POST   | /login    | Requires {"username" or "orgName"} and {"password"}. Returns a JWT token.                                      |

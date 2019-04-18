# Disney Parents Api

https://disney-parent-api.herokuapp.com/api

## Authentication

#### /parents

| Method | Endpoint  | Description                                                                                                    |
| ------ | --------- | -------------------------------------------------------------------------------------------------------------- |
| POST   | /register | Requires {"username" or "orgName"} and {"password"}. Returns the new user, but doesn't send back the password. |
| POST   | /login    | Requires {"username" or "orgName"} and {"password"}. Returns a JWT token.                                      |

## Requests

All endpoints from this point forward are protected.

- You must send back your login token on headers as "Authorization": \`\$\{token\}\` to access these.

#### /requests

| Method | Endpoint          | Description                                                                                                                                                                          |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | /                 | Returns all of the requests in the database.                                                                                                                                         |
| GET    | /parent           | Returns all parents.                                                                                                                                                                 |
| GET    | /parent/:parentId | Use dynamic id to get a specific parent.                                                                                                                                             |
| POST   | /:parentId        | Use dynamic id from logged in parent. Expects an object containing: {atLocation: string, atTime: HH:MM, num_kids: integer. <br />- Organizations cannot make requests.               |
| PUT    | /:requestId       | Use dynamic id for specific request to update. Expects an object containing: {atLocation: "string", atTime: "HH:MM", num_kids: integer}. <br />- Organizations cannot make requests. |
| DELETE | /requestId        | Use dynamic id to delete specific request.                                                                                                                                           |

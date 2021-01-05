# Day12-2

## Getting Started
1. use `.env.template` to make `.env` file and define environment variables
2. POST https://09gnyaio0i.execute-api.us-east-1.amazonaws.com/dev/v1/users with JSON data containing `username` and `password`, and check the returned status code `201`.  
(use `$ curl -X POST --url https://09gnyaio0i.execute-api.us-east-1.amazonaws.com/dev/v1/users --data '{"username":"user1","password":"mypassword"}' -H 'Content-type: application/json' -i`)
3. POST https://09gnyaio0i.execute-api.us-east-1.amazonaws.com/dev/v1/users/login with JSON data containing `username` and `password`, and check the returned status code `200` and the token.  
(use `$ curl -X POST --url https://09gnyaio0i.execute-api.us-east-1.amazonaws.com/dev/v1/users/login --data '{"username":"user1","password":"mypassword"}' -H 'Content-type: application/json' -i`)
4. GET https://09gnyaio0i.execute-api.us-east-1.amazonaws.com/dev/v1/testValidate with a valid JWT and check returned status code `200`. 
5. Throw some bad data to the endpoints to test error handling.
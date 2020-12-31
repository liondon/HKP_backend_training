# Day 5-6

## Getting Started

### Prerequisites
```
npm
MongoDB
```

### Installing
1. `git clone` this repo
2. `cd HKP_backend_training/day5`
3. run `npm install` to install required packages
8. run `npm run dev` and check the result logged in the console
9. POST `/users/create` with body(urlencoded) = `{username: $USERNAME, password: $PASSWORD}` and check the following:
    - returned HTTP code = `201 CREATED`,
    - response body contains the `token: $JWT` 
10. POST `/users/login` with the same body as last step and check the following:
    - returned HTTP code = `200 SUCCEED`,
    - response body contains the `token: $JWT` 
11. POST `/items` with body(urlencoded) = `{token: $JWT, name: $itemName, quantity: $itemQantity}` and check the following:
    - returned HTTP code = `201 CREATED`
    - response body contains the item
12. GET `/itmes` with Authorization header = `Bearer $JWT` and check the following:
    - returned HTTP code = `200 SUCCEED`
    - response body contains the items
13. DELETE `/items/:id` with Authorization header = `Bearer $JWT` and check the following:
    - returned HTTP code = `204 NO CONTENT`
14. Test the endpoints with more error and check the returned status code and message.

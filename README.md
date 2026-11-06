# 1-JavaScript Challenges

Three small JavaScript functions (no libraries, no database) that practice input validation and returning clear results.

## Run

You only need [Node.js](https://nodejs.org).

```bash
node index.js
```

## Levels

Every function returns an object with `success: true` or `success: false` and an `error` message.

### Level 01 - `cleanUsername(username)`

Cleans a username: removes spaces at the start and end, and converts it to lowercase.

Rules:
- must be a string
- at least 3 characters
- at most 10 characters

```js
cleanUsername("  Chakib ");
// { success: true, username: "chakib" }

cleanUsername("ab");
// { success: false, error: "invalid too short" }

cleanUsername("averylongusername");
// { success: false, error: "invalid too long" }

cleanUsername(123);
// { success: false, error: "invalid" }
```

### Level 02 - `login(email, password)`

Checks an email and a password against a small list of users stored in an array.

```js
login("user@gmail.com", "user2026");
// { success: true, token: "ZDhit4z6d3z" }

login("newuser@gmail.com", "123456789");
// { success: false, error: "user not found in data base" }

login("user@gmail.com", "wrong");
// { success: false, error: "password incorrect" }
```

### Level 03 - `transferMoney(userA_balance, userB_balance, amount)`

Transfers money from user A to user B.

Rules:
- `amount` must be a number greater than 0
- user A must have enough money

```js
transferMoney(5000, 200, 1000);
// { success: true, newbalanceA: 4000, newbalanceB: 1200 }

transferMoney(5000, 200, -500);
// { success: false, error: "invalid amount" }

transferMoney(100, 200, 1000);
// { success: false, error: "invalid" }
```

## Notes

This is a learning project. The users and passwords are written directly in the code, and the token is a fixed string. A real app would hash passwords and generate a different token for each login.
# 2-Username & Password Generator API

A simple API built with Node.js and Express that generates usernames and passwords.
No database, no frontend, JSON only.

## Installation

```bash
git clone <your-repo-url>
cd username-password-api
npm install
```

## Run

```bash
npm start
```

The server starts on http://localhost:3000

## Endpoints

### GET /

Returns a welcome message and a short description of the API.

### POST /username

Generates 3 username suggestions from a name.

Request:

```json
{ "name": "chakib" }
```

Response (200):

```json
{ "usernames": ["chakib_dev", "real.chakib", "chakib_27"] }
```

Error (400): the name is missing, empty or invalid.

### POST /password

Generates a random password.

Request:

```json
{
  "length": 16,
  "include_uppercase": true,
  "include_lowercase": true,
  "include_numbers": true,
  "include_symbols": true
}
```

Response (200):

```json
{ "password": "aB7@kP2!xM9#qL4z", "length": 16 }
```

Rules:
- `length` must be an integer between 8 and 128 (default: 16)
- the `include_*` options default to `true`
- at least one character type must be selected
- the password contains at least one character of each selected type

Error (400): invalid length or no character type selected.

## Test with curl

```bash
curl -X POST http://localhost:3000/username \
  -H "Content-Type: application/json" \
  -d '{"name":"Akram"}'

curl -X POST http://localhost:3000/password \
  -H "Content-Type: application/json" \
  -d '{"length":12,"include_symbols":false}'
```
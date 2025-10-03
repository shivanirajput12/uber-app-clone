# User Registration Endpoint Documentation

## Endpoint

`POST /api/users/register`

## Description
Registers a new user in the system. Requires user details in the request body. Validates input and returns a JWT token and user data upon successful registration.

## Request Body
Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```json
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullName": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullName.firstname",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

## Notes
- All fields are required except `lastname` (but must be at least 3 characters if provided).
- Passwords are securely hashed before storage.
- Returns a JWT token for authentication after registration.

---

# User Login Endpoint Documentation

## Endpoint

`POST /api/users/login`

## Description
Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

## Request Body
Send a JSON object with the following structure:

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullName": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Please enter a valid email address",
        "param": "email",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Notes
- Both `email` and `password` are required.
- Returns a JWT token for authentication if login is successful.

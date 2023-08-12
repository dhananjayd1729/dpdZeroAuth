Follow the steps to setup this project. 

## Git clone:

    git clone git@github.com:dhananjayd1729/dpdZeroAuth.git

Just incase if you use https and not ssh follow -> 

    git clone use https://github.com/dhananjayd1729/dpdZeroAuth.git

## Install dependencies

    npm install 

## Create .env file:
    
Create .env file in root directory of project and mention all the environment variables you see below.

    PORT=<EMPTY_PORT>
    JWT_KEY=<YOUR_CHOICE>
    MYSQL_PASSWORD=<PASSWORD_OF_USER>
    MYSQL_USERNAME=<USER> i.e root,etc
    MYSQL_DATABASE=<YOUR_DB_NAME>
    MYSQL_DBHOST=<DB_HOST>

## Database Setup

Go to mysql database inside your computer using

   mysql -u root -p 

Enter your password and now, you are inside your mysql environment. Create new database using 'CREATE DATABASE <YOUR_DB_NAME>'. Go inside this database and create tables Users and Data using following SQL command.  

   CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    age int NULL,
    gender ENUM('male','female', 'non-binary') NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL, UNIQUE(email), UNIQUE(username));

    CREATE TABLE Data(
    id INT PRIMARY KEY AUTO_INCREMENT,
    key VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL, UNIQUE(key));

## Start APIs


Your database and basic setup is done. Now go to routes and start playing with each endpoints.

**User Registration** 
 
Endpoint: `POST /api/register`

Enter valid email address, password and all the details shown. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters. 

Request body :
```
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "secure_password123",
  "full_name": "John Doe",
  "age": 30,
  "gender": "male"
}
```
Response body : 

```
{
  "Success": "true",
  "message": "User successfully registered!",
  "data": {
    "user_id": "12345",
    "username": "example_user",
    "email": "user@example.com",
    "full_name": "John Doe",
    "age": 30,
    "gender": "male"
  }
}
```

*Error Codes*

- `INVALID_REQUEST` : Invalid request. Please provide all required fields: username, email, password, full_name.
-  `USERNAME_EXISTS` : The provided username is already taken. Please choose a different username.
-  `EMAIL_EXISTS` : The provided email is already registered. Please use a different email address.
-  `INVALID_PASSWORD` : The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.
-  `INVALID_AGE` : Invalid age value. Age must be a positive integer.
-  `GENDER_REQUIRED` : Gender field is required. Please specify the gender (e.g., male, female, non-binary).
-  `INTERNAL_SERVER_ERROR` : An internal server error occurred. Please try again later.


**Generate token**

Endpoint: `POST /api/token`

Enter both valid credentials and done you will see token.

Request body:

```
{
  "username": "example_user",
  "password": "secure_password123"
}
```

Response body:

```
{
  "Success": "true",
  "message": "Access token generated successfully.",
  "data": {
    "access_token": "<TOKEN>",
    "expires_in": 3600
  }
}

```

*Error Codes*

- `INVALID_CREDENTIALS` : Invalid credentials. The provided username or password is    incorrect.,
- `MISSING_FIELDS` : Missing fields. Please provide both username and password.,
- `INTERNAL_SERVER_ERROR` : An internal server error occurred. Please try again later.


**Store Data**

Store a key-value pair in the database.

Endpoint: `POST /api/data`

For Authorization: Go to headers section and choose `Authorization` : <token>.

Request body:

```
{
  "key": "unique_key",
  "value": "data_value"
}
```

Response body:

```
{
  "Success": "true",
  "message": "Data stored successfully."
}

```

*Error Codes*

- `INVALID_KEY`: The provided key is not valid or missing.
- `INVALID_VALUE`: The provided value is not valid or missing.
- `KEY_EXISTS`: The provided key already exists in the database. To update an existing key, use the update API.
- `INVALID_TOKEN`: Invalid access token provided


**Retrieve Data**

Retrieve the value associated with a specific key.

Endpoint: `GET /api/data/{key}`

For Authorization: Go to headers section and choose `Authorization` : <token>.

Response body:

```
{
  "Success": "true",
  "data": {
    "key": "unique_key",
    "value": "data_value"
  }
}
```
*Error Codes*

- `KEY_NOT_FOUND`: The provided key does not exist in the database.
- `INVALID_TOKEN`: Invalid access token provided


**Update Data**

Update the value associated with an existing key.

Endpoint: `Put /api/data/{key}`

For Authorization: Go to headers section and choose `Authorization` : <token>.

Request body:

```
{
    "value": "data_value"
}
```

Response body:

```
{
  "Success": "true",
  "message": "Data updated successfully."
}
```

*Error Codes*

- `KEY_NOT_FOUND`: The provided key does not exist in the database.
- `INVALID_TOKEN`: Invalid access token provided


**Delete Data**

Delete a key-value pair from the database.

Endpoint: `Delete /api/data/{key}`

For Authorization: Go to headers section and choose `Authorization` : <token>.

Response body:

```
{
  "Success": "true",
  "message": "Data deleted successfully."
}
```

*Error Codes*

- `KEY_NOT_FOUND`: The provided key does not exist in the database.
- `INVALID_TOKEN`: Invalid access token provided


If you have any query feel free to connect on dhananjaydaundkar1@gmail.com
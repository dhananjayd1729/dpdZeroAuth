const RegistrationErrors = Object.freeze({
  INVALID_REQUEST : "Invalid request. Please provide all required fields: username, email, password, full_name.",
  USERNAME_EXISTS : "The provided username is already taken. Please choose a different username.",
  EMAIL_EXISTS : "The provided email is already registered. Please use a different email address.",
  INVALID_PASSWORD : "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
  INVALID_AGE : "Invalid age value. Age must be a positive integer.",
  GENDER_REQUIRED : "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
  INTERNAL_SERVER_ERROR : "An internal server error occurred. Please try again later."
});

const GenerateTokenErrors = Object.freeze({
  INVALID_CREDENTIALS : "Invalid credentials. The provided username or password is incorrect.",
  MISSING_FIELDS : "Missing fields. Please provide both username and password.",
  INTERNAL_SERVER_ERROR : "An internal server error occurred. Please try again later."
})

const DataErrors = Object.freeze({
  "INVALID_KEY": "The provided key is not valid or missing.",
  "INVALID_VALUE": "The provided value is not valid or missing.",
  "KEY_EXISTS": "The provided key already exists in the database. To update an existing key, use the update API.",
  "INVALID_TOKEN": "Invalid access token provided."
})


class BadRequestError extends Error {
  constructor(status, code, message) {
    super(status, code, message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
    this.status = 'error';
    this.code = code;
    this.message = message
  }
}

class ConflictError extends Error {
  constructor(status, code, message) {
    super(status,code,message);
    this.name = 'ConflictError';
    this.statusCode = 409;
    this.status = 'error';
    this.code = code;
    this.message = message
  }
}

class ValidationError extends Error {
  constructor(status, code, message) {
    super(status,code,message);
    this.name = 'ValidationError';
    this.statusCode = 422;
    this.status = 'error';
    this.code = code;
    this.message = message
  }
}

class InternalServerError extends Error {
  constructor(status, code, message) {
    super(status,code,message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
    this.status = 'error';
    this.code = code;
    this.message = message
  }
}

module.exports = {
  RegistrationErrors,
  GenerateTokenErrors,
  DataErrors,
  BadRequestError,
  ConflictError,
  ValidationError,
  InternalServerError
};

  
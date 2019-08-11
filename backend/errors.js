/************* CUSTOM ERROR CLASSES ********************/

//ApplicationError.js => ApplicationError that extends the native Error class.
//ApplicationError is the root error from which our custom errors will extend. It provides the structure for what we want our end-state errors to look like.
class ApplicationError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;
  }
}

//Custom class for error when user is not found
class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'User Not Found. Please Sign Up', 400);
  }
}

//Custom class for when player is already checked into the court
class PlayerCheckedInError extends ApplicationError {
  constructor(message) {
    //not sure about this status code => should it be success or 400 (bad request)
    super(message || 'You are already checked in', 200);
  }
}

module.exports = { UserNotFoundError, PlayerCheckedInError };

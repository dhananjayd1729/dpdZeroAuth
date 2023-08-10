// const { StatusCodes } = require("http-status-codes");
const { GenerateTokenErrors } = require("../utils/errors");

const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(422).json({
        success: false,
        code:"MISSING_FIELDS",
        message: GenerateTokenErrors.MISSING_FIELDS,
      });
    }
  
    next();
  };

const checkServer = (error, _req, res, next) => {
  if (error.name === 'BadRequestError' || error.name === 'ConflictError' || error.name === 'ValidationError') {
    res.status(error.statusCode).json({ error: error.message });
  } else if (error.name === 'InternalServerError') {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
  }
  next();
};

  module.exports = {
    validateUserAuth,
    checkServer
  }
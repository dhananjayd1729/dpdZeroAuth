const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        data: {},
        message: "Something went wrong",
        success: false,
        err: "Email or password missing in the request.",
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
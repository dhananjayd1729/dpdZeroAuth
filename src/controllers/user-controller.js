const { ValidationError } = require("../utils/errors");
const UserService = require("../services/user-services");
const { StatusCodes } = require("http-status-codes");
const userService = new UserService();

const create = async(req, res) => {
    try {
        const userDetails = {
          email: req.body.email,
          password: req.body.password,
          full_name: req.body.full_name,
          username: req.body.username,
          age: req.body.age,
          gender: req.body.gender,
        }
        const response = await userService.create(userDetails);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            message: "User successfully registered!"
        })
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(error.statusCode).json({
            status: "error",
            code: error.code,
            message: error.message,
            err: error
        })
    }
}

const generateToken = async (req, res) => {
    try {
      const response = await userService.generateTokenAndSignIn(
        req.body.email,
        req.body.password
      );
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Access token generated successfully.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        code: error.code
      });
    }
};

const createData = async(req, res) => {
  try {
    const token = req.headers.authorization;
    await userService.isAuthenticated(token);
    await userService.createKeyValue({
          key: req.body.key,
          value: req.body.value,
    });
    
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Data stored successfully."
    })
  } catch (error) {
      console.log("Something went wrong in controller layer");
      return res.status(error.statusCode || 500).json({
          code: error.code,
          success: false,
          message: error.message,
      })
  }
}

const retrieveKey = async(req, res) => {
  try {
    const token = req.headers.authorization;
    const key  = req.params.key;
    await userService.isAuthenticated(token);
    const response = await userService.getKey(key);
    return res.status(StatusCodes.OK).json({
        success: true,
        data: {key: response.key, value: response.value}  
      })
  } catch (error) {
      console.log("Something went wrong in controller layer");
      return res.status(error.statusCode || 500).json({
          success: false,
          code: error.code,
          message: error.message,
      })
  }
}

const updateValue = async(req, res) => {
  try {
    const token = req.headers.authorization;
    const key  = req.params.key;
    const value = req.body.value;
    if(!value){
      throw new ValidationError('error', "VALUE_ERROR", "Value is missing");
    }
    await userService.isAuthenticated(token);
    await userService.findAndUpdateValue(key, value);
    return res.status(StatusCodes.ACCEPTED).json({
          success: true,
          message: "Data updated successfully."
      })
  } catch (error) {
      console.log("Something went wrong in controller layer");
      return res.status(error.statusCode).json({
          success: false,
          code: error.code,
          message: error.message
      })
  }
}

const deleteEntry = async(req, res) => {
  try {
    const token = req.headers.authorization;
    const key  = req.params.key;
    await userService.isAuthenticated(token);
    await userService.getKey(key);
    await userService.deleteKeyValueData(key);

    return res.status(StatusCodes.ACCEPTED).json({
          success: true,
          message: "Data deleted successfully."
      })
  } catch (error) {
      console.log("Something went wrong in controller layer");
      return res.status(error.statusCode || 204).json({
          success: false,
          code: error.code,
          message: error.message
      })
  }
}

module.exports = {
    create,
    generateToken,
    createData,
    retrieveKey,
    updateValue,
    deleteEntry
}
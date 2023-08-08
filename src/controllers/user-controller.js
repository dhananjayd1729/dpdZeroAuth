const UserService = require("../services/user-services");

const userService = new UserService();

const create = async(req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
            full_name: req.body.full_name,
            username: req.body.username,
            age: req.body.age,
            gender: req.body.gender,
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "User successfully registered!"
        })
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(500).json({
            data:{},
            success: false,
            message: "Something went wrong",
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
      return res.status(200).json({
        success: true,
        message: "Access token generated successfully.",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        data: {},
        message: "Something went wrong.",
        err: error,
        success: false,
      });
    }
};

const createData = async(req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const user = await userService.isAuthenticated(token);
    if(!user){
      return res.status(401).json({
        data: {},
        success: false,
        message: "Unauthorized User"
    })
    }
    const response = await userService.createKeyValue({
          key: req.body.key,
          value: req.body.value,
    });
    
      return res.status(201).json({
          data: response,
          success: true,
          message: "Data stored successfully."
      })
  } catch (error) {
      console.log("Something went wrong in controller layer");
      return res.status(500).json({
          data:{},
          success: false,
          message: "Something went wrong",
          err: error
      })
  }
}

const retrieveKey = async(req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const key  = req.params.key;
    const user = await userService.isAuthenticated(token);
    if(!user){
      return res.status(401).json({
        data: {},
        success: false,
        message: "Unauthorized User"
    })
    }
    const response = await userService.getKey(key);
    if(!response){
      return res.status(404).json({
        data: {},
        success: false,
        message: "Key not found"
    })
    }
    
    
    return res.status(200).json({
          data: response,
          success: true,
      })
  } catch (error) {
      console.log("Something went wrong in controller layer");
      return res.status(500).json({
          data:{},
          success: false,
          message: "Something went wrong",
          err: error
      })
  }
}

module.exports = {
    create,
    generateToken,
    createData,
    retrieveKey
}
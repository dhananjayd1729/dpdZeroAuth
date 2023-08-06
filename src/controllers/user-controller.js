const UserService = require("../services/user-services");

const userService = new UserService();

const create = async(req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created your account",
            err: {}
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
}
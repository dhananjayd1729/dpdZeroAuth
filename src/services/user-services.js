const { UserRepository } = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
    constructor() {
       this.UserRepository = new UserRepository();
    }

    async create(data){
        try {
            const response = await this.UserRepository.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async delete(data){
        try {
            const response = await this.UserRepository.remove(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    createToken(user){
        try {
            const token = jwt.sign(user, JWT_KEY, { expiresIn: 3600 });
            return { "token" : token, expiresIn: 3600 };
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification");
            throw error;
        }
    }
    comparePassword(userInputPassword, encryptedPassword) {
        try {
          return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
          console.log("Something went wrong in password comparison.");
          throw error;
        }
      }

    async generateTokenAndSignIn(email, plainPassword) {
        try {
          const user = await this.UserRepository.getUserByEmail(email);
          const isPasswordMatching = this.comparePassword(plainPassword, user.password);
    
          if (!isPasswordMatching) {
            console.log("Password doesn't match.");
            throw { error: "Incorrect password" };
          }
          const newJWT = this.createToken({ email: user.email, id: user.id });
          return newJWT;
        } catch (error) {
          console.log("Something went wrong in sign in process.");
          throw error;
        }
      }
}

module.exports = UserService;

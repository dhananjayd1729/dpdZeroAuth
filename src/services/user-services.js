const { UserRepository } = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { RegistrationErrors, BadRequestError, ValidationError } = require('../utils/errors');

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
    constructor() {
       this.UserRepository = new UserRepository();
    }

    async create(userData){
        try {
            if (!userData.username || !userData.email || !userData.password || !userData.full_name) {
                throw new BadRequestError('error','INVALID_REQUEST',RegistrationErrors.INVALID_REQUEST);
            }

            if(!userData.gender){
                throw new BadRequestError('error','GENDER_REQUIRED',RegistrationErrors.GENDER_REQUIRED);
            }

            if(userData.gender != "male" && 
               userData.gender != "female" && 
               userData.gender != "non-binary"){
                throw new ValidationError('error','INVALID_REQUEST',"You can choose between male, female & non-binary")
            }
            await this.UserRepository.checkUsernameExists(userData.username);
            await this.UserRepository.getUserByEmail(userData.email);
            return await this.UserRepository.createUser(userData);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async createKeyValue(data){
        try {
            const response = await this.UserRepository.generateKeyValue(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
          const response = this.verifyToken(token);
          if (!response) {
            throw { error: "Invalid token" };
          }
          const user = await this.UserRepository.getUserById(response.id);
          if (!user) {
            throw { error: "No user with corresponding token exists." };
          }
          return user.id;
        } catch (error) {
          console.log("Something went wrong in auth process.");
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

    async getKey(key){
        try {
            const response = await this.UserRepository.findKey(key);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async findAndUpdateValue(key, inputValue){
        try {
            const response = await this.UserRepository.findKeyAndUpdate(key, inputValue);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async deleteKeyValueData(key){
        try {
            const response = await this.UserRepository.deleteData(key);
            return response;
        } catch (error) {
            console.log("Something went wrong in password comparison.");
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

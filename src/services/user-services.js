const { UserRepository } = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { RegistrationErrors, GenerateTokenErrors, BadRequestError, ValidationError, DataErrors } = require('../utils/errors');

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
            if(!data.key){
                throw new ValidationError('error','KEY NOT FOUND', "Key is required field.")
            }
            if(!data.value){
                throw new ValidationError('error','INVALID_VALUE', DataErrors.INVALID_VALUE)
            }
            const key = await this.UserRepository.findKey(data.key);
            if(key){
                throw new ValidationError('error','KEY_EXISTS', DataErrors.KEY_EXISTS)
            }
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
          const user = await this.UserRepository.getUserById(response.id);
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
            if (error.name === "JsonWebTokenError"){
                throw new BadRequestError('false', 'INVALID_TOKEN', DataErrors.INVALID_TOKEN);
            };
            throw error;
        }
    }

    async getKey(key){
        try {
            const response = await this.UserRepository.findKey(key);
            return response.dataValues;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async findAndUpdateValue(key, inputValue){
        try {
            await this.UserRepository.findKey(key);
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
          const user = await this.UserRepository.getUserUsingEmail(email);
          const isPasswordMatching = this.comparePassword(plainPassword, user.password);
          
          if (!user || !isPasswordMatching) {
            throw new ValidationError('error','INVALID_CREDENTIALS', GenerateTokenErrors.INVALID_CREDENTIALS);
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

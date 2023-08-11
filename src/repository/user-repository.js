const { User, Data } = require("../models/index");
const {
  RegistrationErrors, 
  BadRequestError, 
  ConflictError,
  ValidationError, 
  InternalServerError,
  DataErrors
} = require('../utils/errors');

class UserRepository {

    async createUser(data){
        try {
            const response = await User.create(data);
            return response;
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
              let explanation = [];
              error.errors.forEach((err) => explanation.push(err.message));
              if(explanation.includes("Validation is on password failed")){
                throw new ValidationError('error','INVALID_PASSWORD',RegistrationErrors.INVALID_PASSWORD)
              }
              if(explanation.includes("Validation min on age failed")){
                throw new ValidationError('error','INVALID_AGE',RegistrationErrors.INVALID_AGE)
              }
            }
            console.log("Something went wrong in repository layer");
            throw new InternalServerError(
              'error',
              'INTERNAL_SERVER_ERROR',
              RegistrationErrors.INTERNAL_SERVER_ERROR
            );
            
        }
    }

    async remove(UserId){
        try {
            await User.destroy({
                where : {
                    id : UserId
                },
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async getUserByEmail(userEmail) {
        try {
          const user = await User.findOne({
            where: {
              email: userEmail,
            },
          });
          if (user) {
            throw new ConflictError('error','EMAIL_EXISTS',RegistrationErrors.EMAIL_EXISTS);
          }
          return user;
        } catch (error) {
          console.log("Something went wrong in repository layer.");
          throw error;
        }
    }

    async getUserUsingEmail(userEmail) {
      try {
        const user = await User.findOne({
          where: {
            email: userEmail,
          },
        });
        return user;
      } catch (error) {
        console.log("Something went wrong in repository layer.");
        throw error;
      }
  }

    async getUserById(userId) {
        try {
          const user = await User.findByPk(userId, {
            attributes: ["email", "id"],
          });
          if (!user) {
            throw new BadRequestError('error','NOT_FOUND', "User with this token doesn't exists");
          }
          return user;
        } catch (error) {
          console.log("Something went wrong in repository layer.");
          throw error;
        }
    }

    async findKey(passedKey){
        try {
            const response = await Data.findOne({ where: { key: passedKey } });
            if(response == null){
              return response;
            }
            if(!response){
              throw new ValidationError('error','KEY_NOT_FOUND', "The provided key does not exist in the database.")
            }
            return response;
          } catch (error) {
            console.log("Something went wrong in repository layer.");
            throw error;
          }
    }

    async checkUsernameExists(inputUsername){
      try {
          const user = await User.findOne({ where: { username: inputUsername } });
          if (user) {
            throw new ConflictError('error','USERNAME_EXISTS',RegistrationErrors.USERNAME_EXISTS);
          }
          return user;
        } catch (error) {
          console.log("Something went wrong in repository layer.");
          throw error;
        }
  }

    async generateKeyValue(data){
        try {
           const response = await Data.create(data);
           return response; 
        } catch (error) {
          if(error.name === 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => explanation.push(err.message));
            if(explanation.includes("key must be unique")){
              throw new ValidationError('error','INVALID_KEY', DataErrors.INVALID_KEY)
            }
          }
          console.log("Something went wrong in repository layer.");
          throw error;
        }
    }

    // async keyExists(inputKey){
    //   try {
    //     await Data.findByPk({
    //       where : {
    //           key : inputKey
    //       },
    //     });
    //   return true;
    //   } catch (error) {
    //     // if(error.name === "")
    //     console.log("Something went wrong in repository layer.");
    //     throw error;
    //   }
    // }

    async findKeyAndUpdate(inputKey, inputValue){
      try {
        const [ rowsAffected ] = await Data.update(
          { value : inputValue },
          { where: { key : inputKey } }
          );
        if (rowsAffected === 0) {
          return false;
        }
        return true;
     } catch (error) {
       console.log("Something went wrong in repository layer.");
       throw error;
     }
    }

    async deleteData(inputKey){
      try {
        await Data.destroy({
          where : {
              key : inputKey
          },
        });
      return true;
      } catch (error) {
        console.log("Something went wrong in repository layer.");
        throw error;
      }
    }
}

module.exports = {
    UserRepository
}
const { User, Data } = require("../models/index");

class UserRepository {

    async create(data){
        try {
            const response = await User.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
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
          return user;
        } catch (error) {
          console.log("Something went wrong in repository layer.");
          throw error;
        }
    }

    async findKey(passedKey){
        try {
            const response = await Data.findOne({ where: { key: passedKey } });
            console.log(response);
            return response;
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
          console.log("Something went wrong in repository layer.");
          throw error;
        }
    }

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
}

module.exports = {
    UserRepository
}
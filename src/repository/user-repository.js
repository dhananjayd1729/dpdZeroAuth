const { User } = require("../models/index");

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
}

module.exports = {
    UserRepository
}
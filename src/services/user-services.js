const { UserRepository } = require("../repository/user-repository");

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
}

module.exports = UserService;

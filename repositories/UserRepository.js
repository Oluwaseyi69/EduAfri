const UserModel = require('../models/UserModel')

class UserRepository {
    async create(user) {
        return UserModel.create(user);
    }

    async findByEmail(email) {
        return UserModel.findOne({email: email});
    }

    async findById(id){
        return UserModel.findById({id});
    }


    // async findById(userId) {
    //     return UserModel.findById(userId);
    // }

    // Update user (this can be used to update the password as well)
    async update(id, updateFields) {
        return UserModel.findByIdAndUpdate(id, updateFields, { new: true });
    }

}

module.exports = new UserRepository();

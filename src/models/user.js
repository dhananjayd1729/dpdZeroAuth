'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        isEmail : true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      validate : {
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      }
    },
    username: {
      type : DataTypes.STRING,
      unique: true,
      allowNull : false,
    },
    full_name: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    age: {
      type : DataTypes.INTEGER,
      validate: {
        min : 1
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female", "non-binary"],
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  

  User.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  });

  return User;
};
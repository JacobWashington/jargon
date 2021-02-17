"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasOne(models.profile);
    }
  }
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 99],
            msg: "First name must contain between 1 and 99 characters",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 99],
            msg: "Last name must contain between 1 and 99 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 25],
            msg: "Password must contain between 6 and 25 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  user.addHook("beforeCreate", (pendingUser) => {
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    pendingUser.password = hash;
  });

  user.prototype.validPassword = function (typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);

    return isCorrectPassword;
  };

  user.prototype.toJSON = function () {
    let userData = this.get();
    delete userData.password;

    return userData;
  };

  return user;
};

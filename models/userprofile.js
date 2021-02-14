"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userprofile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.userprofile.belongsToMany(models.registeredUser, {
        through: "userprofilesRegisteredusers",
      });
    }
  }
  userprofile.init(
    {
      employer: DataTypes.STRING,
      headline: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 100],
            msg: "Headline must contain be between 1 and 100 characters",
          },
        },
      },
      about: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 500],
            msg: "About section must contain be between 1 and 500 characters",
          },
        },
      },
      experience: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userprofile",
    }
  );
  return userprofile;
};

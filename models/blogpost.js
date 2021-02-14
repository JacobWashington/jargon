"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class blogpost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blogpost.init(
    {
      content: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 2000],
            msg: "Posts must contain be between 1 and 2000 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "blogpost",
    }
  );
  return blogpost;
};
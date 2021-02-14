"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init(
    {
      content: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 500],
            msg: "Comments must contain be between 1 and 500 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};

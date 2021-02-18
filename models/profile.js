"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.profile.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  profile.init(
    {
      headline: DataTypes.STRING,
      about: DataTypes.STRING,
      experience: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};

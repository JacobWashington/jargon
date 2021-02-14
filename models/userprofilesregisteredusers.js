'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userprofilesRegisteredusers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userprofilesRegisteredusers.init({
    registereduserId: DataTypes.INTEGER,
    userprofileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userprofilesRegisteredusers',
  });
  return userprofilesRegisteredusers;
};
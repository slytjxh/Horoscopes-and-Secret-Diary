'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.quote.hasMany(models.comment)
    }
  };
  quote.init({
    content: DataTypes.TEXT,
    authorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quote',
  });
  return quote;
};
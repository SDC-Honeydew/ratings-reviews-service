const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('characteristic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: DataTypes.INTEGER,
    name: DataTypes.TEXT
  });
}
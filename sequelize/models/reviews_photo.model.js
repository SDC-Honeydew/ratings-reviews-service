const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('reviews_photo', {
    review_id: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: false,
    indexes: [
      {
        using: 'BTREE',
        fields: ['review_id']
      }
    ]
  });
}
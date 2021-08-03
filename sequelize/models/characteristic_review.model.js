const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('characteristic_review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    characteristic_id: DataTypes.INTEGER,
    review_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    timestamps: false,
    indexes: [
      {
        using: 'BTREE',
        fields: ['characteristic_id']
      }
    ]
  });
}
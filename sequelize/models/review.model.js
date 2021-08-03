const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    date: DataTypes.BIGINT,  // remove this
    date_time: DataTypes.DATE,  // rename this to date
    summary: DataTypes.TEXT,
    body: DataTypes.TEXT,
    recommend: DataTypes.BOOLEAN,
    reported: DataTypes.BOOLEAN,
    reviewer_name: DataTypes.TEXT,
    reviewer_email: DataTypes.TEXT,
    response: DataTypes.TEXT,
    helpfulness: DataTypes.INTEGER
  }, {timestamps: false}, {
    indexes: [
      {
        name: 'reviews_product_id_idx',
        using: 'BTREE',
        fields: ['product_id']
      }
    ]
  });
}
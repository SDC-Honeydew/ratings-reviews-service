// REFACTOR THIS ENTIRE FILE
// require('dotenv').config()
// const { Sequelize, DataTypes } = require('sequelize');
// const uri = process.env.URI;
// const sequelize = new Sequelize(uri);

// MODELS
// TURN OFF LOGGING
// const Review = sequelize.define('review', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   product_id: DataTypes.INTEGER,
//   rating: DataTypes.INTEGER,
//   date: DataTypes.BIGINT,  // remove this
//   date_time: DataTypes.DATE,  // rename this to date
//   summary: DataTypes.TEXT,
//   body: DataTypes.TEXT,
//   recommend: DataTypes.BOOLEAN,
//   reported: DataTypes.BOOLEAN,
//   reviewer_name: DataTypes.TEXT,
//   reviewer_email: DataTypes.TEXT,
//   response: DataTypes.TEXT,
//   helpfulness: DataTypes.INTEGER
// }, {timestamps: false});

// const Reviews_photo = sequelize.define('reviews_photo', {
//   review_id: DataTypes.INTEGER,
//   url: DataTypes.TEXT,
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   }
// }, {timestamps: false});

// const Characteristic = sequelize.define('characteristic', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   product_id: DataTypes.INTEGER,
//   name: DataTypes.TEXT
// });

// const Characteristic_review = sequelize.define('characteristic_review', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   characteristic_id: DataTypes.INTEGER,
//   review_id: DataTypes.INTEGER,
//   value: DataTypes.INTEGER
// }, {timestamps: false});

// RELATIONS
// Review.hasMany(Reviews_photo, {
//   as: 'photos',
//   foreignKey: 'review_id'
// });
// Reviews_photo.belongsTo(Review, {
//   foreignKey: 'review_id'
// });

// Characteristic.hasMany(Characteristic_review, {
//   foreignKey: 'characteristic_id'
// });
// Characteristic_review.belongsTo(Characteristic, {
//   foreignKey: 'characteristic_id'
// })

// SYNC
const syncDb = async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
}

syncDb();

module.exports.Review = Review;
module.exports.Reviews_photo = Reviews_photo;
module.exports.Characteristic = Characteristic;
module.exports.Characteristic_review = Characteristic_review;
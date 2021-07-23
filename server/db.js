// require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('atelier', 'mattwrobel', '', {
  host: 'localhost',
  dialect: 'postgres'
});

// MODELS
const Review = sequelize.define('review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: DataTypes.INTEGER,
  rating: DataTypes.INTEGER,
  date: DataTypes.BIGINT,
  summary: DataTypes.TEXT,
  body: DataTypes.TEXT,
  recommend: DataTypes.BOOLEAN,
  reported: DataTypes.BOOLEAN,
  reviewer_name: DataTypes.TEXT,
  reviewer_email: DataTypes.TEXT,
  response: DataTypes.TEXT,
  helpfulness: DataTypes.INTEGER
}, {timestamps: false});

const Reviews_photo = sequelize.define('reviews_photo', {
  review_id: DataTypes.INTEGER,
  url: DataTypes.TEXT,
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {timestamps: false});

const Characteristic = sequelize.define('characteristic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: DataTypes.INTEGER,
  name: DataTypes.TEXT
});

const Characteristic_review = sequelize.define('characteristic_review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  characteristic_id: DataTypes.INTEGER,
  review_id: DataTypes.INTEGER,
  value: DataTypes.INTEGER
});

// RELATIONS
Review.hasMany(Reviews_photo, {
  as: 'photos',
  foreignKey: 'review_id'
});
Reviews_photo.belongsTo(Review, {
  foreignKey: 'review_id'
});

Characteristic.hasMany(Characteristic_review, {
  foreignKey: 'characteristic_id'
});
Characteristic_review.belongsTo(Characteristic, {
  foreignKey: 'characteristic_id'
})

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

// const syncReview = async () => {
//   await Review.sync();
//   console.log("The table for the Review model was just (re)created!");
// };

// const syncReviews_photo = async () => {
//   await Reviews_photo.sync();
//   console.log("The table for the Reviews_photo model was just (re)created!");
// };

// syncReview();
// syncReviews_photo();


// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// testConnection();

// const { Client, Pool } = require('pg');
// const dbConnection = new Pool(); // works like this using dotenv and .env file w/ db env variable!

// dbConnection.connect((err) => {
//   if (err) {
//     console.log('Error connecting to DB');
//   } else {
//     console.log('connected to Postgres!');
//   }
// });

// module.exports = dbConnection;

// pool.end() DO I NEED THIS?

// CAN ALSO USE CLIENT INSTEAD OF POOL -- EXPLORE THE DIFFERENCE

// const client = new Client({
//   user: 'mattwrobel',
//   host: 'localhost',
//   database: 'mydb',
//   password: '',
//   port: 5432,
// })

// client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
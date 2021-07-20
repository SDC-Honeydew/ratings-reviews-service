// require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('atelier', 'mattwrobel', '', {
  host: 'localhost',
  dialect: 'postgres'
});

// MODELS
const Review = sequelize.define('review', {
  product_id: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.BIGINT
  },
  summary: {
    type: DataTypes.TEXT
  },
  body: {
    type: DataTypes.TEXT
  },
  recommend: {
    type: DataTypes.BOOLEAN
  },
  reported: {
    type: DataTypes.BOOLEAN
  },
  reviewer_name: {
    type: DataTypes.TEXT
  },
  reviewer_email: {
    type: DataTypes.TEXT
  },
  response: {
    type: DataTypes.TEXT
  },
  helpfulness: {
    type: DataTypes.INTEGER
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {timestamps: false});

const Reviews_photo = sequelize.define('reviews_photo', {
  review_id: DataTypes.INTEGER,
  url: DataTypes.TEXT,
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {timestamps: false});

// RELATIONS
Review.hasMany(Reviews_photo, {
  foreignKey: 'review_id'
});
Reviews_photo.belongsTo(Review, {
  foreignKey: 'review_id'
});

// SYNC
const syncReview = async () => {
  await Review.sync();
  console.log("The table for the Review model was just (re)created!");
};

const syncReviews_photo = async () => {
  await Reviews_photo.sync();
  console.log("The table for the Reviews_photo model was just (re)created!");
};

syncReview();
syncReviews_photo();

module.exports.Review = Review;
module.exports.Reviews_photo = Reviews_photo;

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
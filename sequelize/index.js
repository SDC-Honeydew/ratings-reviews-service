require('dotenv').config();
const { Sequelize } = require('sequelize');
const { initModelRelations }  = require('./model_relations');
// use the test db if testing...
const uri = process.env.NODE_ENV === 'test' ? process.env.URI_TEST : process.env.URI;

const sequelize = new Sequelize(uri, {logging: false});

const modelDefiners = [
	require('./models/review.model'),
	require('./models/reviews_photo.model'),
	require('./models/characteristic.model'),
	require('./models/characteristic_review.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
};

initModelRelations(sequelize);

module.exports = sequelize;
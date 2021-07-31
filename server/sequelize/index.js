require('dotenv').config();
const { Sequelize } = require('sequelize');
const { modelRelations}  = require('./model_relations');
const uri = process.env.URI;

const sequelize = new Sequelize(uri);

const modelDefiners = [
	require('./models/review.model'),
	require('./models/reviews_photo.model'),
	require('./models/characteristic.model'),
	require('./models/characteristic_review.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
};

modelRelations(sequelize);

module.exports = sequelize;
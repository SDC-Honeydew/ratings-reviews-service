const express = require('express');
const app = express();
const sequelize = require('./sequelize');
const router = require('./router.js');
app.use(express.json());
app.use('/', router);

const assertDatabaseConnectionOk = async () => {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

const syncDb = async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
}

const init = async () => {
	await assertDatabaseConnectionOk();
	await syncDb();
}

init();

module.exports = app;
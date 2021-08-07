const sequelize = require('./index');

exports.assertDatabaseConnectionOk = async () => {
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

exports.syncDb = async () => {
  try {
		await sequelize.sync();
    console.log("All models were synchronized successfully.");
	} catch (err) {
		console.log('connection error during db sync: ', err);
	}
}
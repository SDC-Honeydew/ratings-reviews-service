const app = require('./server')
const port = 8000;
const sequelize = require('./sequelize');

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
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
  });
}

init();
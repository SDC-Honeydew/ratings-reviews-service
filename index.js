// require('newrelic');
const app = require('./server')
const port = 8000;
const { assertDatabaseConnectionOk, syncDb } = require('./sequelize/helpers');

const init = (async () => {
	await Promise.all([assertDatabaseConnectionOk(), syncDb()]);
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
  });
})();
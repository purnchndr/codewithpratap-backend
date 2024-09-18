const app = require('./app');
require('dotenv').config();
const dbConnection = require('./db');

app.listen(3000, async () => {
  await dbConnection();
  console.log('server is running on port 3000');
});

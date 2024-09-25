const Sequelize = require('sequelize');
const process = require('process');
require('dotenv').config();

db = {};
if (process.env.PROD_DB_URL) {
  sequelize = new Sequelize(process.env.PROD_DB_URL, {
    dialect: 'postgres'
  });
} else {
  const dbConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  };

  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  });
}
const modelNames = ['User', 'Event', 'Ticket', 'PurchasedTicket', 'Review', 'Category'];

modelNames.forEach(modelName => {
  const model = require(`./${modelName.toLowerCase()}`)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

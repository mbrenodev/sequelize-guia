const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connetion = new Sequelize(dbConfig)

module.exports = connetion;
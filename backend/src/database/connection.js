const knex = require('knex');
const configuration = require('../../knexfile');
const connection = knex(configuration.development);
module.exports = connection; // file para conectar com o banco de dados
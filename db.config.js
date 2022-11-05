const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('webabsensi','root','', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
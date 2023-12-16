'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const DataCollection = require('./data-collection');
const userModel = require('./users/model');
const subjectModel = require('./subjects/model'); // Import the Subjects model

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const sequelize = new Sequelize(DATABASE_URL);

const Users = userModel(sequelize, DataTypes);
const Subjects = subjectModel(sequelize, DataTypes); // Import the Subjects model

// Define the relationship between Users and Subjects
Users.hasMany(Subjects, { foreignKey: 'userId', onDelete: 'CASCADE' }); // Assuming Subjects has a 'userId' foreign key
Subjects.belongsTo(Users, { foreignKey: 'userId' });

module.exports = {
  db: sequelize,
  users: new DataCollection(Users),
  subjects: new DataCollection(Subjects),
};
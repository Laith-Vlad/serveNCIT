const { Sequelize, DataTypes } = require('sequelize');
const DataCollection = require('./data-collection');
const userModel = require('./users/model');
const subjectModel = require('./subjects/model');
const assignedSubjectsModel = require('./assingedsubjects/model'); // Import the AssignedSubjects model

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const sequelize = new Sequelize(DATABASE_URL);

const Users = userModel(sequelize, DataTypes);
const Subjects = subjectModel(sequelize, DataTypes);
const AssignedSubjects = assignedSubjectsModel(sequelize, DataTypes); // Import the AssignedSubjects model

// Define the relationship between Users and AssignedSubjects
Users.hasMany(AssignedSubjects, { foreignKey: 'userId', onDelete: 'CASCADE' });
AssignedSubjects.belongsTo(Users, { foreignKey: 'userId' });

// Define the relationship between Subjects and AssignedSubjects
Subjects.hasMany(AssignedSubjects, { foreignKey: 'subjectId', onDelete: 'CASCADE' });
AssignedSubjects.belongsTo(Subjects, { foreignKey: 'subjectId' });

module.exports = {
  db: sequelize,
  users: new DataCollection(Users),
  subjects: new DataCollection(Subjects),
  assignedSubjects: new DataCollection(AssignedSubjects),
};

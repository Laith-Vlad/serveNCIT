'use strict'

const { Sequelize, DataTypes } = require("sequelize");
const DataCollection = require("./data-collection");
const userModel = require("./users/model");




const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const sequelize = new Sequelize(DATABASE_URL);

const users = userModel(sequelize, DataTypes)




module.exports = {
    db: sequelize,
    users: new DataCollection(users),
   
} 
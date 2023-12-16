'use strict'

require('dotenv').config();
const { db } = require('./src/models');
const {start} = require('./src/server.js');
const PORT = process.env.PORT || 3002

db.sync({force:true}).then(() => {
   start(PORT);
  }).catch(err => console.log(err));
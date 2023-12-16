'use strict';

const base64 = require('base-64');
const { users } = require('../models/index');

module.exports = async (req, res, next) => {
  console.log(req.headers)

  if (!req.body.authorization) { return _authError(); }

  let basic = req.body.authorization.split(' ').pop();
  let [email, pass] = base64.decode(basic).split(':');


  try {
    req.user = await users.model.authenticateBasic(email, pass)
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}

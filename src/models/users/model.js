"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET || "secretstring";

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("Users", {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, required: true, unique: true },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      required: true,
      defaultValue: "inactive",
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      required: true,
      defaultValue: "user",
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read"],
        
          admin: ["read", "create", "update", "delete","updateStatus"],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
    if(user.role=="admin"){
      user.status == "active"
    }
  });

  model.authenticateBasic = async function (email, password) {
    try {
      const user = await this.findOne({ where: { email } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      }
      throw new Error("Invalid User");
    } catch (error) {
      throw new Error(e.message);
    }
  };
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;

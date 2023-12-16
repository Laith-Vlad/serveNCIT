"use strict";

const subjectModel = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subjects", {
   

    subjects: {
        type: DataTypes.STRING, // Adjust the data type based on your needs
        allowNull: false,
      },
      passMark: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
      },
      obtainedMark: {
        type: DataTypes.INTEGER, // Adjust the data type based on your needs
        defaultValue: null, // or adjust the default value based on your requirements
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assuming the Users model is named 'Users'
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });



  return Subject;
};

module.exports = subjectModel;
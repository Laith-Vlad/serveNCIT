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
    
    });



  return Subject;
};

module.exports = subjectModel;
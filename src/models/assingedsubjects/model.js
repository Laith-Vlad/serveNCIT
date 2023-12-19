"use strict";

const assignedSubjectsModel = (sequelize, DataTypes) => {
  const AssignedSubject = sequelize.define("AssignedSubject", { 
    subjectName:{
        type:DataTypes.STRING,
        defaultValue: null,

    },
    obtainedMark: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
   subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "subjects",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return AssignedSubject;
};

module.exports = assignedSubjectsModel; 

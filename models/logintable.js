"use strict";
module.exports = function(sequelize, DataTypes) {
  var logintable = sequelize.define(
    "logintable",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      displayname: DataTypes.STRING
    },
    {}
  );

  logintable.associate = function(models) {
    logintable.hasMany(models.liketable, {
      as: "userLike",
      foreignKey: "userId"
    });
  };

  return logintable;
};

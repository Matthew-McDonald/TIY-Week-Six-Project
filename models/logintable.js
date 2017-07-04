'use strict';
module.exports = function(sequelize, DataTypes) {
  var logintable = sequelize.define('logintable', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return logintable;
};
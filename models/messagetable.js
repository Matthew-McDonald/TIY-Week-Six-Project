'use strict';
module.exports = function(sequelize, DataTypes) {
  var messagetable = sequelize.define('messagetable', {
    textcontent: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return messagetable;
};
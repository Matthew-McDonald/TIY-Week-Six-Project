'use strict';
module.exports = function(sequelize, DataTypes) {
  var liketable = sequelize.define('liketable', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return liketable;
};
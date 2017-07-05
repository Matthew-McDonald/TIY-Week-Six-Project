'use strict';
module.exports = function(sequelize, DataTypes) {
  var messagetable = sequelize.define('messagetable', {
    textcontent: DataTypes.STRING
  }, {});

    messagetable.associate = function(models) {
      messagetable.belongsTo(models.logintable, {as : 'login', foreignKey: 'userid'})
    }

  return messagetable;
};

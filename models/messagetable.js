'use strict';
module.exports = function(sequelize, DataTypes) {
  var messagetable = sequelize.define('messagetable', {
    textcontent: DataTypes.STRING(140)
  }, {});

    messagetable.associate = function(models) {
      messagetable.belongsTo(models.logintable, {as : 'login', foreignKey: 'userid'})

      messagetable.hasMany(models.liketable, {as: 'messageLikes', foreignKey: 'postId'})
    }

  return messagetable;
};

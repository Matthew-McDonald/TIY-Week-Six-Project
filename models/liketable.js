"use strict";
module.exports = function(sequelize, DataTypes) {
  var liketable = sequelize.define(
    "liketable",
    {
      title: DataTypes.STRING
    },
    {}
  );

  liketable.associate = function(models) {
    liketable.belongsTo(models.logintable, {
      as: "userLike",
      foreignKey: "userId"
    });

    liketable.belongsTo(models.messagetable, {
      as: "postLike",
      foreignKey: "postId"
    });
  };
  return liketable;
};

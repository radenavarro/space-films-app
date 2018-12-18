'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  Actor.associate = function(models) {
    // associations can be defined here
  };
  return Actor;
};
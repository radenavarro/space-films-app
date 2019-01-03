'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  Actor.associate = function(models) {
    Actor.belongsToMany(models.Movie, {
      through: models.MovieActors,
      foreignKey: 'actorId',
      otherKey: 'movieId',
    })
  };
  return Actor;
};
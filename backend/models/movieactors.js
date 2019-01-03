'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieActors = sequelize.define('MovieActors', {
    movieId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER,
    characterName: DataTypes.STRING,
  }, {});
  MovieActors.associate = function(models) {
    // associations can be defined here
    MovieActors.belongsTo(models.Movie, {
      otherKey: 'movieId',
    });
    MovieActors.belongsTo(models.Actor, {
      otherKey: 'actorId',
    });
  };
  return MovieActors;
};
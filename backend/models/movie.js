'use strict';

// TODO: https://stackoverflow.com/questions/45501856/associate-different-models-using-sequelize

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.Actor, {
      through: models.MovieActors,
      foreignKey: 'movieId',
      otherKey: 'actorId',
    })

    Movie.belongsToMany(models.Genre, {
      through: models.MovieGenres,
      foreignKey: 'movieId',
      otherKey: 'genreId',
    })

    Movie.belongsToMany(models.User, {
      through: models.UserMovies,
      foreignKey: 'movieId',
      otherKey: 'userId',
    })
  };
  return Movie;
};
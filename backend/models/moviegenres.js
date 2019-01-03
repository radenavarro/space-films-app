'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieGenres = sequelize.define('MovieGenres', {
    movieId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {});
  MovieGenres.associate = function(models) {
    // associations can be defined here
  };
  return MovieGenres;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMovies = sequelize.define('UserMovies', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {});
  UserMovies.associate = function(models) {
    // associations can be defined here
  };
  return UserMovies;
};
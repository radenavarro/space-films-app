'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Movie, {
      through: models.UserMovies,
      foreignKey: 'userId',
      otherKey: 'movieId',
    })
  };
  return User;
};
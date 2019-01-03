'use strict';
const faker = require('faker/locale/en');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let movieGenres = [];

    for (let i = 0; i < 100; i++) {
      let movieGenre = {
        movieId: i+1,
        genreId: faker.random.number({ min: 1, max: 7 }),
      }
      movieGenres.push(movieGenre)
    }

    return queryInterface.bulkInsert('MovieGenres', movieGenres, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MovieGenres', null, {});
  }
};

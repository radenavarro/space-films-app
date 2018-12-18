'use strict';
const faker = require('faker/locale/en');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let movies = [];

    for (let i = 0; i < 100; i++) {
      let movie = {
        title: faker.lorem.words(3),
        poster: `poster${i+1}.jpg`
      }
      movies.push(movie);
    }

    return queryInterface.bulkInsert('Movies', movies, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};

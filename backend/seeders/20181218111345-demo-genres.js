'use strict';
const faker = require('faker/locale/en');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let genres = [
      {
        name: 'Horror',
      },
      {
        name: 'Comedy',
      },
      {
        name: 'Drama',
      },
      {
        name: 'Action',
      },
      {
        name: 'Adventure',
      },
      {
        name: 'Sci-Fi',
      },
      {
        name: 'Westerns',
      },
    ];

    return queryInterface.bulkInsert('Genres', genres, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
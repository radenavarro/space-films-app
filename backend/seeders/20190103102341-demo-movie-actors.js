'use strict';
const faker = require('faker/locale/en');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let movieActors = [];

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 6; j++) {
        let movieActor = {
          movieId: i+1,
          actorId: faker.random.number({ min: 1, max: 200 }),
          characterName: `${faker.name.firstName()} ${faker.name.lastName()}`
        }
        movieActors.push(movieActor);  
      }
    }

    return queryInterface.bulkInsert('MovieActors', movieActors, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MovieActors', null, {});
  }
};

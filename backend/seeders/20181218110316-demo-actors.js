'use strict';
const faker = require('faker/locale/en');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let actors = [];
    let genders = ['male', 'female'];

    for (let i = 0; i < 200; i++) {
      let gender = genders[faker.random.number(1)];
      let actor = {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        gender: gender,
        picture: `avatar-${gender}.svg`,
      }
      actors.push(actor);
    }

    return queryInterface.bulkInsert('Actors', actors, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Actors', null, {});
  }
};

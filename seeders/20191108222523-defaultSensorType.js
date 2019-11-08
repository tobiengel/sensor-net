'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SensorTypes', [{
        name: 'TemperatureSensor',
		unit: '°C',
		keyword: 'temp',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SensorTypes', null, {});
  }
};

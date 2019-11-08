'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sensors', [{
        model: 'Test',
        sensornode_id: 1,
		sensortype_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sensors', null, {});
  }
};

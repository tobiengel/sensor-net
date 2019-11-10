'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SensorNodes', [{
        name: 'Default node',
        description: 'Something has to be entered',
        coordinates: Sequelize.fn('ST_GeomFromText', 'POINT(-48.395586 11.773817)'),
		ip: '0012.4b00.1cc1.8aca',
		createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SensorNodes', null, {});
  }
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const SensorData = sequelize.define('SensorData', {
    value: DataTypes.FLOAT,
    sensor_id: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {});
  SensorData.associate = function(models) {
    SensorData.belongsTo(models.Sensor, {
		foreignKey: 'sensor_id',
		onDelete: 'CASCADE',
	});
  };
  return SensorData;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sensor = sequelize.define('Sensor', {
    model: DataTypes.STRING,
    sensornode_id: DataTypes.INTEGER,
    sensortype_id: DataTypes.INTEGER
  }, {});
  Sensor.associate = function(models) {
    Sensor.hasMany(models.SensorData, {
		foreignKey: 'sensor_id',
		as: 'data',
	});
	Sensor.belongsTo(models.SensorNode, {
		foreignKey: 'sensornode_id',
		onDelete: 'CASCADE',
	});
	
  };
  return Sensor;
};
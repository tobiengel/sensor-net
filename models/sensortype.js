'use strict';
module.exports = (sequelize, DataTypes) => {
  const SensorType = sequelize.define('SensorType', {
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
	keyword: DataTypes.STRING
  }, {});
  SensorType.associate = function(models) {  
    SensorType.hasMany(models.Sensor, {
		foreignKey: 'sensornode_id',
		as: 'sensortype'
	});
  };
  return SensorType;
};
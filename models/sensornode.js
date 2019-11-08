'use strict';
module.exports = (sequelize, DataTypes) => {
  const SensorNode = sequelize.define('SensorNode', {
    name: DataTypes.STRING,
	ip: DataTypes.STRING,
    description: DataTypes.TEXT,
    coordinates: DataTypes.GEOMETRY
  }, {});
  SensorNode.associate = function(models) {
    SensorNode.hasMany(models.Sensor, {
		foreignKey: 'sensornode_id',
		as: 'sensors',
	});
  };
  return SensorNode;
};
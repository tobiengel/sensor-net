'use strict';
module.exports = (sequelize, DataTypes) => {
  const SensorType = sequelize.define('SensorType', {
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
	keyword: DataTypes.STRING
  }, {});
  SensorType.associate = function(models) {
    // associations can be defined here
  };
  return SensorType;
};
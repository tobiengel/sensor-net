module.exports = function(app_global) {

	var express = require('express');
	var router = express.Router();
	const SensorNode = require('../models').SensorNode;
	const Sensor = require('../models').Sensor;

	router.get('/', function(req, res, next) {
		//{ include: [{ model: Sensor, as: 'sensors' }] }
	  SensorNode.findAll({ include: [{ all: true }]}).then(nodes => {
		res.render('index', { 
			title: app_global.title,
			test: 'Sensor-net variable from server',
			menuId: "test",
			nodes: nodes,
			nodesJSON: JSON.stringify(nodes)
		});
	  
	 });	
		
	  
	});
	
	return router;
};



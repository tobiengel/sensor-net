module.exports = function(app_global) {

	var express = require('express');
	var router = express.Router();
	const SensorNode = require('../models').SensorNode;
	const Sensor = require('../models').Sensor;

	router.get('/', function(req, res, next) {
		//{ include: [{ model: Sensor, as: 'sensors' }] }
	  SensorNode.findAll({ include: [{ all: true }]}).then(nodes => {
		//console.log(nodes[0].coordinates);
		res.render('index', { 
			title: app_global.title,
			menuId: "test",
			nodes: nodes,
			nodesJSON: JSON.stringify(nodes),
			center: nodes[0].coordinates.coordinates
		});
	  
	 });	
		
	  
	});
	
	return router;
};



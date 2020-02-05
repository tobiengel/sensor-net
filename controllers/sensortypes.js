module.exports = function(app_global) {

	var express = require('express');
	var router = express.Router();
	const SensorNode = require('../models').SensorNode;
	const Sensor = require('../models').Sensor;
	const SensorType = require('../models').SensorType;
	var bodyParser = require('body-parser');
	const models = require('../models');

	router.get('/new', function(req, res, next) {
		type = new SensorType();
		type.id = 0;
		type.name = "";
		type.keyword = "";
		type.unit = "";
		res.render('sensortype_edit', { 
			title: app_global.title,
			action: "add",
			menuId: "test",
			sensortype: type
		}); 	
	});
	
	router.get('/:id', function(req, res, next) {
		SensorType.findOne({
				where: { id: req.params.id }
		}).then(type => {
			res.render('sensortype', { 
				title: app_global.title,
				menuId: "test",
				sensortype: type
			}); 	  
		});
	});
	
	router.delete('/:id', function(req, res, next) {
		SensorType.destroy({
				where: { id: req.params.id }
		}).then(type => {
			res.redirect('/sensortypes/');  
		});
	});
	
	router.post('/:id/add', function(req, res, next) {
		return SensorType.create({
			name: req.body.name,
			unit: req.body.unit,
			keyword: req.params.keyword
		}).then(function (sensortype) {
			if (sensortype) {
				res.redirect('/sensortypes/');
			} else {
				res.status(400).send('Error in insert new record');
			}
		});	
	});
	
	router.get('/:id/edit', function(req, res, next) {
		SensorType.findOne({
				where: { id: req.params.id }
		}).then(type => {
			res.render('sensortype_edit', { 
				title: app_global.title,
				action: "update",
				menuId: "test",
				sensortype: type
			}); 	  
		});
	});
	  

	
	router.post('/:id/update', function(req, res, next) {
		
		SensorType.update({
			name: req.body.name, 
			unit: req.body.unit, 
			keyword: req.body.keyword
			}, {returning: true, where: {id: req.params.id} })
				.then(function([ rowsUpdate ]) {		
					res.redirect('/sensortypes/' + req.params.id);
				})
				.catch(next);
		  
	});
	
	router.get('/', function(req, res, next) {
		SensorType.findAll({ 	
	  }).then(sensortypes => {
			res.render('sensortypes', { 
					title: app_global.title,
					menuId: "test",
					sensortypes: sensortypes,
				});
			}); 

	});

	return router;
};


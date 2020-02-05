module.exports = function(app_global) {

var express = require('express');
var router = express.Router();
const SensorNode = require('../models').SensorNode;
const Sensor = require('../models').Sensor;
const SensorType = require('../models').SensorType;
const SensorData = require('../models').SensorData;
var bodyParser = require('body-parser');
const models = require('../models');
var moment = require('moment');
const { Op } = require('sequelize')

router.get('/add', function(req, res, next) {
	var point = { type: 'Point', coordinates: ['48.395586 11.773817']};
	node = new SensorNode();
	node.name = "";
	node.ip = "";
	node.description = "";
	node.id = "0";
	node.coordinates = point;
	res.render('node_edit', { 
		title: app_global.title,
		action: "new",
		menuId: "test",
		node: node,

	});
});

//--------------------------------------
// Sensorsnode actions
//--------------------------------------

router.post('/:id/new', function(req, res, next) {
	
    return SensorNode.create({
        name: req.body.name,
        ip: req.body.ip,
        description: req.body.description,
		coordinates: models.sequelize.fn('ST_GeomFromText', 'POINT(48.395586 11.773817)'),
    }).then(function (node) {
        if (node) {
            res.redirect('/nodes/' + node.id);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
});

router.delete('/:id', function(req, res, next) {
	SensorNode.destroy({
		where: { id: req.params.id }
	}).then(node => {
		res.redirect('/nodes/');
	});
	
});

router.get('/:id', function(req, res, next) {
	
	SensorNode.findOne({ 
		where: { id: req.params.id },
		include:[{  model: Sensor,
					as: "sensors",
					attributes: ["id", "model", "sensortype_id"],
					include: [{
								model: SensorType,
								attributes: ["unit","keyword", "name"],
							 }]
				}]		
	  }).then(node => {
		//console.log(nodes[0].coordinates);
		res.render('node', { 
			title: app_global.title,
			menuId: "test",
			node: node,
			nodesJSON: JSON.stringify(node),
			center: node.coordinates.coordinates
		});
	 });	  
	});
	
router.get('/:id/edit', function(req, res, next) {
	
	SensorNode.findOne({ 
		where: { id: req.params.id },
		include:[{  model: Sensor,
					as: "sensors",
					attributes: ["id", "model", "sensortype_id"],
					include: [{
								model: SensorType,
								attributes: ["unit","keyword", "name"],
							 }]
				}]		
	  }).then(node => {
		//console.log(nodes[0].coordinates);
		res.render('node_edit', { 
			title: app_global.title,
			action: "update",
			menuId: "test",
			node: node,
			nodesJSON: JSON.stringify(node),
			center: node.coordinates.coordinates
		}); 
	 });	  
	});
	
router.post('/:id/update', function(req, res, next) {
	//console.log(req.body);

	var point = { type: 'Point', coordinates: [req.body.lat ,req.body.lon]};
	console.log(point);
	SensorNode.update({
		name: req.body.name, 
		ip: req.body.ip, 
		description: req.body.description,
		coordinates: point
		}, {returning: true, where: {id: req.params.id} })
			.then(function([ rowsUpdate ]) {		
				res.redirect('/nodes/' + req.params.id);
			})
			.catch(next);
	  
});

//--------------------------------------
// Sensors
//--------------------------------------

router.get('/:id/sensors/add', function(req, res, next) {
	SensorNode.findOne({ 
		where: { id: req.params.id }
		
	  }).then(node => {
			sensor = new Sensor();
			sensor.id = 0
			sensor.model = "";
			sensor.sensortype_id = 0;
			sensor.sensornode_id = req.params.id;
			
			SensorType.findAll().then(sensortypes =>  {
			//console.log(nodes[0].coordinates);
			res.render('sensor_edit', { 
					title: app_global.title,
					action: "new",
					menuId: "test",
					sensor: sensor,
					sensortypes: sensortypes,
					node: node
				});
			}); 
	  });
	
});

router.post('/:id/sensors/:sensor_id/new', function(req, res, next) {
	
    return Sensor.create({
        model: req.body.model,
        sensortype_id: req.body.sensortype_id,
		sensornode_id: req.params.id
    }).then(function (node) {
        if (node) {
            res.redirect('/nodes/' + req.params.id);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
});

router.get('/:id/sensors/:sensor_id/edit', function(req, res, next) {
	
	SensorNode.findOne({ 
		where: { id: req.params.id },
		include:[{  model: Sensor,
					as: "sensors",
					where: { id: req.params.sensor_id },
					attributes: ["id", "model", "sensortype_id"],
					include: [{
								model: SensorType,
								attributes: ["unit","keyword", "name"],
							 }]
				}]		
	  }).then(node => {
	  SensorType.findAll().then(sensortypes =>  {
		//console.log(nodes[0].coordinates);
		res.render('sensor_edit', { 
			title: app_global.title,
			action: "update",
			menuId: "test",
			sensor: node.sensors[0],
			node: node,
			sensortypes: sensortypes
		}); 
	  });
	 });	  
	});
	
router.post('/:id/sensors/:sensor_id/update', function(req, res, next) {
	//console.log(req.body);
	Sensor.update({
		model: req.body.model, 
		sensortype: req.body.sensortype_id
		}, {returning: true, where: {id: req.params.sensor_id} })
			.then(function([ rowsUpdate ]) {		
				res.redirect('/nodes/' + req.params.id);
			})
			.catch(next);
	  
});


router.delete('/:id/sensors/:sensor_id', function(req, res, next) {
	Sensor.destroy({
		where: { id: req.params.sensor_id }
	}).then(sensor => {
		res.redirect('/nodes/' + req.params.id );
	});
	
});

//--------------------------------------
// Sensordata
//--------------------------------------

router.get('/:id/sensors/:sensor_id/data/last', function(req, res, next) {
	
	SensorData.findAll({
		limit: 1,
		where: [ 
			{sensor_id: req.params.sensor_id}
			],
		order: [[ 'createdAt', 'DESC' ]]
	  }).then(data => {
		res.send(JSON.stringify(data));
	 });	  
	});

router.get('/:id/sensors/:sensor_id/data/:duration?/:start?', function(req, res, next) {
	var start;
	if(req.params.duration)
		start = moment().subtract(req.params.duration, 'hours').toDate();
	else 
		start = moment().subtract(20, 'years').toDate();;
	
	SensorData.findAll({ 
		where: [ 
			{sensor_id: req.params.sensor_id},
			{createdAt: {[Op.gte]: start}}
			]
	  }).then(data => {
		res.send(JSON.stringify(data));
	 });	  
	});
	

//--------------------------------------
// Index
//--------------------------------------

router.get('/', function(req, res, next) {
	  SensorNode.findAll({ 
		
		include:[{  model: Sensor,
					as: "sensors",
					attributes: ["id", "model", "sensortype_id"],
					include: [{
								model: SensorType,
								attributes: ["unit","keyword", "name"],
							 }]
				}]		
	  }).then(nodes => {
		
		res.render('nodes', { 
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



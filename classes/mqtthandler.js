const mqtt = require('mqtt');
const SensorNode = require('../models').SensorNode;
const Sensor = require('../models').Sensor;
const SensorType = require('../models').SensorType;
const SensorData = require('../models').SensorData;

class MQTTHandler {
	constructor(host, user){
		this.mqttClient = null;
		this.host = host;
		this.username = user; // mqtt credentials if these are needed to connect
		//this.password = 'YOUR_PASSWORD';
	}
	connect() {
		// Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
		this.mqttClient = mqtt.connect("mqtt://"+this.host, { username: this.username });

		// Mqtt error calback
		this.mqttClient.on('error', (err) => {
		  console.log(err);
		  this.mqttClient.end();
		});

		// Connection callback
		this.mqttClient.on('connect', () => {
		  console.log(`mqtt client connected`);
		});

		// mqtt subscriptions
		this.mqttClient.subscribe('#', {qos: 0});

		// When a message arrives, console.log it
		this.mqttClient.on('message', function (topic, message) {
		  //console.log(topic + " " +message.toString());
		  var topic = topic.substr(1).split("/",2);
		  var ip = topic[0];
		  var keyword = topic[1];
		  	
		  SensorNode.findOne({ 
								where: { ip: ip },
								include:[{  model: Sensor,
											as: "sensors",
											attributes: ["id", "model", "sensortype_id"],
											include: [{
														model: SensorType,
														attributes: ["unit","keyword"],
														where: {keyword: keyword}
													 }]
										}]
							}).then(node => {
								if(node) {
									SensorData.create({value: message, sensor_id: node.sensors[0].id}).then(console.log("Received from " + ip + ": " + message + node.sensors[0].SensorType.unit));
								}
								
							});
		});

		this.mqttClient.on('close', () => {
		  console.log(`mqtt client disconnected`);
		});
	  }

	// Sends a mqtt message to topic: mytopic
	sendMessage(message) {
		this.mqttClient.publish('mytopic', message);
	}
	
	
}

module.exports = MQTTHandler;
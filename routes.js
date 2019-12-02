module.exports = function(app_global) {
    
    var index 		= require('./routes/index')(app_global);
	var nodes 		= require('./routes/node')(app_global);
	var sensortypes = require('./routes/sensortypes')(app_global);
	
    app_global.app.use('/', 			index);
	app_global.app.use('/nodes', 		nodes);
	app_global.app.use('/sensortypes', 	sensortypes);
	
}
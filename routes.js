module.exports = function(app_global) {
    
    var index 		= require('./controllers/index')(app_global);
	var nodes 		= require('./controllers/node')(app_global);
	var sensortypes = require('./controllers/sensortypes')(app_global);
	
    app_global.app.use('/', 			index);
	app_global.app.use('/nodes', 		nodes);
	app_global.app.use('/sensortypes', 	sensortypes);
	
}
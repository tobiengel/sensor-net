module.exports = function(app_global) {
    
    var index 		= require('./routes/index')(app_global);
	//var calendar 	= require('./routes/calendar');
	
 
    app_global.app.use('/', 			index);
	//app.use('/calendar', 	calendar);
	
   
}
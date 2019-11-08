module.exports = function(app) {
    
    var index 		= require('./routes/index');
	//var calendar 	= require('./routes/calendar');
	
 
    app.use('/', 			index);
	//app.use('/calendar', 	calendar);
	
   
}
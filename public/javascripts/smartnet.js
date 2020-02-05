var tick;
var jobs = new Array;

function jobHandler(){
	jobs.forEach(job => job());
}

$(document).ready(function(){
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
	
	$(".overlay").on("click", function(event){
		var id = "#" + $(this).attr("id") + "_info";
		$(id).slideToggle(200);
	});
		
	jobHandler();
	tick = setInterval(function(){
		jobHandler();
	}, 5000);

});
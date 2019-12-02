$(document).ready(function(){
	$(".delete_link").on("click", function(event){
		event.preventDefault();
		//<a class="delete_link"  href="/nodes/<%= node.id %>"
		var url = $(this).attr("href");
		$.ajax({
			url: url,
			type: 'DELETE',
			success: function(result) {
				// Do something with the result
			}
		});
		return false;
	});
});
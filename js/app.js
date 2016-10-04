$(function() {

	$('#search').keypress(function(e) {
		if (e.which === 13) {
			movieSearch();
			$('#search').val('');
			return false;
		}
	});

	$('#submit').click(function() {
		movieSearch();
		$('#search').val('');
		return false;
	});

	function movieSearch() {
		var searchInput = $('#search').val();
		var url = "http://www.omdbapi.com/?s="+ searchInput +"&r=json";
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			success: function(data, status, jqXHR) {
				console.log(data.Search.length);
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

});
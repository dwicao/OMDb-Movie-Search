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
				var dataArr = data.Search;
				var movieHTML = '';
				if (data.Response === 'False') {
					movieHTML += '<li class="no-movies">';
					movieHTML += '<i class="material-icons icon-help">';
					movieHTML += 'help_outline';
					movieHTML += '</i>';
					movieHTML += 'No movies found that match: ';
					movieHTML += searchInput + '.';
					movieHTML += '</li>';
					populateIdWithHTML('movies', movieHTML);
				} 
				else {
					for (var i = 0; i < dataArr.length; i++) {
						movieHTML += '<li>';
						movieHTML += '<div class="poster-wrap">';
						if (dataArr[i].Poster === 'N/A') {
							movieHTML += '<i class="material-icons poster-placeholder">crop_original</i>';
						} else {
							movieHTML += '<img class="movie-poster" src="';
							movieHTML +=  dataArr[i].Poster;
							movieHTML += '">';
						}
						movieHTML += '</div>';
						movieHTML += '<span class="movie-title">';
						movieHTML += dataArr[i].Title;
						movieHTML += '</span>';
						movieHTML += '<span class="movie-year">';
						movieHTML += dataArr[i].Year;
						movieHTML += '</span>';
						movieHTML += '</li>';
						populateIdWithHTML('movies', movieHTML);	
					}
				}	
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

	function populateIdWithHTML(id, text) {
		var element = document.getElementById(id);
		element.innerHTML = text;
	}

});
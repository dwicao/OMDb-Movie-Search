$(function() {

	$('#search').keypress(function(evt) {
		if (evt.which === 13) {
			movieSearch();
			evt.preventDefault();
		}
	});

	$('#submit').click(function(evt) {
		movieSearch();
		evt.preventDefault();
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
						movieHTML += '<a target="_blank" href="http://www.imdb.com/title/' + dataArr[i].imdbID + '/">';
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
						movieHTML += '</a>';
						movieHTML += '</li>';
						populateIdWithHTML('movies', movieHTML);
					}
				}
				$('#search').val('');		
			}
		})
		.done(function() {
		//	console.log("success");
		})
		.fail(function() {
		//	console.log("error");
		})
		.always(function() {
		//	console.log("complete");
		});
	}

	function populateIdWithHTML(id, text) {
		var element = document.getElementById(id);
		element.innerHTML = text;
	}

});
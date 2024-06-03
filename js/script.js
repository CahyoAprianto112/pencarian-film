// Function cari film
function SearchMovie() {
    $('#movie-list').html(''); // setiap diklik kosongin dulu, ketika request baru tampilin
    $.ajax({
        url: "http://omdbapi.com",
        type: "get",
        dataType: "json",
        data: {
            apikey: "efcc61d0",
            s: $("#search-input").val(),
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                // looping movie
                $.each(movies, function (i, data) {
                    $("#movie-list").append(`
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="`+ data.Poster + `" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year + `</h6>
                                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID + `">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `);
                });

                // setelah mencari film keyword valuenya kosong
                $('#search-input').val('');

            } else {
                $("#movie-list").html(
                    `
                <div class="col">
                    <h1 class="text-center">` +
                    result.Error +
                    `</h1>
                </div>
                `
                );
            }
        },
    });
}


// Jquery tolong carikan saya id search button lalu jalankan fungsi ini
$("#search-button").on("click", function () {
    SearchMovie();
});

// Jquery tolong carikan saya id search input, lalu jalankan fungsi ini
$('#search-input').on("keyup", function (e) {
    // keycode sama dengan which
    if (e.which === 13) {
        SearchMovie();
    }
});

// jquery tolong carikan saya id movie-list, lalu ketika klik sebuah see-datailnya baik munculnya dari awal maupun nanti, jalankan function ini(event binding)
$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: "http://omdbapi.com",
        type: "get",
        dataType: "json",
        data: {
            apikey: "efcc61d0",
            i: $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img src="`+ movie.Poster + `" class="img-fluid" alt="Movie Poster">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                            <li class="list-group-item">Released: `+ movie.Released + `</li>
                            <li class="list-group-item">Genre: `+ movie.Genre + `</li>
                            <li class="list-group-item">Director: `+ movie.Director + `</li>
                            <li class="list-group-item">Actors: `+ movie.Actors + `</li>
                        </ul>
                    </div>
                </div>
            </div>
                `)
            }
        }
    })
});
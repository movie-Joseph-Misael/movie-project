
// This code is a jQuery script that fades out an element with class "se-pre-con" after 2 seconds after the page has finished loading.

$(window).on("load", function () {
    setTimeout(function () {
        $(".se-pre-con").fadeOut("slow");
    }, 2000);
});

// This code sets the constant variables for the base API URL, the movie image URL, and the main content element of the page.
// The code then sets up a submit event listener for a form with an id of "search-form".
// The event listener prevents the default behavior of the form and retrieves movies based on the value entered in the search input with id "search".
// The retrieved movies will then be displayed on the page.

let page = "1";
const GLITCH_URL = "https://important-intriguing-turret.glitch.me/movie";
const movieImgURL = 'https://image.tmdb.org/t/p/w500_and_h450_bestv2';
const mainContent = document.getElementById("movie-content");
// search form elements
const form = document.getElementById("search-form");
const search = document.getElementById("search");
// pagination elements
const pageLinks = document.querySelectorAll(".page-link");
//console.log(pageLinks);
// search for a movie
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log(search.value);
    const query = search.value;
    if (query) {
        const queryUrl = GLITCH_URL + "?q=" + query;
        getMovies(queryUrl);
    }
});

// This code is JavaScript code that uses the Bootstrap library to create a modal window.
// The code creates a modal object by passing a DOM element (the element with id 'staticBackdrop')
// to the constructor of the Bootstrap Modal class.
//
// It then retrieves the DOM elements with ids 'entry-form-title',
// 'entry-form-rating' and 'entry-form-image', and binds a click event listener to the DOM element with id 'btnNewMovie'.
// When the button is clicked, the function inside the event listener will clear the values of the title, rating,
// and urlImage elements and show the modal window by calling the show method on the modal object.


const modalMovie = new bootstrap.Modal(document.getElementById('staticBackdrop'))
const title = document.getElementById("entry-form-title")
const rating = document.getElementById("entry-form-rating")
const urlImage = document.getElementById("entry-form-image")
btnNewMovie.addEventListener("click", () => {
    title.value = ''
    rating.value = ''
    urlImage.value = ''

    modalMovie.show()
})

// This code is a JavaScript function named 'getMovies' that makes an asynchronous
// HTTP GET request to the URL specified as the argument and retrieves the JSON data from the response.
//
//     The function uses the 'await' keyword to wait for the 'fetch' function to complete,
//     then waits for the resulting promise to resolve with the JSON data from the response.
//     If the length of the response data is 0, the inner HTML of an element with id 'mainContent'
//     is set to the string 'No results found', otherwise it calls another function named 'showMovies' and passes the response data to it.


async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    //console.log(respData);
    if (respData.length === 0) {
        mainContent.innerHTML = '<h3>No results found</h3>';
    } else {
        showMovies(respData);
    }
}

// This code is a JavaScript function named 'showMovies' that takes an array of movies as its argument.
// The function starts by clearing the inner HTML of an element with id 'mainContent'.
// Then, it iterates over each movie in the array using the 'forEach' method and performs the following operations for each movie:
//
//     It retrieves the 'id', 'title', 'poster_path', and 'rating' properties from the movie object.
//
//     It creates a new HTML div element and assigns it to a variable named 'movieElm'.
//
//     It adds several CSS classes to the div element using the 'classList.add' method.
//     These classes are used to control the layout and appearance of the div element.


function showMovies(movies) {
    mainContent.innerHTML = "";
    movies.forEach((movie) => {
        const movieId = movie.id;
        const movieTitle = movie.title;
        const moviePoster = movie["poster_path"];
        const movieVote = movie.rating;
        const movieElm = document.createElement("div");

        movieElm.classList.add("col-xs-12", "col-sm-6", "col-md-4", "col-lg-3", "p-0");


        // This code is a continuation of the previous code block and performs the following operations for each movie:
        //
        //     It sets the inner HTML of the div element 'movieElm' to a string that contains HTML code for a movie card.
        //     The code creates an image with its source set to the 'moviePoster'
        //     property, and an onError attribute that sets the source to a default image in case the image from the 'moviePoster' property fails to load.
        //
        //     It creates a description section that contains two buttons and a movie rating.
        //
        //     It adds a title to the movie card with the text set to the 'movieTitle' property.
        //
        //     Finally, it appends the movie card represented by the div element 'movieElm' to the element with id 'mainContent'.
        //

        movieElm.innerHTML = `
        <div class="movie-card">
        <img
          class="img-fluid movie-img"
          src="${moviePoster}"
          onError="this.onerror=null;this.src='https://i.ebayimg.com/images/g/1EMAAMXQdGJR2-n3/s-l1600.jpg';"
          alt="Sorry, something went wrong"
        />
        <div
          class="movie-description p-3 d-flex justify-content-between align-items-center"
        >
          
          <div class="buttons-container">
    <button id="btnDelete-${movieId}" class="btn btn-primary">Delete</button>
    <button class="btn btn-secondary" >Edit</button>
    </div>
          <h3 class="movie-vote">${movieVote}</h3>
        </div>
        <h3 align="center" class="movie-title">${movieTitle}</h3>
      </div>
    `;


        // This code performs the following operations:
        //
        //     It appends the 'movieElm' div element to the element with id 'mainContent'.
        //
        //     It retrieves a button element with id 'btnDelete-${movieId}', where 'movieId' is the id of the current movie.
        //
        //     It adds a click event listener to the button. When the button is clicked, the following actions are performed:
        //
        //     The default behavior of the event (e.g., page refresh) is prevented using 'e.preventDefault()'.
        //     The 'movieElm' div element is removed from the 'mainContent' element using the 'remove' method.
        //     A fetch request is sent to the URL '${GLITCH_URL}/${movieId}' with the HTTP DELETE method.
        //     If the request is successful, the 'movieElm' div element is removed again using the 'remove' method.
        //     If the request fails, an error message is logged to the console.


        mainContent.appendChild(movieElm);
        const btnDelete = document.getElementById(`btnDelete-${movieId}`)

        btnDelete.addEventListener("click", function (e) {
            e.preventDefault();
            movieElm.remove();


            fetch(`${GLITCH_URL}/${movieId}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => {
                    //console.log("Movie deleted:", data);
                    movieElm.remove();
                })
                .catch(error => {
                    console.error("Error deleting movie:", error);
                });
        })

    })

}

// This code is a JavaScript function using the JQuery library.
// It captures the data entered by the user in a form, including the title, rating,
// and image URL of a movie, then submits the data to the API endpoint specified by the "GLITCH_URL" variable.
// The code prevents the default form submit behavior using "e.preventDefault()".
// The code uses the "fetch" function to send a "POST" request to the API endpoint with the new movie data in JSON format.
// After the request is complete, the code calls the "getMovies" function to refresh the movie data displayed on the page.
// The code also logs an error message in case something goes wrong with the movie submission.

$("#new-movie-submit").click(function (e) {
    e.preventDefault();
    let newMovieEntry = {
        "title": document.getElementById("entry-form-title").value,
        "rating": document.getElementById("entry-form-rating").value,
        "poster_path": document.getElementById("entry-form-image").value
    }

    modalMovie.hide()
    //console.log(newMovieEntry);
    fetch(GLITCH_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovieEntry)
    }).then(() => getMovies(GLITCH_URL))
        .catch(() => console.log("Something went wrong with the movie edit."))
});

getMovies(GLITCH_URL);
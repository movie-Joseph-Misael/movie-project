// The code sets up a function to be called when the "load" event for the "window" object occurs. 
// When the function is called, it sets a timer with a timeout of 2000 milliseconds (2 seconds). 
// After 2 seconds have passed, it uses the jQuery library to find an element with a - 
// class of "se-pre-con" and fades it out over a period of "slow" time.



$(window).on("load", function () {
    setTimeout(function () {
        $(".se-pre-con").fadeOut("slow");
    }, 2000);
    
    
    
    // This code defines a JavaScript script that sets up a few constant variables and elements in the Document Object Model (DOM).
    //
    //     The constant variables are:
    //
    //     GLITCH_URL which is a URL string for an API endpoint
    // movieImgURL which is a URL string for the base path to fetch movie images
    // mainContent which holds a reference to an HTML element with an id of "movie-content"
    // The script also sets up references to form elements in the DOM:
    //
    //     form which holds a reference to an HTML element with an id of "search-form"
    // search which holds a reference to an HTML element with an id of "search"
    // It also sets up references to pagination elements in the DOM:
    //
    //     pageLinks which holds an array-like object of all the elements with a class of "page-link".
    //     The code does not actually execute any actions or perform any searches, it only sets up references to elements in the DOM and defines constant variables.
    
    
    
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



    // This code sets up two event listeners on the form element in the Document Object Model (DOM).
    //
    //     The first event listener listens for an "input" event on the form and is triggered whenever the value of the form input changes. It prevents the default behavior of the event, then gets the current value of the search element and assigns it to a constant variable query.
    //
    //     If query is truthy (not an empty string), it concatenates the value with the GLITCH_URL constant to form a new URL and passes it as an argument to a function named getMovies.
    //
    //     The second event listener listens for a "submit" event on the form and is triggered whenever the form is submitted. It prevents the default behavior of the event.
    //
    //     These event listeners are used to trigger the getMovies function whenever the form is changed or submitted, and to pass the URL for the API query to the function.
    //
    
    
    form.addEventListener("input", (e) => {
        e.preventDefault();
        //console.log(search.value);
        const query = search.value;
        if (query) {
            const queryUrl = GLITCH_URL + "?q=" + query;
            getMovies(queryUrl);
        }
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });



    // This code creates two instances of the Bootstrap Modal component, and sets up references to various form elements in the Document Object Model (DOM).
    //
    //     The first instance of the modal component is created by passing the document.getElementById('staticBackdrop') to the constructor of the bootstrap.Modal class.
    // The second instance is created in a similar way using the document.getElementById('secondStaticBackdrop').
    //     The code also sets up references to form elements:
    //
    //     title which holds a reference to an HTML element with an id of "entry-form-title"
    // rating which holds a reference to an HTML element with an id of "entry-form-rating"
    // urlImage which holds a reference to an HTML element with an id of "entry-form-image"
    // There are also similar references for a second form:
    //
    //     title2 which holds a reference to an HTML element with an id of "second-entry-form-title"
    // rating2 which holds a reference to an HTML element with an id of "second-entry-form-rating"
    // urlImage2 which holds a reference to an HTML element with an id of "second-entry-form-image"
    // Finally, the code sets up an event listener on an element with an id of "btnNewMovie", listening for a "click" event. When triggered, it sets the values of the title, rating, and urlImage form elements to an empty string, and calls the show method on the modalMovie instance to display the modal.




    const modalMovie = new bootstrap.Modal(document.getElementById('staticBackdrop'))
    const modalMovie2 = new bootstrap.Modal(document.getElementById('secondStaticBackdrop'))

    const title = document.getElementById("entry-form-title")
    const rating = document.getElementById("entry-form-rating")
    const urlImage = document.getElementById("entry-form-image")

    const title2 = document.getElementById("second-entry-form-title")
    const rating2 = document.getElementById("second-entry-form-rating")
    const urlImage2 = document.getElementById("second-entry-form-image")
    btnNewMovie.addEventListener("click", () => {
        title.value = ''
        rating.value = ''
        urlImage.value = ''

        modalMovie.show()

    })


    //
    // This code defines an asynchronous function getMovies that takes in a url parameter. 
    // The function makes a fetch API call to the passed in url, and retrieves the JSON data from the response. 
    // If the length of the response data is 0, it updates the inner HTML of the mainContent element with a message saying 
    // "No results found". If there are results, it calls the showMovies function and passes the response data to it.



    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
        //console.log(respData);
        if (respData.length === 0) {
            mainContent.innerHTML = '<h3 style="color:rgb(235, 229, 215)">No results found</h3>';
        } else {
            showMovies(respData);
        }
    }

    // This code defines a function showMovies that takes in an array of movies.
    // The function updates the inner HTML of the mainContent element to an empty string. 
    // Then, it loops over the array of movies, and for each movie, it retrieves its id, title, poster path, and rating. 
    // It creates a new div element and assigns it to the movieElm variable. Finally, 
    // it adds several CSS class names to the div element's class list, including "col-xs-12", "col-sm-6", "col-md-4", "col-lg-3", and "p-0". 
    

    function showMovies(movies) {
        mainContent.innerHTML = "";
        movies.forEach((movie) => {
            const movieId = movie.id;
            const movieTitle = movie.title;
            const moviePoster = movie["poster_path"];
            const movieVote = movie.rating;
            const movieElm = document.createElement("div");

            movieElm.classList.add("col-xs-12", "col-sm-6", "col-md-4", "col-lg-3", "p-0");
            
            

            //
            // This code is a JavaScript function named showMovies which takes an array of movies as input and generates HTML elements for each movie. 
            // It generates a div element with class movie-card for each movie, which includes an image 
            // (img) element showing the movie's poster, a div element for movie description and buttons for 
            // "Delete" and "Edit" actions, a h3 element displaying the movie's rating and another h3 
            // element displaying the movie title, both with respective classes. 
            // The movie's title, poster, and rating are taken from the input movies array and are added to the generated HTML elements. 
            // If the movie poster fails to load, a default image is displayed instead.


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
    <button id="btnEdit-${movieId}"class="btn btn-secondary2" style="color:white">Edit</button>
    </div>
          <h3 class="movie-vote">${movieVote}</h3>
        </div>
        <h3 align="center" class="movie-title">${movieTitle}</h3>
      </div>
    `;


            
            
            
            // The code is an event listener that listens for a click event on the "Delete" button. 
            // When the button is clicked, the function removes the element that represents the movie card in the HTML DOM. 
            // The movie card element is specified by its unique id "btnDelete-{movieId}" and stored in the "movieElm" variable. 
            // The "preventDefault()" method stops the default behavior of the event from triggering, in this case, it stops the page from refreshing.
            
            
            mainContent.appendChild(movieElm);
            const btnDelete = document.getElementById(`btnDelete-${movieId}`)

            btnDelete.addEventListener("click", function (e) {
                e.preventDefault();
                movieElm.remove();


                // This code is a JavaScript function that listens for the click event on a delete button associated with a movie. 
                // When the button is clicked, it sends a DELETE request to the URL specified with the movie id. 
                // If the request is successful, it removes the movie element from the main content, otherwise it logs an error.  
                
                
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

            //
            // The code adds a click event listener to all elements with the class "btn-secondary2", which are buttons with the text "Edit". 
            // When one of these buttons is clicked, it gets the closest ancestor element with the class "movie-card", 
            // retrieves the text contents of its children elements with the classes "movie-title" and "movie-vote", 
            // and retrieves the source of the image element with the class "movie-img". 
            // These values are assigned to variables movieTitle, movieVote, and movieImgSrc, respectively.
            
            
            const btnEdit = document.querySelectorAll(".btn-secondary2");
            btnEdit.forEach((button) => {
                button.addEventListener("click", (e) => {
                    //const btnEditDel = btnEdit
                    const movieCard = e.target.closest(".movie-card");
                    // obtener los datos de la película a editar
                    const movieTitle = movieCard.querySelector(".movie-title").textContent;
                    const movieVote = movieCard.querySelector(".movie-vote").textContent;
                    const movieImgSrc = movieCard.querySelector(".movie-img").src;


                    // This code adds a click event listener to each button with the class "btn-secondary2" (which are the 
                    // "Edit" buttons). When an "Edit" button is clicked, the event handler function is executed.
                    //
                    //     The function retrieves the movie card element, which is the parent of the clicked "Edit" button, using the .closest() method. 
                    //     Then, it extracts the movie title, vote, and image source from the movie card and sets the values of the form inputs 
                    //     "title2", "rating2", and "urlImage2" to these extracted values, respectively. Finally, it shows the modal by calling the "show" method on "modalMovie2".
                    
                    
                    // llenar los datos en el formulario modal
                    title2.value = movieTitle;
                    rating2.value = movieVote;
                    urlImage2.value = movieImgSrc;

                    modalMovie2.show();


                    // This code does the following:
                    //
                    //     Attaches an event listener to the "second-new-movie-submit" button.
                    //     When the button is clicked, it prevents the default behavior of the event and creates an object called
                    //     "updatedMovie" with properties "title", "rating", and "poster_path". 
                    //     These properties are assigned the values of the respective inputs in the form.
                    //     Then, it appends the "movieElm" element to the "mainContent".
                    
                    
                    // escuchar el evento de envío del formulario
                    document.getElementById("second-new-movie-submit").addEventListener("click", (e) => {
                        e.preventDefault();
                       

                        const updatedMovie = {
                            title: title2.value,
                            rating: rating2.value,
                            poster_path: urlImage2.value
                        };
                        mainContent.appendChild(movieElm);


                        // This code performs a PUT request to an API endpoint (${GLITCH_URL}/${movieId}) with the updated data of a movie (updatedMovie). 
                        // The response from the API is then logged to the console, and the card in the UI that displays the movie information - 
                        // is updated with the new data from the response. Finally, the modal that is used for editing movie information is closed.
                        
                        
                        // enviar los datos actualizados a la API
                        fetch(`${GLITCH_URL}/${movieId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(updatedMovie)
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Movie updated:", data);
                                // actualizar la card de la película con los nuevos datos
                                movieCard.querySelector(".movie-title").textContent = title2.value;
                                movieCard.querySelector(".movie-vote").textContent = rating2.value;
                                movieCard.querySelector(".movie-img").src = urlImage2.value;

                                // cerrar el modal
                                modalMovie2.hide();
                            })
                            .catch(error => {
                                console.error("Error updating movie:", error);
                            });


                    });


                });
            });



        })

    }

    //
    // This code captures the click event of an element with the ID "new-movie-submit". When triggered, 
    // it prevents the default behavior of the event and creates an object called "newMovieEntry".
    // The properties of the object are the values of the elements with IDs "entry-form-title", 
    // "entry-form-rating", and "entry-form-image". The object is constructed using the value property of these elements.
    
    
    $("#new-movie-submit").click(function (e) {
        e.preventDefault();
        let newMovieEntry = {
            "title": document.getElementById("entry-form-title").value,
            "rating": document.getElementById("entry-form-rating").value,
            "poster_path": document.getElementById("entry-form-image").value
        }


        // This code listens to the click event on the "new-movie-submit" button, which is a JQuery element with the ID of "new-movie-submit".
        // When the button is clicked, the event's default behavior is prevented (to avoid a form submit).
        //
        // Then, an object newMovieEntry is created, which has three properties: "title", 
        // "rating", and "poster_path". The values for these properties are obtained from the values of the form inputs with the IDs of 
        // "entry-form-title", "entry-form-rating", and "entry-form-image", respectively.
        //
        //     Next, a POST request is made to the URL GLITCH_URL with newMovieEntry as the request body, 
        //     and the content type is set to "application/json". If the request is successful, 
        //     the getMovies function is called with the GLITCH_URL parameter. 
        //     If there's an error, the error message "Something went wrong with the movie edit." is logged to the console.
        //
        // Lastly, the function getMovies is called with the GLITCH_URL parameter.
        //
        
        
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

});
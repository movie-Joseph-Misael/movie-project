// const btnEdit = document.querySelectorAll(".btn-secondary");
// btnEdit.forEach((button) => {
//     button.addEventListener("click", (e) => {
//         const movieCard = e.target.closest(".movie-card");
//         const movieId = movieCard.getAttribute("data-id"); // add a unique identifier to each movie card
//         // obtener los datos de la película a editar
//         const movieTitle = movieCard.querySelector(".movie-title").textContent;
//         const movieVote = movieCard.querySelector(".movie-vote").textContent;
//         const movieImgSrc = movieCard.querySelector(".movie-img").src;
//
//         // llenar los datos en el formulario modal
//         title.value = movieTitle;
//         rating.value = movieVote;
//         urlImage.value = movieImgSrc;
//
//         // mostrar el modal
//         modalMovie.show();
//
//         // escuchar el evento de envío del formulario
//         document.getElementById("form-save").addEventListener("click", (e) => {
//             e.preventDefault();
//
//             const updatedMovie = {
//                 title: title.value,
//                 rating: rating.value,
//                 poster_path: urlImage.value
//             };
//
//             // enviar los datos actualizados a la API
//             fetch(`${GLITCH_URL}/${movieId}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(updatedMovie)
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log("Movie updated:", data);
//                     // actualizar la card de la película con los nuevos datos
//                     const movieCards = document.querySelectorAll(".movie-card");
//                     movieCards.forEach(card => {
//                         if (card.getAttribute("data-id") === movieId) {
//                             card.querySelector(".movie-title").textContent = title.value;
//                             card.querySelector(".movie-vote").textContent = rating.value;
//                             card.querySelector(".movie-img").src = urlImage.value;
//                         }
//                     });
//                     // cerrar el modal
//                     modalMovie.hide();
//                 })
//                 .catch(error => {
//                     console.error("Error updating movie:", error);
//                 });
//         });
//     });
// });

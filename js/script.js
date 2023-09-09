$("#opener").click(function () {
  $("aside").animate({ left: "0px" });
});

$("#closer").click(function () {
  $("aside").animate({ left: "-300px" });
});
const url =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false";

async function now_playing(url) {
  const res = await fetch(url);
  const data = await res.json();
  const imgPath = "https://image.tmdb.org/t/p/w500/";
  let elems = "";
  console.log(data.results[0]);
  console.log(data.results[0].vote_average / 2);
  data.results.forEach((movie) => {
    let num_stars = movie.vote_average / 2;
    let stars_rounded = Math.floor(num_stars);
    let stars = "";
    for (let i = 0; i < stars_rounded; i++) {
      stars += "<i class='fa-solid fa-star text-warning fs-6'></i>";
    }
    stars +=
      num_stars > stars_rounded
        ? '<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>'
        : "";
    elems +=
      `
    <div class="col-md-6 col-lg-4">
        <div class="item rounded">
            <img
                  src=` +
      (movie.backdrop_path
        ? imgPath + movie.backdrop_path
        : "images/default-movie.jpg") +
      `
                  alt=""
                  class="d-block img-fluid"/>
            <div class="overlay text-white">
                <h2>${movie.original_title}</h2>
                  <p>${movie.overview}</p>
                  <p style="text-align:left">Release Date: ${
                    movie.release_date
                  }</p>
                  <div class"star-rating mb-5" style="text-align:left">${stars}</div>
                  <div class="rating-average my-4">${Number(
                    movie.vote_average
                  ).toFixed(2)}</div>
            </div>
         </div>
    </div>
  `;
  });

  $(".gallery .row").html(elems);
}

now_playing(url);
$("#playing").click((e) => {
  e.preventDefault();
  now_playing(url);
});
$("#popular").click((e) => {
  e.preventDefault();
  now_playing(
    "https://api.themoviedb.org/3/movie/popular?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false"
  );
});
$("#top").click((e) => {
  e.preventDefault();
  now_playing(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false"
  );
});
$("#trending").click((e) => {
  e.preventDefault();
  now_playing(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false"
  );
});
$("#upcoming").click((e) => {
  e.preventDefault();
  now_playing(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false"
  );
});

$("main input").keyup((e) => {
  console.log(e.target.value);
  now_playing(
    `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`
  );
});

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
const btn = document.querySelector("button");
btn.disabled = true;

$("#email").keyup((e) => {
  if (!ValidateEmail(e.target.value)) {
    e.target.style.borderColor = "red";
    document.querySelector("button").disabled = true;
  } else {
    e.target.style.borderColor = "white";
    document.querySelector("button").disabled = false;
  }
});

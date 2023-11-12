var box = document.getElementById("apibox");
var searchBox = document.getElementById("search-box");
var loadMoreButton = document.getElementById("load-more");
var limit = 15;
var offset = 0;
var main = document.getElementsByTagName("main")[0];

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

function showShows(start, end) {
  axios.get(`https://api.tvmaze.com/shows`).then((response) => {
    response.data.slice(start, end).forEach((show) => {
      box.innerHTML += createShowCard(show);
    });

  });
  
}

function createShowCard(show) {
  return `
  <a href="details.html?id=${show.id}">
    <div class="movie-card">
      <div class="movie-summary">${truncateText(show.summary, 400)}</div>
      <div class="movie-image"><img src="${show.image.medium}" alt="${show.name}"></div>
      <div class="movie-details">
        <div class="movie-title">${show.name}</div>
        <div class="movie-description">Rating: ${
          show.rating.average != null ? show.rating.average : "unknown"
        } <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg></div>
        <div class="movie-meta">Length: ${show.runtime != null ? show.runtime : "unknown"}</div>
      </div>
    </div>
  </a>
`;
}

function clearBox() {
  box.innerHTML = "";
}

function loadMore() {
  offset += limit;
  showShows(offset, offset + limit);
}

searchBox.addEventListener("input", function () {
  loadMoreButton.style.visibility = "hidden";

  var searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    clearBox();
    offset = 0;
    showShows(offset, offset + limit);
    loadMoreButton.style.visibility = "visible";
    return;
  }

  clearBox();

  axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`).then((response) => {
    response.data.forEach((item) => {
      var show = item.show;
      box.innerHTML += createShowCard(show);
    });
  });
});

// Initial load
showShows(offset, offset + limit);

// Load more button click event
loadMoreButton.addEventListener("click", loadMore);

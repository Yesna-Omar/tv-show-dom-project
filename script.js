let tvShowCode = `82`;
// ! fetch using promise
// function fetchEpisode(tvShowCode) {
//   fetch(urlFetch)
//     .then((response) => {
//       return response.json();
//     })
//     .then((json) => {
//       console.log(tvShowCode,json);
//     });
// }
// fetchEpisode(`82`);
// ! fetch using async await
const getData = async (tvShowCode) => {
  let urlFetch = `https://api.tvmaze.com/shows/${tvShowCode}/episodes`;
  let response = await fetch(urlFetch);
  let data = await response.json();
  return data;
};

//You can edit ALL of the code here
async function setup() {
  const allEpisodes = await getData(tvShowCode);
  const showList = getAllShows();
  createShowSelector(showList);
  makePageForShows(showList);
  // makePageForEpisodes(allEpisodes);
}

function showUrl(tvShowCode) {
  location.href = `episode-guide.html?tvShowCode=${tvShowCode}`;
}

// this dropdown is to select a show
function createShowSelector(showList) {
  const rootElem = document.getElementById("root");
  let showSelect = document.createElement("select");
  showSelect.classList.add("show-select");
  showList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  showList.forEach((show) => {
    let dropdownOption = document.createElement("option");
    dropdownOption.textContent = show.name;
    dropdownOption.value = show.id;
    if (show.id.toString() === tvShowCode.toString()) {
      dropdownOption.selected = true;
    }
    showSelect.appendChild(dropdownOption);
  });
  showSelect.addEventListener("change", () => {
    showUrl(showSelect.value);
  });
  rootElem.appendChild(showSelect);
}

// this is the cards function
function buildCard(allShow) {
  let topContainer = document.querySelector(".top-container");
  topContainer.innerHTML = "";

  for (let i = 0; i < allShow.length; i++) {
    // this is the movie card of show list

    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    topContainer.appendChild(movieCard);
    movieCard.id = allShow[i].id;
    movieCard.addEventListener("click", () => {
      showUrl(allShow[i].id);
    });

    // this is the name of shows

    let showName = document.createElement("p");
    showName.classList.add("show-name-p");
    movieCard.appendChild(showName);
    showName.innerText = `${allShow[i].name}`;

    // this is the img of shows

    let mainInfo = document.createElement("div");
    mainInfo.classList.add("main-info");
    movieCard.appendChild(mainInfo);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-show-container");
    mainInfo.appendChild(imgContainer);

    let showImg = document.createElement("img");
    imgContainer.appendChild(showImg);
    if (allShow[i].image) {
      showImg.src = allShow[i].image.medium;
    }

    // this is the summary of show list

    let summaryOfShow = document.createElement("p");
    summaryOfShow.classList.add("summary-of-show-p");
    mainInfo.appendChild(summaryOfShow);
    summaryOfShow.innerHTML = allShow[i].summary;

    // this div contains the show information

    let showInfo = document.createElement("div");
    showInfo.classList.add("show-info");
    mainInfo.appendChild(showInfo);

    // this is the show rating

    let showRating = document.createElement("p");
    showRating.classList.add("show-rating");
    showInfo.appendChild(showRating);
    showRating.innerText = `Rated: ${allShow[i].rating.average}`;

    // this is the show genres

    let showGenres = document.createElement("p");
    showGenres.classList.add("show-genres");
    showInfo.appendChild(showGenres);
    showGenres.innerText = `Genres: ${allShow[i].genres}`.replaceAll(
      ",",
      " | "
    );

    // this is the show status

    let showStatus = document.createElement("p");
    showStatus.classList.add("show-status");
    showInfo.appendChild(showStatus);
    showStatus.innerText = `Status: ${allShow[i].status}`;

    // this is the show runtime

    let showRunTime = document.createElement("p");
    showRunTime.classList.add("show-runtime");
    showInfo.appendChild(showRunTime);
    showRunTime.innerText = `RunTime: ${allShow[i].runtime}`;
  }
}

// this is make pages filter function

function makePagesFilter(allShows) {
  const rootElem = document.getElementById("root");
  buildCard(allShows);
}

function isInGenre(inputGenres, inputSearch) {
  for (let i = 0; i < inputGenres.length; i++) {
    inputGenres[i] = inputGenres[i].toLowerCase();
  }
  if (inputGenres.includes(inputSearch)) {
    return true;
  } else {
    return false;
  }
}
function makePageForShows(allShows) {
  // this is the root div
  const rootElem = document.getElementById("root");

  // this is the search bar for the shows

  let searchShows = document.createElement("input");
  searchShows.type = `text`;
  searchShows.id = `search-input`;
  searchShows.placeholder = `your search item ...`;
  rootElem.appendChild(searchShows);
  searchShows.addEventListener("input", () => {
    let typedInput = searchShows.value;
    let lowerCaseSearchInput = typedInput.toLowerCase();
    let smallList = allShows.filter((oneShow) => {
      return (
        oneShow.name.toLowerCase().includes(lowerCaseSearchInput) ||
        oneShow.summary.toLowerCase().includes(lowerCaseSearchInput) ||
        isInGenre(oneShow.genres, lowerCaseSearchInput)
      );
    });
    makePagesFilter(smallList);
    showCount.textContent = `Displaying ${smallList.length}/${allShows.length} shows`;
  });

  // this is shows length description
  let showCount = document.createElement("span");
  showCount.classList.add("show-count");
  rootElem.appendChild(showCount);
  showCount.textContent = `Displaying ${allShows.length}/${allShows.length} shows`;

  // this is the top container
  let topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  rootElem.appendChild(topContainer);

  //   this is the source of shows
  let webLinkSrc = "https://www.tvmaze.com/";
  let webLink = document.createElement("a");
  webLink.classList.add("web-link");
  webLink.href = webLinkSrc;
  webLink.textContent = "The data come from TVMaze.com";
  rootElem.appendChild(webLink);

  buildCard(allShows);
}


window.onload = setup;

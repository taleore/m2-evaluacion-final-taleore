"use strict";

const btn = document.querySelector(".js-btn-search");
const inputUser = document.querySelector(".js-btn-serie");
let series = [];
const favorites = [];

const getSeriesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("series"));
};

const setSeriesIntoLocalStorage = () => {
  localStorage.setItem("series", JSON.stringify(series));
};

const getDatafromServer = ev => {
  ev.preventDefault();
  const url = `http://api.tvmaze.com/search/shows?q=${inputUser.value}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(
        "Fetch data from server and return it as JSON >>> Return",
        data
      );
      data = formatData(data);
      saveDataInSeries(data);
      paintSeries();
      listenSeries();
      getSeriesFromLocalStorage();
    });
};

const formatData = data => {
  const searchResult = [];
  for (let i = 0; i < data.length; i = i + 1) {
    searchResult.push({
      image: data[i].show.image.medium,
      name: data[i].show.name
    });
  }
  console.log(
    "Format JSON data and return it as array >>> Return",
    searchResult
  );
  return searchResult;
};

const saveDataInSeries = data => {
  series = data;
  console.log("Save data in series array >> series", series);
};

const paintSeries = () => {
  const mainList = document.querySelector(".js-list");
  let htmlCode = "";
  for (let serieIndex = 0; serieIndex < series.length; serieIndex++) {
    htmlCode += `<li class="series__element ${getFavoriteClassName(
      serieIndex
    )} js-serie" data-index="${serieIndex}">`;
    htmlCode += `<img  class="series__image" src="${
      series[serieIndex].image
    }" alt="">`;
    htmlCode += `<p class="series__name">${series[serieIndex].name}</p>`;
    htmlCode += "</li>";
  }
  mainList.innerHTML = htmlCode;
  console.log(
    "Paint series form `series` array into DOM >>> series:",
    series,
    "Favorites:",
    favorites
  );
};

const getFavoriteClassName = serieIndex => {
  if (isFavoriteSerie(serieIndex)) {
    return "series__item--favorite";
  } else {
    return "";
  }
};

const listenSeries = () => {
  console.log("listen click on new series DOM elements");
  const serieElements = document.querySelectorAll(".js-serie");
  for (const serieElementIndex of serieElements) {
    serieElementIndex.addEventListener("click", handleClick);
  }
};

const handleClick = ev => {
  console.log("Handle click on a serie DOM element");
  const serieIndex = getClickedSerie(ev);
  if (isFavoriteSerie(serieIndex)) {
    removeFavorite(serieIndex);
  } else {
    addFavorite(serieIndex);
  }
  paintSeries();
  listenSeries();
};

const getClickedSerie = ev => {
  const currentTarget = ev.currentTarget;
  const clickedSerie = parseInt(currentTarget.dataset.index);
  console.log(
    "Get clicked palette from event and return the clicked palette index >>> Clicked palette:",
    clickedSerie
  );
  return clickedSerie;
};

const isFavoriteSerie = serieIndex => {
  const foundIndex = favorites.indexOf(series[serieIndex]);
  if (foundIndex >= 0) {
    console.log(`check if serieIndex ${serieIndex} it is favorite >>>`, true);
    return true;
  } else {
    console.log(
      `Check if serieIndex ${serieIndex} it is not favorite >>>`,
      false
    );
    return false;
  }
};

const addFavorite = serieIndex => {
  favorites.push(series[serieIndex]);
  console.log(
    "Add paletteIndex to `favorites` array >>> Favorites:",
    favorites
  );
};

const removeFavorite = serieIndex => {
  const favoriteIndex = favorites.indexOf(series[serieIndex]);
  favorites.splice(favoriteIndex, 1);
  console.log(
    "Remove serieIndex from `favorites` array >>> Favorites:",
    favorites
  );
};

btn.addEventListener("click", getDatafromServer);

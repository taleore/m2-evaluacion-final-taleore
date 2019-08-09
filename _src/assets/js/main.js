"use strict";

const btn = document.querySelector(".js-btn-search");
const inputUser = document.querySelector(".js-btn-serie");
let series = [];

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
  // cojo elemento contenedor del DOM
  const mainList = document.querySelector(".js-list");
  // declaramos string vacío para pasarlo por el innerHTML
  let htmlCode = "";
  for (
    let serieIndex = 0;
    serieIndex < series.length;
    serieIndex = serieIndex + 1
  ) {
    htmlCode += `<div class="series__item js-serie" data-index="${serieIndex}">`;
    htmlCode += `<img  class="series__image" src="${
      series[serieIndex].image
    }" alt="">`;
    htmlCode += `<p class="series__name">${series[serieIndex].name}</p>`;
    htmlCode += "</div>";
  }
  mainList.innerHTML = htmlCode;
  console.log("Paint series form `series` array into DOM >>> series:", series);
};

btn.addEventListener("click", getDatafromServer);

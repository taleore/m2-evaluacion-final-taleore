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
      //paintSeries();
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

btn.addEventListener("click", getDatafromServer);

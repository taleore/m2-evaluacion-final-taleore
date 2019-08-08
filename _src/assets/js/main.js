"use strict";

const btn = document.querySelector(".js-btn-search");
let series = [];

const getDatafromServer = ev => {
  ev.preventDefault();
  const url = "http://api.tvmaze.com/search/shows?q=nova";
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
};

const formatData = data => {
  const result = [];
  for (const item of data) {
    result.push({
      name: item.show.name,
      image: item.image.medium
    });
  }
};

btn.addEventListener("click", getDatafromServer);

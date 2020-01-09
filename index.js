#!/usr/bin/env /usr/local/bin/node

const axios = require("axios");
//const readlinesync = require("readline-sync");
const bitbar = require("bitbar");
const NAMAZES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
var city = "Chicago";
var country = "USA";

var url = ` http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1&school=1`;

// REgExp to extract 24hr formatted js time
let pattern = /[0-9][0-9]:[0-9][0-9]/;

const timeNow = pattern.exec(new Date())[0];

// https call to get today's namazes

axios
  .get(url)
  .then(response => {
    timings = response.data.data;

    // create array of times from namaz time object
    let newNamazArr = [];
    let temp = Object.keys(timings.timings);
    for (var i = 0; i < temp.length; i++) {
      if (NAMAZES.includes(temp[i])) {
        newNamazArr.push(timings.timings[temp[i]]);
      }
    }

    // get current namaz

    let currentNamaz = getNamaz(newNamazArr, timeNow);

    // get time diff from now till next namaz

    // feed into bitbar
    bitbar([
      {
        text: `${currentNamaz}, Time Left: ${"random"}`,
        color: "blue",
        dropdown: false
      }
    ]);
  })
  .catch(error => console.error(error));

function getNamaz(namazes, timeNow) {
  //console.log(timeNow);
  //onsole.log(namazes);
  let curr;
  for (var i = 0; i < namazes.length - 1; i++) {
    if (timeNow > namazes[i] && timeNow < namazes[i + 1]) {
      curr = NAMAZES[i];
    }
    if (timeNow == namazes[i]) {
      curr = NAMAZES[i];
    }
  }
  return curr;
}

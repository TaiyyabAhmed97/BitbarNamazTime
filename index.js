#!/usr/bin/env /usr/local/bin/node

const axios = require("axios");
//const readlinesync = require("readline-sync");
const bitbar = require("bitbar");
const NAMAZES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
var city = "Chicago";
var country = "USA";

var url = ` http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1&school=1`;

let pattern = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;

const timeNow = pattern.exec(new Date())[0];

axios
  .get(url)
  .then(response => {
    timings = response.data.data;
    //console.log(timings.timings);

    // Parse timings object into difference from current time
    let newNamazArr = [];
    let temp = Object.keys(timings.timings);
    for (var i = 0; i < temp.length; i++) {
      if (NAMAZES.includes(temp[i])) {
        newNamazArr.push(timings.timings[temp[i]]);
      }
    }
    console.log(newNamazArr);

    // create array of time from now differnce

    //getNamaz(timings, timeNow)
    // feed into bitbar
    bitbar([
      {
        text: `namaz`,
        color: "blue",
        dropdown: false
      }
    ]);
  })
  .catch(error => console.error(error));

function getNamaz(namazes, timeNow) {
  let curr;
  for (const namaz in namazes) {
  }
}

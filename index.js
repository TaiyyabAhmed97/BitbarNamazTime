#!/usr/bin/env /usr/local/bin/node
const jsonData = require("./data.json");
const bitbar = require("bitbar");
const NAMAZES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
var timediff;
// REgExp to extract 24hr formatted js time
let pattern = /[0-9][0-9]:[0-9][0-9]/;
const timeNow = pattern.exec(new Date())[0];
// read file's JSON data
let newNamazArr = jsonData["newNamazArr"];
// get current namaz
let currentNamaz = getNamaz(newNamazArr, timeNow);
// get time diff from now till next namaz
let idx = NAMAZES.indexOf(currentNamaz);
let namazTime = newNamazArr[idx == 5 ? 0 : idx + 1];
// feed into bitbar
bitbar([
  {
    text: `${
      currentNamaz == "Sunrise" ? "No Namaz" : currentNamaz
    }, Time Left: ${getDiff(namazTime, timeNow)}`,
    color: getRandomColor(),
    dropdown: false
  }
]);

function getNamaz(namazes, timeNow) {
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

function getDiff(time1, time2) {
  let time1mins =
    parseInt(time1.substring(0, 2), 10) * 60 +
    parseInt(time1.substring(3, time1.length), 10);
  let time2mins =
    parseInt(time2.substring(0, 2), 10) * 60 +
    parseInt(time2.substring(3, time1.length), 10);
  let diff = time1mins - time2mins;
  timediff = diff;
  var quotient = Math.floor(diff / 60);
  var remainder = diff % 60;
  return (
    "" +
    (quotient < 10 ? "0" + quotient : quotient) +
    ":" +
    (remainder < 10 ? "0" + remainder : remainder)
  );
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (timediff < 30) {
    color = "red";
  }
  return color;
}
function sendDiff(str) {
  return str;
}

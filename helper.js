const axios = require("axios");
const fs = require("fs");

var city = "Chicago";
var country = "USA";
const NAMAZES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
var url = ` http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1&school=1`;

axios
  .get(url)
  .then(response => {
    const timings = response.data.data;

    // create array of times from namaz time object
    let newNamazArr = [];
    let temp = Object.keys(timings.timings);
    for (var i = 0; i < temp.length; i++) {
      if (NAMAZES.includes(temp[i])) {
        newNamazArr.push(timings.timings[temp[i]]);
      }
    }
    console.log(newNamazArr);
    fs.writeFileSync(
      "../../Plugins/data.json",
      JSON.stringify({ newNamazArr })
    );
  })
  .catch(error => console.error(error));

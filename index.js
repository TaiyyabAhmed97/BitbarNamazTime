var axios = require("axios");
var readlinesync = require("readline-sync");
var city = readlinesync.question("Enter your City: ");
var country = readlinesync.question("Enter your Country: ");

console.log([city, country]);
var url = ` http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1&school=1`;

var timings = {};
axios
  .get(url)
  .then(response => {
    console.log(response.data.data);
    timings = response.data.data;
  })
  .catch(error => console.error(error));

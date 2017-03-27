var request = require('request');
var cheerio = require('cheerio');


function gettemp(zipCode, unitsRequested, callback){
  if (arguments.length === 2) {
    callback = unitsRequested;
    unitsRequested = null;
  }
  if (zipCode === null){
    callback("Please specify a valid Zip Code");
    return;
  }
  unitsRequested = (unitsRequested === 'C' || unitsRequested === 'F' || unitsRequested==='c' || unitsRequested==='f') ? unitsRequested : null;
  unitsRequested = unitsRequested===null ? null : unitsRequested.toLowerCase() ;
  var url = 'https://weather.com/weather/today/l/' + zipCode;
  request.get(url, function(err, response, html) {
    if (err) {
      // console.log("returning a problem");
      callback(err);
      return ;
    } else if (response.statusCode != 200){
      callback("problem loading page....please try again later (rc: " + response.statusCode + ")");
      return ;
    } else {
      try {
          // console.log(response.statusCode);
          var $ = cheerio.load(html);
          var unitsReturned = $('.site-settings span:nth-child(2)').text();
          if (unitsReturned.length !== 0){
            unitsReturned = unitsReturned.split('')[1].toLowerCase();
          }
          var temp = $('.today_nowcard-temp span').text();
          var tempSymbol = temp.substring(temp.length-1);
          var tempDegrees = temp.substring(0,temp.length-1);
          var location = $('.today_nowcard-location').text();
          if (unitsRequested){
            if (unitsRequested != unitsReturned ){
              if (unitsRequested==='c'){
                tempDegrees = (tempDegrees - 32)*(5/9);
              } else {
                tempDegrees = 1.8 * tempDegrees + 32;
              }
            }
            tempDegrees = (tempDegrees*1.0).toFixed(1);
          } else {
            unitsRequested = unitsReturned;
          }

          callback(null, tempDegrees + tempSymbol + unitsRequested.toUpperCase() + ' in ' + location);
      }
      catch (e) {
          callback(null, "weather is undefined for " + zipCode + ", please try again later");

      }
    }
    return;
  });

}

module.exports = gettemp;

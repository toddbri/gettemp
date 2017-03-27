# gettemp


* This module will return the current temperature and location of the specified US Zip Code in the units requested.
* The temperature information is pulled from weather.com


## Intallation

~~~~~~~
npm install gettemp
~~~~~~~

## How to use

* zipcode is a regular US postal code in numeric form
* units is specified in either Celsius or Fahrenheit as 'c' or 'f'.
* units is optional and if not specified will use the default units returned from weather.com

~~~~~~~
gettemp(zipcode, [units,] function(err, result){
  if(err) {
    console.log("There was an error");
    console.log(err);
  } else {
    console.log(result);
  }
})
~~~~~~~

#Examples

~~~~~~~
gettemp(90210,'c' function(err, result){
  if(err) {
    console.log("There was an error");
    console.log(err);
  } else {
    console.log(result);
  }
})
~~~~~~~

~~~~~~~
gettemp(30342, function(err, result){
  if(err) {
    console.log("There was an error");
    console.log(err);
  } else {
    console.log(result);
  }
})
~~~~~~~

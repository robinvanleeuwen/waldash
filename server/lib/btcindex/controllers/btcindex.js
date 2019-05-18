var exports = module.exports;
var axios = require("axios");
var currentPriceURI = "https://api.bl3p.eu/1/BTCEUR/ticker";
var redis = require("redis");
var redisClient = redis.createClient();
var Q = require("q");



exports.getCurrentRate = function(req, res) {
  
  console.log("/currentRate");

  function getCurrentMinuteTime() {
    var currentTime = new Date();
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);
    return currentTime;
  }
  
  Q.ninvoke(redisClient, "get", "currentRate")
  .then(function(data) {
    console.log(data);
    if (data == null) {

      console.log("Cache empty: "+ JSON.stringify(data));
      
      axios.get(currentPriceURI).then((result) => {

        currentTime = getCurrentMinuteTime();

        rate = result.data.last;
        redisClient.set("currentRate", '{"time": "'+currentTime.toISOString()+'", "rate": "'+rate+'"}');

        res.status(200).send({result: {time: currentTime.toISOString(), rate: rate}});

      }).catch((error) => {
        console.log(error);
      });
    }
    else {

      var result = JSON.parse(data);

      currentTime = getCurrentMinuteTime();
      cachedTime  = new Date(result.time);
      
      if (currentTime > cachedTime) {

        axios.get(currentPriceURI).then((result) => {
          rate = result.data.last;
          currentRate = '{"time": "'+currentTime.toISOString()+'", "rate": "'+rate+'"}';
          redisClient.set("currentRate", currentRate);

          console.log("Cache invalid: "+ JSON.stringify(currentRate));
          
          res.status(200).send({result: JSON.parse(currentRate)});
  
        }).catch((err) => {
          console.log(err);
        });
      } else {
        console.log("Cached result: "+ JSON.stringify(result));
        res.status(200).send({result: result});
      }
    }
  });
};

var path = require("path");
var bl3p = require("bl3p");
var fs = require("fs");

exports.getBl3pAccountInfo = function(req, res) {

  rootPath = path.dirname(require.main.filename);
  var settings = JSON.parse(fs.readFileSync(rootPath+"/.settings"));

  if (!settings.bl3p_public_key || !settings.bl3p_private_key) {
    res.status(200).send({result: "Configuration trouble."})
  }

  bl3pAuth = new bl3p.Bl3pAuth(settings.bl3p_public_key, settings.bl3p_private_key);
  
  bl3pAuth.account_info((err, data) => {
    console.log(data);
    res.status(200).send({result: JSON.parse(data)});
  });

};
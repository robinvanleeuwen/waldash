var exports = module.exports;
var axios = require("axios");
var currentPriceURI = "https://api.coindesk.com/v1/bpi/currentprice.json";
var redis = require("redis");
var redisClient = redis.createClient();

exports.getCurrentRate = function(req, res) {
  
  console.log("/currentRate");

  function getCurrentMinuteTime() {
    var currentTime = new Date();
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);
    return currentTime;
  }

  redisClient.get("currentRate", (err, reply) => {
      
    if (err){
      res.status(500).send({result: "somthing went wrong"})
      throw err;
    } 
    
    if (!reply) {

      console.log("Cache empty: "+ JSON.stringify(result));
      
      axios.get(currentPriceURI).then((result) => {

        currentTime = getCurrentMinuteTime();

        rate = result.data.bpi.EUR.rate;
        redisClient.set("currentRate", '{"time": "'+currentTime.toISOString()+'", "rate": "'+rate+'"}');

        res.status(200).send({result: {time: currentTime.toISOString(), rate: rate}});

      }).catch((error) => {
        console.log(error);
      });
    }
    else {

      var result = JSON.parse(reply);

      currentTime = getCurrentMinuteTime();
      cachedTime  = new Date(result.time);
      
      if (currentTime > cachedTime) {

        axios.get(currentPriceURI).then((result) => {
          rate = result.data.bpi.EUR.rate;
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
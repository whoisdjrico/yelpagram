var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var bodyParser = require('body-parser');
var $ = require('jquery');
var http = require('http');
var instagramAccessToken = '10324727.1677ed0.e055b10af42141bb8acbb0989c259d3d';
var foursquareAccessToken = 'YMLOF3SDTWE1CIRKNIMLNXJM5CWVDAERPXMV22ZIP4NYGFLQ';
var locationId;
var cors = require('cors');
var Promise = require("bluebird");
var async = require('async');

function callFourSquare(location,callback,req,res,next) {
  var queryUrl = 'https://api.foursquare.com/v2/venues/explore?near=' + location +  '&radius=3000&section=food&openNow=1&oauth_token=' + foursquareAccessToken + '&v=20151104';

  request(queryUrl, function(error, response, body){
    if (error) console.log(error);

    var items = JSON.parse(body).response.groups[0].items;

    var output = items.map(function(item){
        return {
          id: item.venue.id,
          name: item.venue.name,
          location: item.venue.location,
          contact: item.venue.contact
        }
    });

    async.map(output,callback,function(err, result) {
      res.send(output);
    });

  });
}


function callInstagram(obj,next1){

    var url1 = 'https://api.instagram.com/v1/locations/search?foursquare_v2_id=' + obj.id + '&access_token=' + instagramAccessToken

    request(url1, function (error, response, body) {
      if (error) console.log(error);

      locationId = JSON.parse(body).data[0].id;

      var url2 = 'https://api.instagram.com/v1/locations/' + locationId +'/media/recent?access_token=' + instagramAccessToken;

      request(url2, function(error,response,body) {
        if (error) console.log(error);

        obj.pictures = JSON.parse(body).data.map(function(item){
          return item.images.standard_resolution.url;
        }).slice(0,3);

        next1();

      });

    });


}


app.use(express.static('../client'));
app.use(express.static('server'));
app.use(bodyParser());
app.use(cors());

app.get('/', callFourSquare.bind(null,'34.0211764,-118.4065364', callInstagram));


app.listen(3000);

module.exports = app;

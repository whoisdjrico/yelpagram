var $ = require('jquery');
var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

var instagramAccessToken = '10324727.1677ed0.e055b10af42141bb8acbb0989c259d3d';

var locationId;

app.use(bodyParser());

var data;

var url1 = 'https://api.instagram.com/v1/locations/search?foursquare_v2_id=40a55d80f964a52020f31ee3&access_token=' + instagramAccessToken

request(url1, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    locationId = JSON.parse(body).data[0].id;
    var url2 = 'https://api.instagram.com/v1/locations/' + locationId +'/media/recent?access_token=' + instagramAccessToken;
    request2(url2);
  }
});

function request2 (url) {
  request(url, function(error,response,body) {
    if (!error && response.statusCode === 200) {
      data = body;
      console.log(JSON.parse(body).data[0].images.standard_resolution.url);
    }
  });
}

// {photo1:
// photo2:
// photo3:
// restaurantName:
// address:
// phoneNumber:
// latitude:
// longitude:}


//foursquare token - https://api.foursquare.com/v2/venues/explore?near=40.7,-74&radius=3000&section=food&openNow=1&oauth_token=YMLOF3SDTWE1CIRKNIMLNXJM5CWVDAERPXMV22ZIP4NYGFLQ&v=20151104

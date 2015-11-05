var $ = require('jquery');
var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var instagramAccessToken = '10324727.1677ed0.e055b10af42141bb8acbb0989c259d3d';
var foursquareAccessToken = 'YMLOF3SDTWE1CIRKNIMLNXJM5CWVDAERPXMV22ZIP4NYGFLQ';
var locationId;
app.use(bodyParser());

function callFourSquare(location) {
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

    return output.map(callInstagram);



  });
}

function callInstagram(obj){
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

      outputStuff(obj);

    });

  });


}

function outputStuff(arg){
  console.log(arg);
}

callFourSquare('34.0211764,-118.4065364');





// {photo1:
// photo2:
// photo3:
// restaurantName:
// address:
// phoneNumber:
// latitude:
// longitude:}


//foursquare token - https://api.foursquare.com/v2/venues/explore?near=40.7,-74&radius=3000&section=food&openNow=1&oauth_token=YMLOF3SDTWE1CIRKNIMLNXJM5CWVDAERPXMV22ZIP4NYGFLQ&v=20151104

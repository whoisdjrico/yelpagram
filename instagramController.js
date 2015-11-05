var $ = require('jquery');
var instagramAccessToken = '10324727.1677ed0.e055b10af42141bb8acbb0989c259d3d';

function callInstagram (fourSquareId) {
  var url1 = 'https://api.instagram.com/v1/locations/search?foursquare_v2_id=' + fourSquareId + '&access_token=' + instagramAccessToken;

  var url2 = 'https://api.instagram.com/v1/locations/' + locationId +'/media/recent?access_token=' + instagramAccessToken;

  $.ajax({
    type: "GET",
    url: url1,
    success: function(results){
      console.log(results);
    },
    dataType: 'json'
  });

  )
}

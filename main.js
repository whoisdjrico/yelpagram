var images = [];
var a = 0;
var x = 0;

$.ajax({
  type: "GET",
  url: 'http://localhost:3000/',
  success: function(data){
    for (var i = 0; i < data.length; i++){
      images.push(data[i]);
    }
    console.log(images);
    $('#container').append('<img src=' + images[a].pictures[x] + '>').click(step);
    x++;

    for (i = 0; i < images.length; i++) {
      console.log('preloading');
      preloadImages(images[i].pictures);
    }
  }
});

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

function step () {
  console.log('x: ' + x + ' a: ' + a);
  if (x >= 2) {
    x = 0;
    a++;
    $('#container').empty();
    $('#container').append('<img src=' + images[a].pictures[x] + '>');
  } else {
    x++;
    $('#container').empty();
    $('#container').append('<img src=' + images[a].pictures[x] + '>');
  }
}

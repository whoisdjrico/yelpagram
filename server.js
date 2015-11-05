var express = require('express');
var app = express();
var friendController = require('./models/friendController.js');
var messageController = require('./models/messageController.js');
var bodyParser = require('body-parser');

app.use(express.static('../client'));
app.use(express.static('server'));
app.use(bodyParser());

app.get('/messages', messageController.getAllMessages);
app.post('/messages', messageController.createMessage);
app.post('/friends', friendController.createFriend);
app.get('/friends', friendController.getAllFriends);
app.put('/friends', friendController.updateFriend);

app.listen(3000);

module.exports = app;

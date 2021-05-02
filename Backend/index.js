const express = require('express')
const app = express()
const port = 3000
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: ["http://localhost:8080", "https://dev.example.com"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

var ami = new require('asterisk-manager')('5090','186.226.231.15','manager','pldvoip01', true);
var actionId;

ami.action({
 'action':'login',
 'username':'manager',
 'secret':'pldvoip01'
}, function(err, res) {
   console.log(res)
   actionId = res.actionid
});



 app.get('/', (req, res) => {
     var ret = 'dasda'
     console.log(ret)

    ami.action({
        'action':'SIPpeers',
        'ActionID':actionId
       }, function(err, res) {});
    
     // Listen for any/all AMI events.
     ami.on('response', function(evt) {
        //  if(evt.event == 'PeerList') {
            console.log(evt)
            ret = evt
            io.emit('ouvi ai', evt);
        //  }
     })
     return ret;
  });



httpServer.listen(3000);
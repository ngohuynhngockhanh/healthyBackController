angular.module('starter.services', [])
.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://192.168.200.176:8000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  mySocket.on('news', function (data) {
    console.log(data);
  });
  return mySocket;
})
.service('Config', function() {
  var profiles = [
    {
      name: 'sleep',
      fullname: 'Ngủ',
      class: 'button-calm',
      duration: 600, //600 seconds = 10 minutes
      maxPressure: 6000
    },
    {
      name: 'read',
      fullname: 'Đọc',
      class: 'button-balanced',
      maxPressure: 7000,
      timeoutVibrating: 2000,
      howVibrating: 1 // one by one
    },
    {
      name: 'relax',
      fullname: 'Xỏa',
      class: 'button-energized',
      maxPressure: 8000,
      timeoutVibrating: -1,
      howVibrating: 2 // randomize with any timer
    }/*,
    {
      name: 'work',
      fullname: 'Làm',
      class: 'button-assertive'
    }*/
  ]
  return {
    getProfile: function() {
      return profiles;
    }
  }
})
.service('HealthyBack', function(Config, mySocket) {
  

  this.status = false
  var profiles = Config.getProfile()
  Object.defineProperty(this, "profiles", {
    get: function() {return profiles },
    writealbe: false
  });
  this.currentProfile = {}

  this.isPause = false
  this.isRunning = false;



  var self = this
  

  
  

  return {
    status: this.status,
    profiles: this.profiles,
    currentProfile: this.currentProfile,
    isRunning: this.isRunning,
    isPause: this.isPause,
    canRenderStartButton: function() {
      return this.status && !this.isRunning;
    },
    canRenderResumeButton: function() {
      return this.status && this.isRunning && this.isPause;
    },
    canRenderStopButton: function() {
      return this.status && this.isRunning;
    },
    canRenderPauseButton: function() {
      return this.status && this.isRunning && !this.isPause;
    },
    sendMachineStatus: function() {
      mySocket.emit("machine status", this.isRunning, this.isPause)
    },
    start: function() {
      this.isRunning = true;
      this.isPause = false;
      console.log("Start")
      this.sendMachineStatus()
    },
    pause: function() {
      this.isRunning = true;
      this.isPause = true;
      console.log("Pause") 
      this.sendMachineStatus()
    },
    resume: function() {
      this.isRunning = true;
      this.isPause = false;
      console.log("Resume")
      this.sendMachineStatus()
    },
    stop: function() {
      this.isRunning = false;
      this.isPause = false;
      console.log("Stop")
      this.sendMachineStatus()
    },

  }
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

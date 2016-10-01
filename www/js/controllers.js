angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, mySocket, HealthyBack, Fabric, FabricConstants) {

  $scope.fabric = {}
  $scope.FabricConstants = FabricConstants

  $scope.healthyBack = HealthyBack

  //events
  $scope.changeToProfile = function(profile) {
    console.log("Change to profile")
    console.log(profile)
    $scope.healthyBack.currentProfile = profile
    mySocket.emit("update profile", profile)
  }

  mySocket.on("current profile", function(profile) {
    $scope.healthyBack.currentProfile = profile
  });
  mySocket.on("connect", function() {
    $scope.healthyBack.status = true
  });

  mySocket.on("disconnect", function() {
    $scope.healthyBack.status = false
  });

  mySocket.on('machine status', function(isRunning, isPause) {
    $scope.healthyBack.isRunning = isRunning
    $scope.healthyBack.isPause = isPause
  })

  $scope.init = function() {
    canvasClick = document.getElementById('a');
    canvas = this.__canvas = new fabric.Canvas('mycanvas', { selection: true });
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

    rect = new $scope.fabric.Rect({
      left: 250,
      top: 295,
      fill: 'black',
      width: 80,
      height: 70
    });
    canvas.add(rect);
  }

  setInterval(function() {
    console.log($scope.healthyBack)
    console.log(HealthyBack)
    $scope.$apply()
  }, 1000)

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

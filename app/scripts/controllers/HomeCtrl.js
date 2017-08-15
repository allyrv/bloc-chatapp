(function() {
    function HomeCtrl(Room) {
      this.rooms = Room.all;
    }

    angular
        .module('blocChatapp')
        .controller('HomeCtrl', ['Room', HomeCtrl]);
})();

(function() {
    function HomeCtrl(Room, Message, $uibModal, $cookies) {
      this.rooms = Room.all;
      this.currentRoom = null;
      this.currentUser = $cookies.get('blocChatappCurrentUser');
      this.currentTime = new Date(new Date().getTime()).toLocaleTimeString();

      this.addRoom = function() {
            $uibModal.open({
                templateUrl: '/templates/modal.html',
                size: 'sm',
                controller: 'ModalCtrl as modal'
            });
      }

      this.setCurrentRoom = function (room) {
          this.currentRoom = room;
          this.currentRoomId = room.$id
          this.messages = Message.getByRoomId(this.currentRoom.$id);
          console.log(this.messages);
      }

      this.sendMessage = function() {
        console.log(this.message);
        console.log(this.currentRoomId);
        console.log(this.currentUser);
        console.log(this.currentTime);
        Message.send(this.message, this.currentRoomId, this.currentUser, this.currentTime);
        this.message = "";
      }

    }

  angular
      .module('blocChatapp')
      .controller('HomeCtrl', ['Room', 'Message', '$uibModal', '$cookies', HomeCtrl]);
})();

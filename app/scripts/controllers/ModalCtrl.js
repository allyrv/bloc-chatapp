(function() {
  function ModalCtrl($uibModalInstance, Room) {

    this.roomService = Room;

    this.dismiss = function() {
      $uibModalInstance.dismiss('cancel');
    };

    this.submit = function() {
      if(this.text) {

        this.roomService.addRoom(this.text);
        this.text = '';
        $uibModalInstance.close();
      }

    };
  }

  angular
    .module('blocChatapp')
    .controller('ModalCtrl', ['$uibModalInstance','Room', ModalCtrl]);
})();

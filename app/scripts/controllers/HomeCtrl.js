(function(){
  function HomeCtrl(Room, $uibModal) {

    this.roomObject = Room;

    this.open = function() {
      $uibModal.open({
        templateUrl: '/templates/modal.html',
        controller: 'ModalCtrl as modal'
      });
    };

    this.dismiss = function() {
        $uibModal.dismiss();
    };
  }

  angular
    .module('blocChatapp')
    .controller('HomeCtrl', ['Room','$uibModal', HomeCtrl]);
})();

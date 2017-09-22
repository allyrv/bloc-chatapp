(function() {
    function UserCtrl($cookies, $uibModalInstance) {
      var userCtrl = this;

      this.createUsername = function() {
          if(this.username) {
          $cookies.put('blocChatappCurrentUser', userCtrl.username);
          $uibModalInstance.close();
      } else {
          alert("Create a username to send messages");
      }

    };
  };

    angular
        .module('blocChatapp')
        .controller('UserCtrl', ['$cookies', '$uibModalInstance', UserCtrl]);
})();

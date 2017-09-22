(function() {
  function BlocChatCookies($cookies, $uibModal) {
      var currentUser = $cookies.get('blocChatappCurrentUser');
      if (!currentUser || currentUser === '') {
          $uibModal.open({
              templateUrl: 'templates/username.html',
              size: 'sm',
              controller: 'UserCtrl',
              controllerAs: 'userctrl'
          })
      }
      console.log(currentUser);
}

  angular
      .module('blocChatapp')
      .run(['$cookies', '$uibModal', BlocChatCookies]);
})();

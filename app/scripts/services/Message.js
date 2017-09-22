(function() {
    function Message($firebaseArray) {
        var Message = {};

        var ref = firebase.database().ref().child("messages");
        var messages = $firebaseArray(ref);


        Message.getByRoomId = function(roomId) {
            return $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));
        }

        return Message;
    }

    angular
        .module('blocChatapp')
        .factory('Message', ['$firebaseArray', Message]);
})();

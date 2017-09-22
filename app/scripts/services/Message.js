(function() {
    function Message($firebaseArray) {
        var Message = {};
        var ref = firebase.database().ref().child("messages");
        var messages = $firebaseArray(ref);


        Message.getByRoomId = function(roomId) {
            return $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));
        };

        Message.send = function(newMessage, roomId, username, currentTime) {
         console.log("test" + roomId );
         messages.$add({ content: newMessage, roomId: roomId, username: username, sentAt: currentTime})
       }

        return Message;
    }

    angular
        .module('blocChatapp')
        .factory('Message', ['$firebaseArray', Message]);
})();

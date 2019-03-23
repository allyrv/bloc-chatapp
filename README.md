## Bloc-Chat

![blocchat](/app/assets/viewchatroommessages.png)

**Blocchat** is a chatroom app which allows users to send messages to each other via chatrooms.Users will also have the ability to create their own chatrooms.--
Blocchat has been built with the following technologies -

- AngularJS(1.5.7)
- AngularFire(2.0.1)

## _User stories_

The following user stories are part of the blocchat app:

1. Users need to sign in to _Blocchat_ to view the available rooms
2. Users need to have the ability to create chat rooms.
3. Users need to see the current messages in all rooms.
4. Users need to send messages associated with their user name in all rooms.

## _Solution_

#### List all rooms
--------------------

The first step would be to create a room factory,inject the `$firebaseArray()` service and then use the firebase's `child()` method to query the rooms.

  ```
  (function() {
    function Room($firebaseArray) {
      var ref = firebase.database().ref().child("rooms");
      var rooms = $firebaseArray(ref);

      window.foo = $firebaseArray(firebase.database().ref().child("messages"));

      return {
        all: rooms
      };
    }

    angular
      .module('blocChat')
      .factory('Room', ['$firebaseArray', Room]);
  })();

  ```

#### Create chat rooms
----------------------

To create new chat rooms,I've used the AngularFire's `$add` method inside a RoomFactory method `add` which takes `room` as an argument.

  ```
  (function() {
    function Room($firebaseArray) {
    ......
    ......

      rooms.addRoom = function(name){
      this.$add({name: name});
      };

      }

    angular
      .module('blocChat')
      .factory('Room', ['$firebaseArray', Room]);
  })();

  ```

#### List Messages
--------------------

To list all the messages when the user clicks a chat room,the pattern is same as that of a room - create a `message` factory,inject the `$firebaseArray` service ,and use the `child()` method to query for messages.

  ```
  (function() {
    function Message($firebaseArray) {
    var ref = firebase.database().ref().child("messages");
    //var messages = $firebaseArray(ref);

    return {
      getByRoomId: function (roomId) {
        // Filter the messages by their room ID.
        console.log(roomId);
        return $firebaseArray(ref.orderByChild("roomId").equalTo(roomId));
      },

    };


    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', Message]);
    })();

  ```

#### Send messages
------------------

In this case,we add a method to your Message factory called send, that takes a message object as an argument and submits it to your Firebase server:

  ```
  (function() {
    function Message($firebaseArray) {
    ....
    ....
    send: function(newMessage) {
          // Send method logic
          console.log(newMessage);
          $firebaseArray(ref).$add(newMessage);
        }
    ....
    ....

     angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
    })();

  ```

#### User Authentication
-------------------------

To store the user in the browser,I used _cookies_ and to integrate cookies with Angular -

- Inject the `ngCookies` module in to the Angular app's dependency array
- Inject the $cookies service into the run block's dependencies to check for the presence of the cookie holding the username

  ```
  (function() {
    function BlocChatCookies($cookies) {
      var currentUser = $cookies.get('blocChatCurrentUser');
      if (!currentUser || currentUser === '') {
        // Do something to allow users to set their username
      }
    }

    angular
      .module('blocChat')
      .run(['$cookies', BlocChatCookies]);
    })();

    ```

Next, I've used the basic javascript `prompt()` in the authentication controller to prompt the user for _email_ and _password_ when user clicks 'Login'

## _Results_

#### User Signin
--------------------
Before testing the authentication,users have to be manually created in the firebase database.

![sign in](/app/assets/signin.png "Sign In")

#### List Chatrooms
--------------------
Shows a list of chatrooms available for the user.

![list chatrooms](/app/assets/viewchatroommessages.png)

#### Create New Chatroom
--------------------
User creates a new chatroom and sends a message to the chatroom

![send messages](/app/assets/createnewroom.png)

#### Show Messages
--------------------

![show messages](/app/assets/newroomwithmessages.png)


## Bloc Frontend Project Starter

A starter application for student projects in Bloc's [Frontend Web Development Course](https://www.bloc.io/frontend-development-bootcamp).

## Pull Down the Code

Start by cloning the repository:

```
$ git clone https://github.com/Bloc/bloc-frontend-project-starter.git <your-frontend-project-name>
```

## Reset Git

This will be your personal project. So all of the past commit history that we used to build this starter app aren't needed. Also you will want to be able to push/pull code from your personal remote (Github) repository and NOT Bloc's remote (Github) repository.

Remove the existing local Git repository:

```
$ rm -r -f .git
```

Initialize a new Git repository, add all of these existing files, and commit them:

```
$ git init
$ git add .
$ git commit -m "initial commit"
```

Go to Github and create a new repository. Add that new repository as the proper remote. Then push your initial commit.

```
$ git remote add origin <URL TO NEW GITHUB REPO>
$ git push origin master
```

## Configuration

The project uses Node to run a JS server in development. This will be important when we want to use urls /album or /collection instead of the basic album.html or collection.html. It may  help to review [our resource on NPM and `package.json` files](https://www.bloc.io/resources/npm-and-package-json).

Install the project dependencies by running:

```
$ npm install
```

## Run the Application

Run the application server:

```
$ npm start
```

The server will start up. To stop the server, press `cntrl + c`.


## Use in Brackets Live Preview

To use the application with the Live Preview functionality of the Brackets text editor, go to __File > Project Settings__ and add `http://localhost:3000` to the Base URL field.

![Screenshot of project settings URL in Brackets](https://bloc-global-assets.s3.amazonaws.com/images-frontend/screenshots/bloc-frontend-project-starter/live_preview_project_settings.png)

The text in the application will not update on every keystroke, but changes will automatically push when you save the file.

## Directory Structure

```
├── LICENSE
├── README.md
├── app
│   ├── assets
│   │   └── images
│   │       └── bloc-logo-white.png
│   ├── pages
│   │   └── index.html
│   ├── scripts
│   │   └── app.js
│   ├── styles
│   │   └── style.css
│   └── templates
│       └── home.html
├── package.json
└── server.js
```


### Assets/Images

Add images to the `app/assets/images` directory. To reference images in HTML, use the path `/assets/images/<image file name>.jpg`. For example, to include the image called `bloc-white-logo.png`, the path for the `src` attribute in the HTML would be:

```html
<img src="/assets/images/bloc-white-logo.png">
```

__Note:__ A sample image has been added to `app/images`. To remove the image from the application, run the following command from the root of repo:

```bash
$ rm -f app/assets/images/bloc-white-logo.png
```

To reference any other assets, like the music in Bloc Jams, use the path `assets/<asset-type>/<asset-file-name>`.

### Difference between Pages and Templates

The `templates` directory should hold any HTML files used as templates in Angular states configured by UI Router. All other HTML files belong in the `pages` directory.

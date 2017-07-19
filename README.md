# Hello Brave New World!

A skeleton for connecting ionic to firebase with a node api. 

## Getting Started
The app uses a web based firebase integration for development and testing and a native firebase integration for deployment.

For extended usage and documentation see:
[cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase)
[ionic native firebase](https://ionicframework.com/docs/native/firebase/)

## Installing

Install/update the prerequiste frameworks.
```
$ npm install -g ionic cordova angular typescript
```
To test serve the app to your browser, it will ask you to install dependencies.
```
$ ionic serve
```

## Dependencies

The main dependency for native firebase is [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase), if you are getting build errors you may want to reinitialize it with the following commands:
```
$ ionic cordova plugin add cordova-plugin-firebase
$ npm install --save @ionic-native/firebase
```
# Hello Brave New World!
A skeleton for connecting ionic to firebase with a node api. 

## Getting Started
The app uses a web based firebase integration for development and testing and a native firebase integration for deployment.

For further documentation see:
[cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase)

[ionic native firebase](https://ionicframework.com/docs/native/firebase/)

### Installing
Install/update the prerequiste frameworks.
```
$ npm install -g ionic cordova angular typescript
```
To test serve the app to your browser, it will ask you to install dependencies.
```
$ ionic serve
```

### Usage
To use the application in a mobile environment follow these steps.

1. Install native firebase plugin.
```
$ ionic cordova plugin add cordova-plugin-firebase
$ npm install --save @ionic-native/firebase promise-polyfill
```

2. Edit config.xml with your own information (or use existing for testing).
``` 
<name>HBNW</name>
<description>Hello Brave New World!</description>
<author email="lolotrgeek@gmail.com" href="http://github.com/lolotrgeek">lolotrgeek</author>
```

3. Download GoogleService-info.plist and google-services.json from firebase (or use the existing for testing)

4. Build with --release to generate manifest (android) and bundle (ios).
```
$ ionic cordova build --release android
$ ionic cordova build --release ios
```

### Rebuilding
Removing and re-adding can help keep it bug free, but is not always necessary.
```
$ cordova plugin save
$ cordova platform rm ios
$ cordova platform rm android
$ cordova platform add ios
$ cordova platform add android
```
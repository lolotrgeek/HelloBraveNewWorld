# Hello Brave New World!
A skeleton for connecting ionic to firebase with a node api. 

## Getting Started
Angular firebase integration for authentication/database and native firebase integration for push notifications.

### Installing
1. Prerequiste frameworks
```
$ npm install -g ionic cordova angular typescript
```
2. Firebase Config
set your firebase tokens and keys in `src/app/app.firebase.config.ts`

3. Enable email/password Login in firebase console
Optional: enable google/facebook login in firebase console

4. Dependencies and test
```
$ npm install
$ ionic serve
```

### Native Usage
To use the application in a mobile environment follow these steps:

#### 1. Edit
App Config
* change author, title, app id, and description in `/config.xml`
* app id: `<widget id="io.ionic.starter">`  

Firebase Config
* set your firebase tokens and keys in `src/app/app.firebase.config.ts`

#### 2. Download 
Firebase configuration files `GoogleService-Info.plist` (ios) and `google-services.json` (android) from firebase console, place them in the root folder:
```
- HelloBraveNewWorld/
    platforms/
    plugins/
    www/
    config.xml
    google-services.json       <--
    GoogleService-Info.plist   <--
    ...
```
See https://support.google.com/firebase/answer/7015592 for details.

#### 3. Install
* Platforms
```
$ cordova platform add android 
$ cordova platform add ios
```

* Firebase native
```
$ ionic cordova plugin add cordova-plugin-firebase
$ npm install --save @ionic-native/firebase promise-polyfill
```
Documentation:
[cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase)
/ [ionic native firebase](https://ionicframework.com/docs/native/firebase/)

* Facebook Login native
Register your Facebook app to get APP_ID and APP_NAME https://developers.facebook.com/apps.
```
ionic plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication" --save
```
Documentation:
[cordova-plugin-facebook4](https://github.com/jeduan/cordova-plugin-facebook4)
/ [ionic native facebook](http://ionicframework.com/docs/native/facebook/)

* Google Login native
get REVERSED_CLIENT_ID from `GoogleService-Info.plist`

```
$ ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=myreversedclientid
$ npm install --save @ionic-native/google-plus
```
Documentation:
[cordova-plugins-googleplus](https://github.com/EddyVerbruggen/cordova-plugin-googleplus)
/ [ionic native google plus](http://ionicframework.com/docs/native/google-plus/)

#### 4. Build
--release flag will generate manifest (android) and bundle (ios).
```
$ ionic cordova build --release android
$ ionic cordova build --release ios
```

### Rebuilding
Use the follow for a clean rebuild prior to release.
```
$ cordova plugin save
$ cordova platform rm ios
$ cordova platform rm android
$ cordova platform add ios
$ cordova platform add android
```
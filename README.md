# Hello Brave New World!
A skeleton for connecting ionic to firebase with a node api. 

## Getting Started
Angular firebase integration for authentication/database and native firebase integration for push notifications.

For further documentation see:

[cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase)

[ionic native firebase](https://ionicframework.com/docs/native/firebase/)

### Installing
Install/update prerequiste frameworks:
```
$ npm install -g ionic cordova angular typescript
```
Install dependencies and test:
```
$ npm install
$ ionic serve
```

### Usage
To use the application in a mobile environment follow these steps.

#### 1. Install
```
$ ionic cordova plugin add cordova-plugin-firebase
$ npm install --save @ionic-native/firebase promise-polyfill
```

#### 2. Edit
App Config
⋅⋅* `/config.xml`
⋅⋅* app id: `<widget id="io.ionic.starter">`  

Firebase Config
⋅⋅* `src/app/app.firebase.config.ts`
⋅⋅* get keys,tokens, etc.. from firebase console

#### 3. Download 
Firebase configuration files `GoogleService-Info.plist` for ios and `google-services.json` android, place them in the root folder:
```
- HellowBraveNewWorld/
    platforms/
    plugins/
    www/
    config.xml
    google-services.json       <--
    GoogleService-Info.plist   <--
    ...
```
See https://support.google.com/firebase/answer/7015592 for details.


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
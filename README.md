# Hello Brave New World!
A skeleton for connecting ionic to firebase with a node api. 

## Getting Started
Angular and native Firebase integration for mobile authentication/database /notifications.

### Installing
#### 1. Prerequiste frameworks
```
$ npm install -g ionic cordova angular typescript
```
#### 2. Firebase Config
Set your firebase tokens and keys in `src/app/app.firebase.config.ts`

#### 3. Enable email/password Login in Firebase Console
Sign-in methods: Anonymous, Email/Password, Google, Facebook

#### 4. Dependencies and test
```
$ npm install
$ ionic serve
```

### Native Usage
To use the application in a mobile environment follow these steps:

#### 1. App Config
__Located at top of `/config.xml`__

Change author, title, id, and description here: 
```
<widget id="io.ionic.starter" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>HBNW</name>
    <description>Hello Brave New World!</description>
    <author email="lolotrgeek@gmail.com" href="http://github.com/lolotrgeek">lolotrgeek</author>
```

#### 2 . Firebase Config
Set your firebase tokens and keys in `src/app/app.firebase.config.ts`

#### 3. Download 
Build files `GoogleService-Info.plist` (ios) and `google-services.json` (android) from Firebase Console, place them in the root folder:
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

#### 4. Plugin Config
__Located at bottom of `/config.xml`__

4a. Google Login

_`REVERSED_CLIENT_ID` found in `GoogleService-Info.plist` from Download step above._
```
    <plugin name="cordova-plugin-googleplus" spec="^5.1.1">
        <variable name="REVERSED_CLIENT_ID" value="com.googleusercontent.apps.128224322715-ho1ahuid2umfrvorj1ijef94k7q5uosd" />
    </plugin>
```

4b. Facebook Login

_Register your Facebook app to get APP_ID and APP_NAME https://developers.facebook.com/apps._
```
    <plugin name="cordova-plugin-facebook4" spec="^1.9.1">
        <variable name="APP_ID" value="YOURAPPIDHERE" />
        <variable name="APP_NAME" value="YOURAPPNAMEHERE" />
    </plugin>
```

#### 3. Build
Use cordova to build 
3a. Platforms
```
$ cordova platform add android 
$ cordova platform add ios
```
3b. Build
--release flag will generate manifest (android) and bundle (ios).
```
$ cordova build --release android
$ cordova build --release ios
```

#### 4. Rebuilding
Use the following for a clean rebuild.
```
$ cordova plugin save
$ cordova platform rm ios
$ cordova platform rm android
$ cordova platform add ios
$ cordova platform add android
```

## Documentation
Google Login native: [cordova-plugins-googleplus](https://github.com/EddyVerbruggen/cordova-plugin-googleplus)
/ [ionic native google plus](http://ionicframework.com/docs/native/google-plus/)

Facebook Login native: [cordova-plugin-facebook4](https://github.com/jeduan/cordova-plugin-facebook4)
/ [ionic native facebook](http://ionicframework.com/docs/native/facebook/)

Firebase native: [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase)
/ [ionic native firebase](https://ionicframework.com/docs/native/firebase/)

Additional OAuth Docs:

[Authenticate Using OAuth Providers with Cordova](https://firebase.google.com/docs/auth/web/cordova)

[Auth-with-Ionic3-Angular4](https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic3-Angular4.md)

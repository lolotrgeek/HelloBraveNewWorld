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
Go to [Firebase Console](https://console.firebase.google.com).

Get tokens/keys and copy into `src/app/app.firebase.config.ts`

Enable Authentication -> Sign-in Methods: 
* Email/Password 
* Google 
* Facebook

#### 3. Install and test
```
$ npm install
$ ionic serve
```

### Native Config
To use the application in a native environment follow these steps:

#### 1. App Config
Change author, title, id, and description in `/config.xml`:
```
<widget id="io.ionic.starter" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>HBNW</name>
    <description>Hello Brave New World!</description>
    <author email="lolotrgeek@gmail.com" href="http://github.com/lolotrgeek">lolotrgeek</author>
```

#### 2. Download Config
Go to [Firebase Console](https://console.firebase.google.com)  
and download `GoogleService-Info.plist` (ios) and `google-services.json` (android), place them in the root folder:
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
Found in `/config.xml` at the bottom of the file.

Google Login
```
    <plugin name="cordova-plugin-googleplus" source="npm">
        <variable name="REVERSED_CLIENT_ID" value="myreversedclientid" />
    </plugin>
```
_`REVERSED_CLIENT_ID` found in `GoogleService-Info.plist` from Download step above._

Facebook Login
```
    <plugin name="cordova-plugin-facebook4" spec="^1.9.1">
        <variable name="APP_ID" value="myappid" />
        <variable name="APP_NAME" value="myappname" />
    </plugin>
```
_Register your Facebook app to get APP_ID and APP_NAME https://developers.facebook.com/apps._

#### 3. Build
```
$ cordova platform add android 
$ cordova platform add ios
```

--release flag will generate manifest (android) and bundle (ios).
```
$ cordova build --release android
$ cordova build --release ios
```

Rebuild: Use the following for a clean rebuild
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

Additional OAuth Docs:[Authenticate Using OAuth Providers with Cordova](https://firebase.google.com/docs/auth/web/cordova) /[Auth-with-Ionic3-Angular4](https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic3-Angular4.md)

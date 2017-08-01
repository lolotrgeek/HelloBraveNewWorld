import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Firebase } from '@ionic-native/firebase';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private firebase: Firebase, 
  ) {
    
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // If environement is native, load native firebase
      if (platform.is('cordova')) {

        console.log ('PLATFORM: Cordova')
        // FIREBASE Native
        this.firebase.getToken()
          .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
          .catch(error => console.error('Error getting token', error));

        this.firebase.onTokenRefresh()
          .subscribe((token: string) => console.log(`Got a new token ${token}`));
      }
      if (platform.is('ios')) {
        console.log ('PLATFORM: ios')  
        this.firebase.grantPermission() // for ios
      }
      if (platform.is('browser')) {
          console.log ('PLATFORM: Browser')
      }
    });
  }
}

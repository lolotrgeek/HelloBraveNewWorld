import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase Native
import { Firebase } from '@ionic-native/firebase';

// Firebase Web
import { AngularFireModule } from 'angularfire2'; // DEV: remove for mobile deployment
import { AngularFireDatabaseModule } from 'angularfire2/database'; // DEV: remove for mobile deployment

// Firebase Web Config:
export const firebaseConfig = {  
    apiKey: "AIzaSyALtPpAv2e7ZiH9zi74KuawgWUSj80d-58",
    authDomain: "hellobravenewworld-b6b1e.firebaseapp.com",
    databaseURL: "https://hellobravenewworld-b6b1e.firebaseio.com",
    projectId: "hellobravenewworld-b6b1e",
    storageBucket: "hellobravenewworld-b6b1e.appspot.com",
    messagingSenderId: "128224322715"
} // DEV: remove for mobile deployment

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // DEV: remove for mobile deployment
    AngularFireDatabaseModule // DEV: remove for mobile deployment
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

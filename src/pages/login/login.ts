import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Platform } from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
import { GooglePlus } from '@ionic-native/google-plus';
import { googleplusConfig } from '../../app/app.googleplus.config';
import { Facebook } from '@ionic-native/facebook';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User; // local user model
  afterLoginRoot = TabsPage ; // Set page to redirect to after login

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    private toast:ToastController, 
    private platform: Platform,  
    private afAuth: AngularFireAuth, 
    private googlePlus: GooglePlus, 
    private fb: Facebook
  ){
    this.afAuth.authState.subscribe(afUser => {
        if(afUser) {
            this.navCtrl.setRoot(this.afterLoginRoot);
            return;
        }else {
            return;
        }
    });
  }

  ionViewdidLoad(){
    console.log ('login loaded');
  }
  
  // LOGIN - Success callback
  loginSuccess(result) {
    this.afAuth.authState.subscribe(data => {
      if (data && data.uid) { // check for user data
          this.navCtrl.setRoot(this.afterLoginRoot); // if user data present, redirect
      } 
    });
  }
  // LOGIN - Error callback
  loginError(e){        
      console.error(e);
      this.toast.create({
        message: e.message,
        duration: 3000
      }).present();
  }

  // LOGIN - USER MODEL
  async login(user:User) { 
    try {
      // Native: user model
      if (this.platform.is('cordova')) { 
        const result = firebase.auth().signInWithEmailAndPassword(user.email, user.password);        
        console.log(result);
        if (result) {
          this.loginSuccess(result);
        }
      // Web: user model
      } else { 
        const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        console.log(result);
      if (result) {
          this.loginSuccess(result);
        }
      }
    }
    catch (e) {
      this.loginError(e);
    }
  }

  //LOGIN - Google
  googlelogin(): void {
    // Native: google
    if (this.platform.is('cordova')) {
        this.googlePlus.login(googleplusConfig).then( result => {  // get login token from googleplus 
            firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken)); // pass token to firebase
        }).then( success => {
          console.log('FIREBASE LOGIN SUCCESS:' + JSON.stringify(success)); // Log success

        }).catch(err => {console.error(err) 
            this.alertCtrl.create({ // Alert any error
              title: 'Google Login failed',
              message: JSON.stringify(err), 
              buttons: ['Ok']
            }).present();
        });

    } else {
    // Web: google
      const result = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(result);
      if (result) {
        this.loginSuccess(result);
      }
    }
  }

  // LOGIN - Facebook
  async facebooklogin() {
    try {
      // Native: facebook
      if (this.platform.is('cordova')) {
        return this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken); // get login token from facebook
          const result = firebase.auth().signInWithCredential(facebookCredential); // pass token to firebase
          if (result) {
            this.loginSuccess(result);
          }
        })
      } else {
      // Web: facebook
      const result = this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        console.log(result);
        if (result) {
          this.loginSuccess(result);
        }
      }
    }
    catch (e) {
      this.loginError(e);
    }
  }

  // REGISTER - USER MODEL
  async register(user:User){    
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.loginSuccess(result);
      }
    }
    catch (e) {
      this.loginError(e);
    }
  }
}

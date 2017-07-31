import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
//import { RegisterPage } from '../register/register';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // MODEL: user
  user = {} as User;

  constructor(public navCtrl: NavController, private toast:ToastController, private platform: Platform, public navParams: NavParams, private afAuth: AngularFireAuth, private googlePlus: GooglePlus, private fb: Facebook) {
    console.log ('login loaded');
  
  }

  // LOGIN: Model
  async login(user:User) {    
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);

      console.log(result);

      if (result) {
          this.afAuth.authState.subscribe(data => {
            if (data && data.uid) {
                this.navCtrl.setRoot(TabsPage)
            } 
          });
        }
      }
    catch (e) {
      console.error(e);
        this.toast.create({
          message: e.message,
          duration: 3000
        }).present();
      }
    }
  
  //LOGIN: Google
  async googlelogin() {
    try {
      //Native
      if (this.platform.is('cordova')) {
        const result = this.googlePlus.login({})
        if (result) {
          this.navCtrl.setRoot(TabsPage)
        }
      } else {
      // Web
        const result = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        
        console.log(result);
        
        if (result) {
          this.afAuth.authState.subscribe(data => {
            if (data && data.uid) {
                this.navCtrl.setRoot(TabsPage)
            } 
          });
        }
      }
    }
    catch (e) {
      console.error(e);
        this.toast.create({
          message: e.message,
          duration: 3000
        }).present();
    }
  }
  // LOGIN: Facebook
  async facebooklogin() {
    try {
      // Native
      if (this.platform.is('cordova')) {
        return this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          const result = firebase.auth().signInWithCredential(facebookCredential);
          if (result) {
            this.afAuth.authState.subscribe(data => {
              if (data && data.uid) {
                  this.navCtrl.setRoot(TabsPage)
              } 
            });
          }
        })

      } else {
      // Web
      const result = this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      
        console.log(result);

        if (result) {
          this.afAuth.authState.subscribe(data => {
            if (data && data.uid) {
                this.navCtrl.setRoot(TabsPage)
            } 
          });
        }
      }
    }
    catch (e) {
      console.error(e);
        this.toast.create({
          message: e.message,
          duration: 3000
        }).present();
    }
  }

  // Register
  async register(user:User){    
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
          this.afAuth.authState.subscribe(data => {
            if (data && data.uid) {
                this.navCtrl.setRoot(TabsPage)
            } 
          });
      }
    }
    catch (e) {
      console.error(e);
        this.toast.create({
          message: e.message,
          duration: 3000
        }).present();
    }
  }
}

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
      console.log ('login loaded');
      this.afAuth.authState.subscribe(afUser => {
          if(afUser) {
              this.navCtrl.setRoot(TabsPage);
              return;
          }else {
              return;
          }
      });
  }

  // LOGIN: user model
  async login(user:User) {    
    try {
      // native user model login
      if (this.platform.is('cordova')) { 

        const result = firebase.auth().signInWithEmailAndPassword(user.email, user.password);
        
        console.log(result);

        if (result) {
          this.afAuth.authState.subscribe(data => {
            if (data && data.uid) {
                this.navCtrl.setRoot(TabsPage)
            } 
          });
        }
        // Web user model login
      } else { 
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
googlelogin(): void {
      // Native google
      if (this.platform.is('cordova')) {
          this.googlePlus.login(googleplusConfig).then( result => {  
              firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken));
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
      // Web google
        const result = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        console.log(result); // Log Result
        if (result) {
          this.afAuth.authState.subscribe(data => {
            if (data && data.uid) {
                this.navCtrl.setRoot(TabsPage)
            } 
          });
        }
      }
    }

  
  // LOGIN: Facebook
  async facebooklogin() {
    try {
      // Native facebook
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
      // Web facebook
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

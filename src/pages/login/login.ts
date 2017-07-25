import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth }  from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

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

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  // FIREBASE Authentication
  async login(user:User) {    
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.navCtrl.setRoot(TabsPage)
      }
    }
      catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

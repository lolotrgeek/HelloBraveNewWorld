import { Component } from '@angular/core';

import { NavController} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private afAuth:AngularFireAuth, public navCtrl: NavController) {
    
      this.afAuth.authState.subscribe(user => {
        // UI: Display nothing if there is no user
        if (!user) {        
          this.navCtrl.setRoot(LoginPage);
          return;
      }
    });
  }
}

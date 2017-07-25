import { Component } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private afAuth:AngularFireAuth, private toast:ToastController) {

  }
  ionViewWillLoad () {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
    }
  }
  );
  }
}

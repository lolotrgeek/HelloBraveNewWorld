import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayName;
  items: FirebaseListObservable<any>; 

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private toast:ToastController, afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    
    // Construct Display Name
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;        
        return;
      }
      this.displayName = user.displayName;      
    });
    // Construct list from Firebase DB (afDB)
    this.items = afDB.list('/items');

  }

  ionViewWillLoad () {
    // Show User Data only if they are logged in
    this.afAuth.authState.subscribe(user => {
      if (user && user.email && user.uid) {
        // display welcome toast
        this.toast.create({
          message: `Welcome ${user.email}`,
          duration: 3000
        }).present();
      }
      else {
        // otherwise go to login page
        this.navCtrl.setRoot(LoginPage);
    }
  }
  );
  }
  // Signout
  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
      this.toast.create({
        message: `Logged Out`,
        duration: 3000
      }).present();
  }

  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Enter a name for this new item.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(itemId, itemTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Item',
          role: 'destructive',
          handler: () => {
            this.removeItem(itemId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateItem(itemId, itemTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeItem(itemId: string){
  this.items.remove(itemId);
  }

  updateItem(itemId, itemTitle){
    let prompt = this.alertCtrl.create({
      title: 'item Name',
      message: "Update the name for this item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: itemTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.update(itemId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
}

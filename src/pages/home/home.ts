import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayName;
  items: FirebaseListObservable<any>; 

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private toast:ToastController, afDB: AngularFireDatabase, private afAuth: AngularFireAuth, private firebaseDynamicLinks: FirebaseDynamicLinks) {
    
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
    // Return to login page if user is not logged in
    this.afAuth.authState.subscribe(user => {
      if (!user ) {
        this.navCtrl.setRoot(LoginPage);
    }
  });
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
    
  // Example Deep Link
  deepLink () {
    const options = {
      title: 'My Title',
      message: 'My message',
      deepLink: 'http://example.com/',
      callToActionText: 'Message on button'
    }
    this.firebaseDynamicLinks.sendInvitation(options)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));

    this.firebaseDynamicLinks.onDynamicLink()
      .then((res: any) => console.log(res)) 
      //Handle the logic here after opening the app with the Dynamic link
      .catch((error:any) => console.log(error));
  } 

  // Add item to DB
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
  // Show options modal
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
  // remove item from DB
  removeItem(itemId: string){
  this.items.remove(itemId);
  }

  // Update item in DB
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

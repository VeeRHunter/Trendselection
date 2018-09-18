import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TechnologyPage } from '../technology/technology';

/**
 * Generated class for the FooterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html',
})
export class FooterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FooterPage');
  }

  goto_tech() {
    let modal = this.modalCtrl.create(TechnologyPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

}

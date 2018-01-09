import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import PouchDB from 'pouchdb';


/**
 * Generated class for the NewPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-person',
  templateUrl: 'new-person.html',
})
export class NewPersonPage {

  private name;
  private email;
  private phone;

  private db;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  setUpDB(){
    this.db = PouchDB('contactos');
  }

  ionViewDidLoad() {
   this.setUpDB();
  }

  save(){
    //alert("guardando");
    this.db.post({

      name: this.name,
      email: this.email,
      phone: this.phone
    }, (err,result) =>{

        if(!err){

          alert("se creo el contacto exitosamente");
          this.navCtrl.pop();
        }


    } ); 
  }

  cancel(){
  	this.navCtrl.pop();
  }

}

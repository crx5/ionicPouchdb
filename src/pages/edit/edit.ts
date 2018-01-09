import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import PouchDB from 'pouchdb';


/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

	private db;
	private person; 

	private name;
 	private email;
  	private phone;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
    this.setupDB();

    if(this.navParams.get('person_id') != null){
    	this.db.get(this.navParams.get('person_id'), (err, result)=> {
    		if(!err){
    			this.person = result;

    			this.name = result.name;
    			this.email = result.email;
    			this.phone = result.phone;
    		}
    	})
    }
    
  }

  setupDB(){
  	this.db = new PouchDB('contactos');
  }


  save(){
    //alert("guardando");

    this.person.name = this.name;
    this.person.email = this.email;
    this.person.phone = this.phone;

    this.db.put(this.person, (err,result) =>{

        if(!err){

          alert("se edito el contacto exitosamente");
          this.navCtrl.pop();
        } else {
        	alert('error');
        }


    } ); 
  }

  cancel(){
  	this.navCtrl.pop();
  }


}

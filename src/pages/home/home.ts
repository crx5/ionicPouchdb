import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewPersonPage} from '../new-person/new-person';
import {EditPage} from '../edit/edit';

import PouchDB  from 'pouchdb';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  private persons; 

  private db;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
  this.refresh();
  }


  setupDB(){

    this.db = new PouchDB('contactos');

  }

 refresh(){
   this.setupDB();

   this.persons = [];

   this.db.allDocs({include_docs:true}, (err, result)=>{

     if(!err){

         let rows = result.rows;
         console.log(rows);

         for (let i =0; i<rows.length; i++){

           this.persons.push(rows[i].doc);
         }
     }

   });


  	
  } 

  createNew(){
  	this.navCtrl.push(NewPersonPage);
  }

  edit(person){
    this.navCtrl.push(EditPage, {
      person_id: person._id
    })
  }

  delete(person){
    this.db.remove(person, (err, result) =>{

      if(!err){

        alert("Se borro el contacto exitosamente");
        this.refresh();
      }

    })
  }
}

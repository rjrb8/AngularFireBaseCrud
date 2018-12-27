import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  Departamentos: AngularFireList<any>;
  array = [];
  
  constructor(private firebase:AngularFireDatabase) { 
    this.Departamentos = this.firebase.list('departamento');
    this.Departamentos.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
      }
    )
  }

  obtenerDepartamento($key) {
    if ($key == "0")
      return ""; 
    else {
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }
  }
}

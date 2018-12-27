import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private firebase:AngularFireDatabase, private DatePipe:DatePipe) { }
   
  listaEmpleados: AngularFireList<any>;
 
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    departament: new FormControl(0),
    hireDate: new FormControl(''), 
    isPermanent: new FormControl(false),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(4)])
  });


  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      departament: 0,
      hireDate: '', 
      isPermanent: false,
      contrasena: ''
    })
  }

//Funciones crud con firebase 
  getEmpleados() {
    this.listaEmpleados = this.firebase.list('employees');
    return this.listaEmpleados.snapshotChanges();
  }

  insertarEmpleado(employees) {

    this.listaEmpleados.push({
      fullName: employees.fullName,
      email: employees.email,
      mobile: employees.mobile,
      city: employees.city,
      gender: employees.gender,
      departament: employees.departament,
      hireDate: this.DatePipe.transform(employees.hireDate, 'yyyy-MM-dd'),
      isPermanent: employees.isPermanent,
      contrasena: employees.contrasena
    });
  }

  updateEmpleado(employees) {
    this.listaEmpleados.update(employees.$key, {
      fullName: employees.fullName,
      email: employees.email,
      mobile: employees.mobile,
      city: employees.city,
      gender: employees.gender,
      departament: employees.departament,
      hireDate: this.DatePipe.transform(employees.hireDate, 'yyyy-MM-dd'),
      isPermanent: employees.isPermanent,
      contrasena: employees.contrasena
    }); 
  }

  deleteEmpelado($key: string) {
    this.listaEmpleados.remove($key);
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, 'departamentoName'));
  } 
}
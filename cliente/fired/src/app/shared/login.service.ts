import { Injectable, Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private AngularFireDatabase:AngularFireDatabase) { }

  forms:FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  iniciarFormulario() {
    this.forms.setValue({
      $key: null,
      email: '',
      password: '' 
    })
  }

  
}

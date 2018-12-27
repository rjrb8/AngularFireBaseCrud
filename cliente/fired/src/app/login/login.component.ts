import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service'
import { Router, Params } from '@angular/router'
import { AuthService } from '../auth/auth.service'
import { NotificacionService } from '../shared/notificacion.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errorMessage: String = '';
  constructor(private LoginService:LoginService, public AuthService: AuthService, private Router: Router, private NotificacionService: NotificacionService) { }

  ngOnInit() {
    
  }

  onGo(value) {
    console.log(value);
    if (this.LoginService.forms.valid) {
      this.AuthService.doLogin(value)
        .then(res => {
          console.log('Paso 3');
          console.log(res);
          this.Router.navigateByUrl('/principal');
        }, err  => {
          console.log(err);
          switch (err.code) {
            case "auth/user-not-found":
              this.NotificacionService.sucess(':: Error!, no existe usuario con ese nombre')
              break
            case "auth/wrong-password":
              this.NotificacionService.sucess(':: Error!, no es la clave correcta')
              break
          }
          this.errorMessage = err.message;
        })
    }
  }

  onGoGoogle() {
    this.AuthService.doGoogleLogin()
      .then(res => {
        this.Router.navigateByUrl('/principal');
      })
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,  Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { PrincipalService } from '../shared/principal.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public PrincipalService: PrincipalService,
    private Router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.PrincipalService.getCurrentUser()
        .then(user => {
          console.log('Paso 1');
          this.Router.navigate(['/principal']);
          return resolve(false);
        }, err => {
         return resolve(true)
        })
    })
  }
  
}

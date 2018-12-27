import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PrincipalService } from '../shared/principal.service';
import { users } from '../model/user.model.';
import { NotificacionService } from '../shared/notificacion.service'

@Injectable({
    providedIn: 'root'
  })

export class EmpleadoResolver implements Resolve<users> {
   constructor (public PrincipalService:PrincipalService, private Router: Router, private  NotificacionService:  NotificacionService) {}
   
   resolve(route: ActivatedRouteSnapshot): Promise<users> {
       let user = new users();
       return new Promise((resolve, reject) => {
        this.PrincipalService.getCurrentUser()
          .then(res =>{
            if (res.providerData[0].providerId == 'password') {
                user.image = 'https://goo.gl/images/saERWj';
                user.name = res.displayName;
                user.provider = res.providerData[0].providerId
                console.log('Esto aca')
                console.log(user.name);
                return resolve(user)
            }
            else {
                user.image = res.photoURL;
                user.name = res.displayName;
                console.log('Esto aca ang se')
                console.log(user.name);
                this.NotificacionService.sucess(':: Bienvenido ' + user.name + '!')
                user.provider = res.providerData[0].providerId;
                return resolve(user);
            }
           }, err => {
               this.Router.navigate(['/login'])
               this.NotificacionService.sucess('! No eres un usuario')
               console.log(err);
               return reject(err)
            })
          })
        }
    }


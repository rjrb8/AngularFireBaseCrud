import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../shared/principal.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth/auth.service'
import { Location } from '@angular/common'
import { users } from '../model/user.model.'
import { DialogService } from '../shared/dialog.service';
import { NotificacionService } from '../shared/notificacion.service'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  user: users = new users();
  
  constructor(private DialogService:DialogService , private Router: Router,public PrincipalService:PrincipalService, public AuthService:AuthService, private Location:Location, private route: ActivatedRoute, private NotificacionService:NotificacionService) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data']
      if (data) {
        this.user = data;
      }
    })
  }

  onSalir() {
    this.DialogService.openConfirmDialog('Estas seguro que deseas salir del sistema?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.AuthService.doLogout()
            .then(res => {
              this.NotificacionService.sucess(':: Adios!, Has salido del sistema')
              this.Router.navigate(['/login']);
            }, (error) => {
              console.log("Logout Error", error);
            })
        }
      })  
  } 

}

import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../shared/employees.service';
import { DepartamentosService } from '../../shared/departamentos.service';
import { NotificacionService } from '../../shared/notificacion.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employ',
  templateUrl: './employ.component.html',
  styleUrls: ['./employ.component.css']
})
export class EmployComponent implements OnInit {
  
  constructor(public dialog: MatDialogRef<EmployComponent>, private EmployeesService:EmployeesService, private DepartamentosService:DepartamentosService, private NotificacionService:NotificacionService) { }

  ngOnInit() {
    this.EmployeesService.getEmpleados();
  }

  departament = [
    { id:1, value:'Depart 1'  },
    { id:2, value:'Depart 2' },
    { id:3, value:'Depart 3' }
  ];
  
  onSubmit() {
    if (this.EmployeesService.form.valid) {
      if (!this.EmployeesService.form.get('$key').value) {
        this.EmployeesService.insertarEmpleado(this.EmployeesService.form.value);
        this.EmployeesService.form.reset();
        this.EmployeesService.initializeFormGroup();
        this.NotificacionService.sucess(':: Guardado Correctamente');
      }
      else {
        this.EmployeesService.updateEmpleado(this.EmployeesService.form.value);
        this.EmployeesService.form.reset();
        this.EmployeesService.initializeFormGroup();
        this.NotificacionService.sucess(':: Modificado Correctamente');
      }
      this.onCerrar();
    }
  }

  onCerrar() {
    this.EmployeesService.form.reset();
    this.EmployeesService.initializeFormGroup();
    this.dialog.close();
  }

  limpiar() {
    this.EmployeesService.form.reset(); //Para limpiar
    this.EmployeesService.initializeFormGroup();
    this.NotificacionService.sucess(':: Se limpio el Navegador');
  }

}

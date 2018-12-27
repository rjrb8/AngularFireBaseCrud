import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../shared/employees.service';
import { PrincipalService } from '../../shared/principal.service'
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig  } from '@angular/material';
import { DepartamentosService } from '../../shared/departamentos.service';
import { EmployComponent } from '../employ/employ.component';
import { NotificacionService } from '../../shared/notificacion.service';
import { DialogService } from '../../shared/dialog.service';
import { AuthService } from '../../auth/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrls: ['./employ-list.component.css']
})
export class EmployListComponent implements OnInit {

  constructor(private EmployeesService:EmployeesService, public authServ:  AuthService , private DepartamentosService:DepartamentosService, private dialog: MatDialog, private NotificacionService:NotificacionService, private DialogService: DialogService, private Route:Router, public PrincipalService: PrincipalService) { }

  listData: MatTableDataSource<any>;
  //caracteristicas de la tabla a mostrar
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'hireDate', 'departamentoName', 'actions'];
  //importar elemento sort, e implementar decorador
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  //Apicacion de busqueda y muestra en el listado
  searchKey: string;

  ngOnInit() {
    this.EmployeesService.getEmpleados().subscribe(
      list => {
        let array = list.map(item => {
          //Aplicar una busqueda a los departamentos
          let departamentoName = this.DepartamentosService.obtenerDepartamento(item.payload.val()['departament']);
          return {
            $key: item.key,
            departamentoName,
            ...item.payload.val()
          }
        })
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        /*this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'action' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        }*/
      }
    );
  }

  onLimpiar() { 
    this.searchKey = "";
    this.onObtenerFiltro();  
  }
 
  onObtenerFiltro() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCrearModule() {
    this.EmployeesService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployComponent, dialogConfig);
  }

  editarEmpleado(row) {
    this.EmployeesService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"; 
    this.dialog.open(EmployComponent, dialogConfig);
  }

  borrarEmpleado(row) {
    /*if (confirm('Desaea eliminar este empleado?')) {
      this.EmployeesService.deleteEmpelado(row.$key);
      this.NotificacionService.sucess(':: Empleado Eliminado Correctamente');
    }*/
    this.DialogService.openConfirmDialog('Estas seguro que deseas realizar esa opcion?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.EmployeesService.deleteEmpelado(row.$key)
          this.NotificacionService.sucess(':: Empleado Eliminado Correctamente');
        }
      });
  }



}

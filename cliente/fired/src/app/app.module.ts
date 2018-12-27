import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployComponent } from './employees/employ/employ.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeesService } from './shared/employees.service';
import { DepartamentosService } from './shared/departamentos.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }  from 'angularfire2/auth'
import { environment } from '../environments/environment';
import { DatePipe } from '@angular/common';
import { EmployListComponent } from './employees/employ-list/employ-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { AuthService } from './auth/auth.service'
import { PrincipalService } from './shared/principal.service'
import { EmpleadoResolver } from './employees/employees.resolver'
import { AngularFirestoreModule } from 'angularfire2/firestore'

const Rutas: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard] },
  { path: 'principal', component: EmployeesComponent,   resolve: { data: EmpleadoResolver }}  
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployComponent,
    EmployListComponent,
    MatConfirmDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.configBd),
    AngularFireDatabaseModule,
    RouterModule.forRoot(Rutas, { useHash: false }),
    AngularFireAuthModule,
    AngularFirestoreModule
    ],
  providers: [AuthGuard, EmployeesService, DepartamentosService, DatePipe, AuthService, PrincipalService, EmpleadoResolver],
  bootstrap: [AppComponent],
  entryComponents: [EmployComponent, MatConfirmDialogComponent, ]
})
export class AppModule { }
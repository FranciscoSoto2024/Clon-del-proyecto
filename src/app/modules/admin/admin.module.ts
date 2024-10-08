import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Archivo de rutas del modulo
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './pages/admin/admin.component';

import { TableComponent } from './components/table/table.component';
//Paqueteria para formularios y formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports:[
    AdminComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]

})
export class AdminModule { }

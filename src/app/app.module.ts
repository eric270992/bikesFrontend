import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './Components/client/client.component';
import { VehicleUnicComponent } from './Components/vehicle-unic/vehicle-unic.component';
import { HttpClientModule } from '@angular/common/http';
//PrimeNGnpm install @angular/cdk --save
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { DetailsComponent } from './Components/client/forms/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAddComponent } from './Components/vehicle-unic/forms/form-add.component';
import { AddClientComponent } from './Components/client/forms/add-client.component';
import { FullIncidenciaComponent } from './Components/full-incidencia/full-incidencia.component';
import {CalendarModule} from 'primeng/calendar';  


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    VehicleUnicComponent,
    DetailsComponent,
    FormAddComponent,
    AddClientComponent,
    FullIncidenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './Components/client/client.component';
import { DetailsComponent } from './Components/client/forms/details.component';
import { FormAddComponent } from './Components/vehicle-unic/forms/form-add.component';
import { AddClientComponent } from './Components/client/forms/add-client.component';
import { VehicleUnicComponent } from './Components/vehicle-unic/vehicle-unic.component';
import { FullIncidenciaComponent } from './Components/full-incidencia/full-incidencia.component';
import { NotFoundComponentComponent } from './Components/not-found-component/not-found-component.component';


const routes: Routes = [
  {path:"", component:ClientComponent},
  {path:"clients", component:ClientComponent},
  {path:"clients/add",component:AddClientComponent},
  {path:"clients/detail/:id", component:DetailsComponent},
  {path:"clients/:id/vehicle", component:FormAddComponent},
  {path:"vehicles/detail/:numSerie", component:VehicleUnicComponent},
  {path:"incidencia/:numSerie", component:FullIncidenciaComponent},
  {path:"incidencia/:numSerie/:idIncidencia", component:FullIncidenciaComponent},
  {path:"**", component:NotFoundComponentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './Components/client/client.component';
import { DetailsComponent } from './Components/client/forms/details.component';
import { FormAddComponent } from './Components/vehicle-unic/forms/form-add.component';


const routes: Routes = [
  {path:"", component:ClientComponent},
  {path:"clients", component:ClientComponent},
  {path:"clients/detail/:id", component:DetailsComponent},
  {path:"clients/vehicle", component:FormAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';

@Component({
  selector: 'app-vehicle-unic',
  templateUrl: './vehicle-unic.component.html',
  styleUrls: ['./vehicle-unic.component.css']
})
export class VehicleUnicComponent implements OnInit {

  formVehicleAdd:FormGroup;
  vehicle:VehicleUnic=new VehicleUnic();

  constructor(private fb:FormBuilder, private route:ActivatedRoute, private serviceVehicleUnic:VehicleNouService, private clientService:ClientService) { }

  ngOnInit(): void {
    //Iniciem formulari en blanc
    this.iniciarFormulari();
    //Mirem si tenim número de serie
    let numSeriePassat = this.route.snapshot.paramMap.get('numSerie');
    //Si tenim núm serie carreguem el vehicle i el posem al formulari
    if(numSeriePassat!=""){
      console.log("Num Serie: "+numSeriePassat);
      this.carregarVehicle(numSeriePassat);
    }

  }

  iniciarFormulari(){
    this.formVehicleAdd = this.fb.group({
      formNumSerie:new FormControl(""),
      formMarca:new FormControl(""),
      formModel:new FormControl("")
    });
  }

  carregarVehicle(numSerie:string){
    this.serviceVehicleUnic.findVehicleNumSerie(numSerie).subscribe(
      (vehicleRetornat) => {
        this.vehicle = vehicleRetornat;
        this.formVehicleAdd.controls['formNumSerie'].setValue(this.vehicle.numSerie);
        this.formVehicleAdd.controls['formMarca'].setValue(this.vehicle.marca);
        this.formVehicleAdd.controls['formModel'].setValue(this.vehicle.model);
      }
    )
  }
}

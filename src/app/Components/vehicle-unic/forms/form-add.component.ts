import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';
import { ActivatedRoute } from '@angular/router';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  formVehicleAdd:FormGroup

  constructor(private fb:FormBuilder, private route:ActivatedRoute, private serviceVehicleUnic:VehicleNouService, private clientService:ClientService) { }

  ngOnInit(): void {
    this.iniciarFormulari();
  }

  iniciarFormulari(){
    this.formVehicleAdd = this.fb.group({
      formNumSerie:new FormControl(''),
      formMarca:new FormControl(''),
      formModel:new FormControl('')
    });
  }

  guardar(){
    let id = this.route.snapshot.paramMap.get('id');
    var vehicleNou = new VehicleUnic();
    vehicleNou.numSerie = this.formVehicleAdd.controls['formNumSerie'].value;
    vehicleNou.marca = this.formVehicleAdd.controls['formMarca'].value;
    vehicleNou.model = this.formVehicleAdd.controls['formModel'].value;
    

    //Crequem el client i guardem el client al vehicle, finalment guardem l'objecte a la BD
    this.clientService.getClientById(id).subscribe(
      (clientTrobat) => {
        let client:Client=new Client();
        client=clientTrobat;
        console.log(clientTrobat);
        vehicleNou.client=client;
        this.serviceVehicleUnic.saveVehicle(vehicleNou).subscribe(
          (resposta) => console.log(resposta)
        );
        console.log(vehicleNou);
      },
      (error)=>{
        console.error(error);
      }
    )

    console.log("2");
    
    console.log(vehicleNou);

    // this.serviceVehicleUnic.saveVehicle(vehicleNou).subscribe(
    //   (resposta) => console.log(resposta)
    // );


 
  }

}

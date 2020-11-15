import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';
import {Router} from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IncidenciaService } from 'src/app/Serveis/incidencia/incidencia.service';

@Component({
  selector: 'app-vehicle-unic',
  templateUrl: './vehicle-unic.component.html',
  styleUrls: ['./vehicle-unic.component.css']
})
export class VehicleUnicComponent implements OnInit {

  formVehicleAdd:FormGroup;
  vehicle:VehicleUnic=new VehicleUnic();

  constructor(private fb:FormBuilder, 
    private route:ActivatedRoute,
    private serviceVehicleUnic:VehicleNouService, 
    private seriviceIncidencia:IncidenciaService,
    private clientService:ClientService,
    private router:Router,
    private messageService:MessageService,
    private confirmationService: ConfirmationService,) { }

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

        console.log(this.vehicle);
      }
    )
  }

  update(){
    this.vehicle.numSerie=this.formVehicleAdd.controls['formNumSerie'].value;
    this.vehicle.marca=this.formVehicleAdd.controls['formMarca'].value;
    this.vehicle.model=this.formVehicleAdd.controls['formModel'].value;

    this.serviceVehicleUnic.saveVehicle(this.vehicle).subscribe(
      (vehicleGuardat) => {
        console.log("Vehicle actualtizat correctament");
      }
    )
  }

  eliminar(id){
    this.confirmationService.confirm({
      message: 'Estas segur que vols eliminar aquesta incidència?',
      header: 'Eliminar Incidència',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.seriviceIncidencia.delete(id).subscribe(
          (msg) => {
            this.messageService.add({severity:'warn', summary: 'warn', detail: 'Incidència eliminada correctament'});
            //Filtrar la llista d'incidències i eliminar la que hem borrat.
          }
        )
      },
      reject: () => {

      }
    });
  }

}

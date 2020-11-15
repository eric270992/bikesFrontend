import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  formVehicleAdd:FormGroup

  constructor(private fb:FormBuilder, 
    private route:ActivatedRoute, 
    private serviceVehicleUnic:VehicleNouService, 
    private clientService:ClientService,
    private router:Router,
    private messageService:MessageService,
    //Injectem una referència al DynamiDialog que estarà per poder-lo gestionar.
    //Aquest dialog s'obre desde detail.component.ts de client i mostrarà el modal per afegir un vehicle al client
    public dynamicDialog: DynamicDialogRef,
    /*
      Variable que ens permet accedir als valors que passem desde el component
      que crea el modal. En aquest cas detail.component.ts que passa com a data: {idClient:id} per tal
      de poder carregar les dades del client selccionat.
    */
    public dynamicDialogData: DynamicDialogConfig) { }

  ngOnInit(): void {
    console.log("Init FormAddVehicle");
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
    //Recuperem el ID del client que passem com a data al obrir el modal p-dialog
    let id = this.dynamicDialogData.data.idClient;
    console.log(id);
    var vehicleNou = new VehicleUnic();
    vehicleNou.numSerie = this.formVehicleAdd.controls['formNumSerie'].value;
    vehicleNou.marca = this.formVehicleAdd.controls['formMarca'].value;
    vehicleNou.model = this.formVehicleAdd.controls['formModel'].value;
    

    //Crequem el client i guardem el client al vehicle, finalment guardem l'objecte a la BD
    this.clientService.getClientById(id).subscribe(
       (clientTrobat) => {
        let client:Client=new Client();
        client=clientTrobat;
        vehicleNou.client=client;
        //Guardem el vehicle amb el client
         this.serviceVehicleUnic.saveVehicle(vehicleNou).subscribe(
          (resposta) => {
            //Mostrem missatge al nostre <p-toast></p-toast> de la vista
            this.messageService.add({severity:'success', summary: 'success', detail: 'Vehicle afegit correctament'});
            //Eseprem 1 s a tornar enrere
            setTimeout(()=>{
              //Tanquem el p-dialog on està sent mostrat, cridat desde detail.componen.ts de client
              this.dynamicDialog.close();
            },1000)
            
          }
        );
      },
      (error)=>{
        console.error(error);
      }
    )

    // this.serviceVehicleUnic.saveVehicle(vehicleNou).subscribe(
    //   (resposta) => console.log(resposta)
    // );


 
  }

}

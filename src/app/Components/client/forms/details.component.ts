import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Classes/client';
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from 'src/app/Serveis/client/client.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { DialogService } from 'primeng/dynamicdialog';
import { FormAddComponent } from '../../vehicle-unic/forms/form-add.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  client:Client=new Client();
  public formClientDetail:FormGroup;
  id:string="";

  constructor(
    public _route:ActivatedRoute, 
    public _serviceClient:ClientService,
    public _serviceVehicle:VehicleNouService,
    public fb:FormBuilder,
    public messageService:MessageService,
    public confirmationService: ConfirmationService,
    /* DIALOG PER MOSTRAR COMPONENT PER AFEGIR VEHICLE*/
    public dialogService: DialogService,
    public router:Router) { }

  ngOnInit(): void {
    if(this._route.snapshot.paramMap.get('id')){
      this.id=this._route.snapshot.paramMap.get('id');
      this.getClientById(this.id);
    }
    
    this.formClientDetail = this.fb.group({
      clientName: new FormControl('', [Validators.required]),
      clientSurname: new FormControl(''),
      clientTelefon: new FormControl(''),
      clientEmail: new FormControl('')
    })
  }

  getClientById(id){
    //this.id=this._route.snapshot.paramMap.get('id');
    if(id){
      this._serviceClient.getClientById(id).subscribe(
        (clientTornat) => {
          this.client=clientTornat;

          this.formClientDetail.controls['clientName'].setValue(this.client.name);
          this.formClientDetail.controls['clientSurname'].setValue(this.client.surname);
          this.formClientDetail.controls['clientTelefon'].setValue(this.client.telefon);
          this.formClientDetail.controls['clientEmail'].setValue(this.client.email);

          console.log(this.client);
        }
      )


    }
    
  }

  update(){
    this.client.name=this.formClientDetail.controls['clientName'].value;
    this.client.surname=this.formClientDetail.controls['clientSurname'].value;
    this.client.telefon=this.formClientDetail.controls['clientTelefon'].value;
    this.client.email=this.formClientDetail.controls['clientEmail'].value;

    if(this.formClientDetail.valid){
      this._serviceClient.saveClient(this.client).subscribe(

        (clientGuardat) => {
          //Mostrem missatge al nostre <p-toast></p-toast> de la vista
          this.messageService.add({severity:'info', summary: 'Info', detail: 'Client actualitzat correctament'});
          //Eseprem 1 s a tornar enrere
          setTimeout(()=>{
            //Tornem a la vista clients
            this.router.navigate(['/']);
          },1000)
          console.log("Client guardat satisfactoriament");
        }
      ); //Fi subscribe
    }

  }

  eliminar(numSerie){
    this.confirmationService.confirm({
      message: 'Estas segur que vols eliminar aquest client?',
      header: 'Eliminar Client',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._serviceVehicle.eliminarVehicle(numSerie).subscribe(
          (resposta) => {
            //Falta filtrar la llista de vehicles i treure de forma visual el que hem eliminat
            console.log(resposta);
            this.client.llistaVehicles = this.client.llistaVehicles.filter((vehicle)=>{
              return vehicle.numSerie != numSerie;
            });
            //Mostrem missatge al nostre <p-toast></p-toast> de la vista
            this.messageService.add({severity:'warn', summary: 'Eliminat', detail: 'Vehicle eliminat correctament'});
          }
        );
      },
      reject: () => {

      }
    });
  }

  /* MOSTRAR DIALOG PER AFEGIR VEHICLES */
    mostrarAfegir(){
      //Cridem al component que mostra el formulari per afegir vehicles
    const ref = this.dialogService.open(FormAddComponent, {
      //Dades que passem al component que obre el dialog
      data:{
        //Passem el id del client actual per tal de guardaer el vehicle dins seu.
        idClient:this.id
      },
      header: 'Afegeix un vehicle',
      width: '70%'
    });

    //Subscribe onclose evenet of dialogBox, remember this is closed in add-client.component.ts on guardar()
    ref.onClose.subscribe(
      (closeReturn) => {
        console.log("Modal tancat");
        this.getClientById(this.id);
      }
    ); //!--tancquem el subscribe
  }

}



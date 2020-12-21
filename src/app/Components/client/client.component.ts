import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';
import {ConfirmationService} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddClientComponent } from './forms/add-client.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  llistaClients:Client[]=[];
  //Aquest llista de clients serà inmutable, la farem servir per recarregar la llista de filtrat.
  llistaClientBase:Client[]=[];

  constructor(public _serviceClient:ClientService,
    public confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router) { }

  ngOnInit(): void {


    this.getClients();
    /*this.llistaClients = [
      {id:1,name:"Eric",surname:"Clota"},
      {id:2,name:"Pol",surname:"Clota"},
      {id:3,name:"Veronica",surname:"Iscla"},
      {id:4,name:"Veronica",surname:"Tengo"}
    ]*/
  }

  getClients(){
    this._serviceClient.getAllClient().subscribe(
      (resultado) => {
        this.llistaClients = resultado;
        this.llistaClientBase=resultado;
      }
    )
  }

  eliminar(id){
    this.confirmationService.confirm({
      message: 'Estas segur que vols eliminar aquest client?',
      header: 'Eliminar Client',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._serviceClient.deleteClient(id).subscribe(
          (msg) => {
            console.log(msg);
            this.llistaClients = this.llistaClients.filter((client)=>{
              return client.id != id;
            });
            
          }
        )
        console.log("eliminat");
      },
      reject: () => {

      }
    });
  }

  mostrarAfegir(){
    const ref = this.dialogService.open(AddClientComponent, {
      header: 'Afegeix un client',
      width: '70%'
    });

    //Subscribe onclose evenet of dialogBox, remember this is closed in add-client.component.ts on guardar()
    ref.onClose.subscribe(
      (closeReturn) => {
        console.log("Modal tancat");
        this.getClients();
      }
    )
  }

  filtrarVehicles(marca, model){
    //Omplirem la llista amb els clients que algun dels seus vehicles coincideixi marca o model
    let llistaFiltrada = [];
    //Assignem una llista per la qual flitrarem el valor que tenim de la llsita de client inmutable, per no anar fent petcions HTTP al servei
    let llistaPerFiltrar = this.llistaClientBase;
    //Per cada client de la llista de client iterem
    llistaPerFiltrar.forEach(client =>{
      //Comprovem que la llista de vehicles del client != null
      if(client.llistaVehicles!=null){
        //Per cada vehicle del client iterem
        client.llistaVehicles.forEach(vehicle => {
          //Si la marca o el model inclouen el text que ens passen i la marca i model són plenes és a dir no estan buides
          if((vehicle.marca.includes(marca) || vehicle.model.includes(model)) && (marca!="" && model!="")){
            //Mirem si el client ja existeix dins la llistaFiltrada, si no hi és l'afegim a la llista
            if(!llistaFiltrada.includes(client)){
              llistaFiltrada.push(client);
            }
  
          }
        });
      }
    });

    //Si tenim elements a la llistaFiltrada subsitutim la llista de clients de la taula per la filtrada
    if(llistaFiltrada.length>0){
      this.llistaClients = llistaFiltrada;
    }
    //Altrament tornem a carregar la llistaClients amb la llista de clients base que tenim inmutable
    else{
      this.llistaClients = this.llistaClientBase;
    }
  }

}

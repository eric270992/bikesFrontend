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
      (resultado) => this.llistaClients = resultado
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

}

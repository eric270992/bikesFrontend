import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  llistaClients:Client[]=[];

  constructor(private _serviceClient:ClientService) { }

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

}

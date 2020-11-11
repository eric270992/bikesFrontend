import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Classes/client';
import { ActivatedRoute } from "@angular/router";
import { ClientService } from 'src/app/Serveis/client/client.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    private _route:ActivatedRoute, 
    private _serviceClient:ClientService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getClientById();
    this.formClientDetail = this.fb.group({
      clientName: new FormControl(''),
      clientSurname: new FormControl(''),
      clientTelefon: new FormControl(''),
      clientEmail: new FormControl('')
    })
  }

  getClientById(){
    this.id=this._route.snapshot.paramMap.get('id');
    if(this.id){
      this._serviceClient.getClientById(this.id).subscribe(
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

    this._serviceClient.saveClient(this.client).subscribe(
      (clientGuardat) => console.log("Client guardat satisfactoriament")
    )
  }

}

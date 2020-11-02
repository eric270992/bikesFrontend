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

  constructor(
    private _route:ActivatedRoute, 
    private _serviceClient:ClientService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getClientById();
    this.formClientDetail = this.fb.group({
      clientName: new FormControl(''),
      clientSurname: new FormControl(''),
    })
    this.getClientById();
  }

  getClientById(){
    if(this._route.snapshot.paramMap.get('id')){
      var id = this._route.snapshot.paramMap.get('id');
      this._serviceClient.getClientById(id).subscribe(
        (clientTornat) => {
          this.client=clientTornat;

          this.formClientDetail.controls['clientName'].setValue(this.client.name);
          this.formClientDetail.controls['clientSurname'].setValue(this.client.surname);

          console.log(this.client);
        }
      )


    }
    
  }

}

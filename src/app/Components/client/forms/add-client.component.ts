import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  formClientAdd:FormGroup;
  constructor(private fb:FormBuilder, private clientService:ClientService) { }

  ngOnInit(): void {
    this.formClientAdd = this.fb.group({
      clientName: new FormControl(''),
      clientSurname: new FormControl('')
    })
  }

  guardar(){
    let client = new Client();
    client.name=this.formClientAdd.controls['clientName'].value;
    client.surname=this.formClientAdd.controls['clientSurname'].value;

    this.clientService.saveClient(client).subscribe(
      (clientGuardat) => console.log(clientGuardat)
    )
  }

}

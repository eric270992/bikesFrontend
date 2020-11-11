import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {

  formClientAdd:FormGroup;
  constructor(private fb:FormBuilder, private clientService:ClientService,private messageService: MessageService, private router:Router) { }

  ngOnInit(): void {
    this.formClientAdd = this.fb.group({
      clientName: new FormControl(''),
      clientSurname: new FormControl(''),
      clientTelefon: new FormControl(''),
      clientEmail: new FormControl('')
    })
  }

  guardar(){
    let client = new Client();
    client.name=this.formClientAdd.controls['clientName'].value;
    client.surname=this.formClientAdd.controls['clientSurname'].value;
    client.telefon = this.formClientAdd.controls['clientTelefon'].value;
    client.email = this.formClientAdd.controls['clientEmail'].value;

    console.log(client);

    this.clientService.saveClient(client).subscribe(
      (clientGuardat) => {
        //Mostrem missatge al nostre <p-toast></p-toast> de la vista
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Client guardat correctament'});
        //Eseprem 1 s a tornar enrere
        setTimeout(()=>{
          //Tornem a la vista clients
          this.router.navigate(['/']);
        },1000)

      },
      (error)=>{
        this.messageService.add({severity:'warning', summary: 'Error', detail: 'Error guardant el client'});
      }
    )
  }

}

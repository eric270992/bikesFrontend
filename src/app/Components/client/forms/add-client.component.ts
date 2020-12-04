import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/Serveis/client/client.service';
import { Client } from 'src/app/Classes/client';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {

  formClientAdd:FormGroup;
  constructor(public fb:FormBuilder, 
    public clientService:ClientService,
    public messageService: MessageService, 
    public router:Router,
    //Injectem una referència al DynamiDialog que estarà per poder-lo gestionar.
    //Aquest dialog s'obre desde client.component.ts per mostrar un modal que ens permeti guardar clients
    public dynamicDialog: DynamicDialogRef) { }

  ngOnInit(): void {
    this.formClientAdd = this.fb.group({
      clientName: new FormControl('',[Validators.required]),
      clientSurname: new FormControl(''),
      clientTelefon: new FormControl(''),
      clientEmail: new FormControl('')
    })
  }

  guardar(){

    if(this.formClientAdd.valid){
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
            this.dynamicDialog.close();
            //Tornem a la vista clients
            this.router.navigate(['/']);
          },1000)

        },
        (error)=>{
          this.messageService.add({severity:'warning', summary: 'Error', detail: 'Error guardant el client'});
        }
      );
    }
  }

}

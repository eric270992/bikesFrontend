import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Incidencia } from 'src/app/Classes/incidencia';
import { Client } from 'src/app/Classes/client';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { DatePipe } from '@angular/common';
import { IncidenciaService } from 'src/app/Serveis/incidencia/incidencia.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UtilitatsService } from 'src/app/Serveis/utilitats/utilitats.service';

@Component({
  selector: 'app-full-incidencia',
  templateUrl: './full-incidencia.component.html',
  styleUrls: ['./full-incidencia.component.css']
})
export class FullIncidenciaComponent implements OnInit {

  dataEntrada:Date;
  dataSortida:Date;
  formIncidencia:FormGroup;
  incidencia:Incidencia = new Incidencia();
  datepipe:DatePipe;
  updateInc:Boolean = false;
  
  client:Client = new Client();
  vehicleUnic:VehicleUnic = new VehicleUnic();
  numSeriePassat:string = "";

  constructor( public fb:FormBuilder, 
    public route:ActivatedRoute, 
    public serviceVehicleUnic:VehicleNouService, 
    public seriviceIncidencia:IncidenciaService,
    public router:Router,
    public messageService:MessageService,
    public confirmationService: ConfirmationService,
    public utilitats:UtilitatsService) { 
    
  }


  ngOnInit(): void {
    this.numSeriePassat = this.route.snapshot.paramMap.get('numSerie');
    this.recuperarVehicle(this.numSeriePassat);
    this.formIncidencia = this.fb.group({
      nameClient: new FormControl('',[Validators.required]),
      numSerie: new FormControl('',[Validators.required]),
      dataEntrada:new FormControl(''),
      dataSortida:new FormControl(''),
      observacions: new FormControl(''),
      descFeina: new FormControl(''),
      tempsTotal: new FormControl(''),
      importTemps: new FormControl(''),
      preuFinal: new FormControl('')
    });

    //Si ens han passat un id d'incidencia carreguem l'incidencia
    if(this.route.snapshot.paramMap.get('idIncidencia')){
      let idIncidencia = this.route.snapshot.paramMap.get('idIncidencia');
      this.updateInc = true;
      this.carregarIncidecia(idIncidencia);
    }
  }

  recuperarVehicle(numSeriePassat){
    this.serviceVehicleUnic.findVehicleNumSerie(numSeriePassat).subscribe(
      (vehicleTornat) => {
        this.vehicleUnic=vehicleTornat;
        this.client = vehicleTornat.client;
        this.formIncidencia.controls['nameClient'].setValue(this.vehicleUnic.client.name);
        this.formIncidencia.controls['numSerie'].setValue(this.vehicleUnic.numSerie);
      }
    )
  }

  carregarIncidecia(idIncidencia){
    this.seriviceIncidencia.getById(idIncidencia).subscribe(
      (incidenciaRecuperada) => {
        this.incidencia = incidenciaRecuperada;
        this.formIncidencia.controls['dataEntrada'].setValue(new Date(incidenciaRecuperada.dataEntrada));
        this.formIncidencia.controls['dataSortida'].setValue(new Date(incidenciaRecuperada.dataSortida));
        this.formIncidencia.controls['observacions'].setValue(incidenciaRecuperada.observacions);
        this.formIncidencia.controls['descFeina'].setValue(incidenciaRecuperada.descFeina);
        this.formIncidencia.controls['tempsTotal'].setValue(incidenciaRecuperada.tempsTotal);
        this.formIncidencia.controls['preuFinal'].setValue(incidenciaRecuperada.preuFinal);
      }
    )
  }

  guardar(){
    //ASsignem els valors
    this.assignarValorsIncidencia();
    //Comprovem que tot el formulari es vàlid i guardem a la BD
    if(this.formIncidencia.valid){
      this.seriviceIncidencia.save(this.incidencia).subscribe(
        (incidenciaGuardada) => {
          //Mostrem missatge al nostre <p-toast></p-toast> de la vista
          this.messageService.add({severity:'success', summary: 'success', detail: 'Incidència afegida correctament'});
          //Eseprem 1 s a tornar enrere
          setTimeout(()=>{
            //Tornem a la vista de detall del vehicle
            this.router.navigate(['/vehicles/detail/'+this.incidencia.vehicle.numSerie]);
          },1000)
        }
      );//fi subscribe
    }


  }

  assignarValorsIncidencia(){
    this.incidencia.client = this.vehicleUnic.client;
    this.incidencia.vehicle = this.vehicleUnic;
    this.incidencia.dataEntrada = this.formIncidencia.controls['dataEntrada'].value;
    this.incidencia.dataSortida = this.formIncidencia.controls['dataSortida'].value;
    this.incidencia.observacions = this.formIncidencia.controls['observacions'].value;
    this.incidencia.descFeina = this.formIncidencia.controls['descFeina'].value;
    this.incidencia.tempsTotal = this.formIncidencia.controls['tempsTotal'].value;
    this.incidencia.preuFinal = this.formIncidencia.controls['preuFinal'].value;
  }

  calcTotal(){
    this.formIncidencia.controls['importTemps'].setValue(this.formIncidencia.controls['tempsTotal'].value*38);
  }


  imprimirPDF(){
    //Assignem els valors de tot al formulari a la incidència però no la guardem.
    this.assignarValorsIncidencia();
    this.utilitats.imprimirIncidenciaPDF(this.incidencia);
  }

  

}

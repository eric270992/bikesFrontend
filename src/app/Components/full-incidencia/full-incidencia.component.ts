import { Component, OnInit } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Incidencia } from 'src/app/Classes/incidencia';
import { Client } from 'src/app/Classes/client';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleNouService } from 'src/app/Serveis/vehicleUnic/vehicle-nou.service';
import { DatePipe } from '@angular/common';
import { IncidenciaService } from 'src/app/Serveis/incidencia/incidencia.service';
import {Location} from '@angular/common';

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

  constructor( private fb:FormBuilder, 
    private route:ActivatedRoute, 
    private serviceVehicleUnic:VehicleNouService, 
    private seriviceIncidencia:IncidenciaService,
    private location:Location) { 
    
  }


  ngOnInit(): void {
    this.numSeriePassat = this.route.snapshot.paramMap.get('numSerie');
    this.recuperarVehicle(this.numSeriePassat);
    this.formIncidencia = this.fb.group({
      nameClient: new FormControl(''),
      numSerie: new FormControl(''),
      dataEntrada:new FormControl(''),
      dataSortida:new FormControl(''),
      observacions: new FormControl(''),
      tempsTotal: new FormControl(''),
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
        this.vehicleUnic=vehicleTornat;;
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
        this.formIncidencia.controls['tempsTotal'].setValue(incidenciaRecuperada.tempsTotal);
        this.formIncidencia.controls['preuFinal'].setValue(incidenciaRecuperada.preuFinal);
      }
    )
  }

  guardar(){
    this.incidencia.client = this.vehicleUnic.client;
    this.incidencia.vehicle = this.vehicleUnic;
    this.incidencia.dataEntrada = this.formIncidencia.controls['dataEntrada'].value;
    this.incidencia.dataSortida = this.formIncidencia.controls['dataSortida'].value;
    this.incidencia.observacions = this.formIncidencia.controls['observacions'].value;
    this.incidencia.tempsTotal = this.formIncidencia.controls['tempsTotal'].value;
    this.incidencia.preuFinal = this.formIncidencia.controls['preuFinal'].value;

    console.log(this.incidencia);


    this.seriviceIncidencia.save(this.incidencia).subscribe(
      (incidenciaGuardada) => {
        return this.location.back();
      }
    )

  }

}

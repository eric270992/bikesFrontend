import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  formVehicleAdd:FormGroup

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulari();
  }

  iniciarFormulari(){
    this.formVehicleAdd = this.fb.group({
      formNumSerie:new FormControl(''),
      formMarca:new FormControl(''),
      formModel:new FormControl('')
    });
  }

  guardar(){
    console.log("Save Vehicle to Client");
    var vehicleNou = new VehicleUnic();
    vehicleNou.numSerie = this.formVehicleAdd.controls['formNumSerie'].value;
    vehicleNou.marca = this.formVehicleAdd.controls['formMarca'].value;
    vehicleNou.model = this.formVehicleAdd.controls['formModel'].value;

    console.log(vehicleNou);
  }

}

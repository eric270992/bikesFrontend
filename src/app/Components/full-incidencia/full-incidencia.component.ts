import { Component, OnInit } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-full-incidencia',
  templateUrl: './full-incidencia.component.html',
  styleUrls: ['./full-incidencia.component.css']
})
export class FullIncidenciaComponent implements OnInit {

  dataEntrada:Date;
  dataSortida:Date;
  formIncidencia:FormGroup;
  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {

    this.formIncidencia = this.fb.group({
      dataEntrada:new FormControl(''),
      dataSortida:new FormControl('')
    })
  }

}

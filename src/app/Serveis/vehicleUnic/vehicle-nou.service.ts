import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleUnic } from 'src/app/Classes/vehicle-unic';

@Injectable({
  providedIn: 'root'
})
export class VehicleNouService {

  private url:string = "http://localhost:8080/api/vehiclesUnics";

  constructor(private http:HttpClient) { }

  findVehicleNumSerie(numSerie:string){
    return this.http.get<VehicleUnic>(this.url+"/"+numSerie);
  }

  saveVehicle(vehicle:VehicleUnic){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<VehicleUnic>(this.url,vehicle,{headers:headers});
  }
}

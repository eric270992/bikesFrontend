import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Incidencia } from 'src/app/Classes/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  url:string = "http://localhost:8080/incidencies";

  constructor(private http:HttpClient) { }

  public getById(id){
    return this.http.get<Incidencia>(this.url+'/'+id);
  }

  public save(incidencia:Incidencia){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<Incidencia>(this.url,incidencia,{headers:headers});
  }
}

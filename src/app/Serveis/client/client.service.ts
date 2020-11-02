import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url:string = "http://localhost:8080/api/clients";

  constructor(private http:HttpClient) { }

  public getAllClient():Observable<Client[]>{
    return this.http.get<Client[]>(this.url);
  }

  public getClientById(id){
    return this.http.get<Client>(this.url+"/"+id);
  }
}

import { Client } from './client';
import { VehicleUnic } from './vehicle-unic';

export class Incidencia {
    id:number;
    client:Client;
    vehicle:VehicleUnic;
    dataEntrada:Date;
    dataSortida:Date;
    observacions:string;
    descFeina:string;
    tempsTotal:number;
    preuFinal:number;
}

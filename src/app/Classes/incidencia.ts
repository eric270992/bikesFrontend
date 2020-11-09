import { Client } from './client';
import { VehicleUnic } from './vehicle-unic';

export class Incidencia {
    id:number;
    client:Client;
    vehicleUnic:VehicleUnic;
    dataEntrada:Date;
    dataSortida:Date;
    observacions:string;
    tempsTotal:number;
    preuFinal:number;
}

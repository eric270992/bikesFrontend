import { Client } from './client';
import { Incidencia } from './incidencia';

export class VehicleUnic {
    numSerie:string;
    marca:string;
    model:string;
    client:Client;
    llistaIncidencies:Incidencia[];
}

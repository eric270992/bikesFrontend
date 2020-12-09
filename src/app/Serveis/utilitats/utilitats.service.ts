import { Injectable } from '@angular/core';
//PDF
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { Incidencia } from 'src/app/Classes/incidencia';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;  

@Injectable({
  providedIn: 'root'
})
export class UtilitatsService {

  constructor(private datePipe: DatePipe) { }

  imprimirIncidenciaPDF(incidencia:Incidencia){
    
    let docDefinition = {  
      content:
      [
        {
          alignment:'center',
          text:'BIKES RIPOLL - FULL DE FEINA \n\n',
          style:'header'
        },
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text: 'Nom del client \n', style:'underline'},
                {text: incidencia.client.name+' '+incidencia.client.surname+'\n\n', style:'bigger'}
              ]
            },
            {
              text:[
                {text:'Número serie vehicle \n', style:'underline'},
                {text:incidencia.vehicle.numSerie+'\n\n', style:'bigger'}
              ]
            }
          ]
        }, //Close first column group
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text: 'Telèfon client \n', style:'underline'},
                {text: incidencia.client.telefon+'\n\n', style:'bigger'}
              ]
            },
            {
              text:[
                {text:''}
              ]
            }
          ]
        }, //Close second column group
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text:'Data Entrada \n', style:'underline'},
                {text:this.datePipe.transform(incidencia.dataEntrada,'dd/MM/yyyy')+'\n\n', style:'bigger'}
              ]
            },
            {
              text:[
                {text:'Data Sortida \n', style:'underline'},
                {text:this.datePipe.transform(incidencia.dataSortida,'dd/MM/yyyy')+'\n\n', style:'bigger'}
              ]
            }
          ]
        }, //Close third column group
        {
          alignment:'center',
          columns: [
            {
              text: [
                {text:"Observacions\n\n",style:'underline'},
                {text: incidencia.observacions+'\n\n\n\n', style:'bigger'}
              ]
            }
          ]
        },
        {
          alignment:'center',
          columns: [
            {
              text: [
                {text:"Descripció Feina\n\n",style:'underline'},
                {text: incidencia.descFeina+'\n\n\n\n', style:'bigger'}
              ]
            }
          ]
        },
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text:'Total hores: ',style:'bigger'},
                {text: incidencia.tempsTotal+'h \n\n', style:'bold'}
              ]
            },
            {
              text:[
                {text:'Import temps: ',style:'bigger'},
                {text: incidencia.tempsTotal*38+'€ \n\n', style:'bold'}
              ]
            },
            {
              text:[
                {text:'Preu Final: ',style:'bigger'},
                {text: incidencia.preuFinal+'€ \n\n\n\n',style:'bold'}
              ]
            }
          ]
        }, //Close fourth column group
        /* Si volen un segon full dins el mateix doc, podem descomentar-ho
        {
          alignment:'center',
          text:'BIKES RIPOLL - FULL DE FEINA \n\n',
          style:'header'
        },
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text: 'Nom del client \n', style:'underline'},
                {text: incidencia.client.name+' '+incidencia.client.surname+'\n\n', style:'bigger'}
              ]
            },
            {
              text:[
                {text:'Número serie vehicle \n', style:'underline'},
                {text:incidencia.vehicle.numSerie+'\n\n', style:'bigger'}
              ]
            }
          ]
        }, //Close first column group
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text:'Data Entrada \n', style:'underline'},
                {text:incidencia.dataEntrada+'\n\n', style:'bigger'}
              ]
            },
            {
              text:[
                {text:'Data Sortida \n', style:'underline'},
                {text: incidencia.dataSortida+'\n\n', style:'bigger'}
              ]
            }
          ]
        }, //Close second column group
        {
          alignment:'center',
          columns: [
            {
              text: [
                {text:"Observacions\n\n",style:'underline'},
                {text: incidencia.observacions+'\n\n\n\n', style:'bigger'}
              ]
            }
          ]
        },
        {
          alignment:'center',
          columns: [
            {
              text:[
                {text:'Total hores: ',style:'bigger'},
                {text: incidencia.tempsTotal+'h \n\n', style:'bold'}
              ]
            },
            {
              text:[
                {text:'Preu Final: ',style:'bigger'},
                {text: incidencia.preuFinal+'€ \n\n',style:'bold'}
              ]
            }
          ]
        }*/ //Close third column group
      ],//Close content
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: false
        },
        underline:{
          decoration:'underline',
          bold:true
        },
        bold:{
          fontSize:15,
          bold:true
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };  //Close document definition
   
    pdfMake.createPdf(docDefinition).open(); 
  }
}

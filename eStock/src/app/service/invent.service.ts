import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invent } from '../model/invent';
import { Linvent } from '../model/linvent';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class InventService {
  private baseUrl = '/api/invents';
  public formData:  FormGroup; 
  list :  any=[];
  invent  : any={};
  constructor(private http:HttpClient,private toastr: ToastrService) { }
  choixmenu : number = 1;
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  saveOrUpdate(info: Object): Observable<Object> {
  
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getDocument(id :number) {
    {
      this.getData(id).subscribe(
       response =>{
         this.invent = response;
         }
      );  
      sessionStorage.setItem('bon', JSON.stringify(this.invent));
    return {
      content: [
        {
          columns: [
            [{
              text: 'La Poste Tunisienne' ,
              style: 'name'
            },
            {
              text: 'Centre de Comptabilité Matiére'
            },
            {
              text: 'Email : ' ,
            },
            {
              text: 'Tel  : ' ,
              color: 'blue',
            },
            ],
          ]
        },
        {
          text: 'Bon 1016',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
       
        {
          columns: [
            [{
              text: 'Numero : '+ this.invent.numero + ' Date Mvt : ' +this.invent.date_mvt,
              style: 'ligne',
              margin: [0, 100, 50, 20]
            },
            {
              text: 'Client :  '+ this.invent.lib_client ,
              style: 'ligne',
              margin: [0, 100, 100, 20]
            },
           
            
            ],
          ]
        },
        
        
        
        {
          text: 'Détails Produits ',
          style: 'header'
        },
       this.getEducationObject(this.invent.linvents),
       {

       },
        {
          text: 'Total : ' + this.invent.total ,
          style: 'total',
          alignment : 'right'
        },
        
        {
          text: 'Signature',
          style: 'sign',
          alignment : 'right'

        },
       
      ],
     
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          total: {
            fontSize: 12,
            bold: true,
            italics: true
          },
          ligne: {
            fontSize: 12,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
            fontSize: 15
          }
        }
    };
  }
   }

   getEducationObject(items: Linvent[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*','*'],
        body: [
          [{
            text: 'Code',
            style: 'tableHeader'
          },
          {
            text: 'Désignation',
            style: 'tableHeader'
          },
          {
            text: 'Qté',
            style: 'tableHeader'
          },
          {
            text: 'Pu',
            style: 'tableHeader'
          },
          {
            text: 'Total',
            style: 'tableHeader'
          },
          ],
          ...items.map(ed => {
          //  return [ed.code,ed.libart, ed.pu, ed.qte, ed.total];
          })
        ]
      }
    };
  }
}

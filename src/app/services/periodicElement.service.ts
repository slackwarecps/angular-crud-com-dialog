import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../models/PeriodicElements';

@Injectable()
export class PeriodicElementService {
  elementApiURL = 'https://62eaf501705264f263d17c49.mockapi.io/api/v1/periodic-element';

  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[]>{
    console.log('LOG ::=> Get Elements');
    return this.http.get<PeriodicElement[]>(this.elementApiURL);

  }

  createElement(element: PeriodicElement): Observable<PeriodicElement>{
    return this.http.post<PeriodicElement>(this.elementApiURL,element);

  }

  editElement(element: PeriodicElement): Observable<PeriodicElement>{
    console.log(element);
    return this.http.put<PeriodicElement>(`${this.elementApiURL}/${element.id}`,element);

  }


  deleteElement(id: number): Observable<any>{
    return this.http.delete<any>(`${this.elementApiURL}/${id}`);

  }



}

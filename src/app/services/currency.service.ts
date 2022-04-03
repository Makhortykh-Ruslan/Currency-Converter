import { Injectable } from '@angular/core';
import {Currency, CurrencyServices} from '../interface/interfaces';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService implements CurrencyServices{

  public currency$: Subject<Currency[]> = new Subject<Currency[]>();

  constructor(private http: HttpClient) { }

  getCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.api}`)
  }
  setCurrency(data: Currency[]): void{
    this.currency$.next(data);
  }
}

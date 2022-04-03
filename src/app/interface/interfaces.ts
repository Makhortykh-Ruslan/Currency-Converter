import {Observable} from 'rxjs';

export interface Notification {
  notificationChange(value: boolean): void;
}
export interface Currency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}
export interface CurrencyServices {
  getCurrency(): Observable<Currency[]>;
}

import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../interface/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currencyData: Currency[] | undefined;

  constructor(private currencyService: CurrencyService,) { }

  ngOnInit(): void {
    this.currencyService.currency$.subscribe(currency => this.currencyData = currency);
  }

}

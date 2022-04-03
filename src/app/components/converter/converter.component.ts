import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CurrencyService} from '../../services/currency.service';
import {NotificationService} from '../../services/notification.service';
import {Currency} from '../../interface/interfaces';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  public currencyData: Currency[] | undefined;
  getCurrencyValue: {[key: string]: any} = {
    USD: 0,
    EUR: 0,
    UAH: 1
  }
  form: FormGroup = new FormGroup({
    valueOne: new FormControl(''),
    selectOne: new FormControl('USD'),
    valueTwo: new FormControl(''),
    selectTwo: new FormControl('UAH')
  })
  private active = true;

  constructor(private currencyService: CurrencyService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(): void{
    this.notificationService.notificationChange(true);
    this.currencyService.getCurrency().subscribe(res => {
      this.currencyData = res.filter(elem => elem.ccy !== 'BTC');
      this.currencyService.setCurrency(res.filter(elem => elem.ccy !== 'BTC'));
      const UAH = {
        base_ccy: "UAH",
        buy: "1",
        ccy: "UAH",
        sale: "1",
      }
      this.currencyData.push(UAH)
      this.currencyData.map(elem => this.getCurrencyValue[elem.ccy] = elem.buy)
      this.notificationService.notificationChange(false);
    }, error => {
      this.notificationService.notificationChange(false);
    })

  }

  onSelectChange(event: boolean, name: string, value: any) {
    if(!event){
      if(name === 'selectOne'){
        this.active = true;
        this.onCount();
      }
      if(name === 'selectTwo'){
        this.active = false;
        this.onCountTwo();
      }
    }
  }

  onChange(event: Event, name: string, value: any) {
    this.active ? this.onCount() : this.onCountTwo();
  }

  onCount(): void{
    const currencyValueOneSelect = this.form.get('selectOne');
    // const currencyValueTwoSelect = this.form.get('selectTwo');
    const inputValueOne = this.form.get('valueOne');
    const inputValueTwo = this.form.get('valueTwo');
    let result: string;
    result = (inputValueOne?.value * this.getCurrencyValue[currencyValueOneSelect?.value]).toFixed(2)
    inputValueTwo?.setValue(result)
  }
  onCountTwo(): void{
    // const currencyValueOneSelect = this.form.get('selectOne');
    const currencyValueTwoSelect = this.form.get('selectTwo');
    const inputValueOne = this.form.get('valueOne');
    const inputValueTwo = this.form.get('valueTwo');
    let result: string;
    result = (inputValueOne?.value / this.getCurrencyValue[currencyValueTwoSelect?.value]).toFixed(2)
    inputValueTwo?.setValue(result)
  }

}

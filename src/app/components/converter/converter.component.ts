import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CurrencyService} from '../../services/currency.service';
import {NotificationService} from '../../services/notification.service';
import {Currency} from '../../interface/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {
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
  private $getCurrency: Subscription | undefined

  constructor(private currencyService: CurrencyService, private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    this.$getCurrency?.unsubscribe();
    }

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(): void{
    this.notificationService.notificationChange(true);
    this.$getCurrency = this.currencyService.getCurrency().subscribe(res => {
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

  onSelectChange(event: boolean, name: string) {
    if(!event){
      this.active = name === 'selectOne';
      if(this.form.get('selectOne')?.value === this.form.get('selectTwo')?.value){
        this.form.get('valueOne')?.setValue('');
        this.form.get('valueTwo')?.setValue('');
      }
      if(this.active){
        this.currencyResult(this.form.get('valueOne')?.value, 'valueOne');
      }
      if(!this.active){
        this.currencyResult(this.form.get('valueTwo')?.value, 'valueTwo');
      }
    }
  }

  onChange(event: any, name: string) {
    this.active = name === 'valueOne';
    this.currencyResult(event.target.value, name);
  }
  currencyResult(value: number, name: string): void{
    const currencyValueOneSelect = this.form.get('selectOne');
    const currencyValueTwoSelect = this.form.get('selectTwo');
    const inputValueOne = this.form.get('valueOne');
    const inputValueTwo = this.form.get('valueTwo');
    if(this.active && name === 'valueOne'){
      let result: string;
      result = (value * this.getCurrencyValue[currencyValueOneSelect?.value === 'UAH' ? currencyValueTwoSelect?.value : currencyValueOneSelect?.value]).toFixed(2)
      console.log(result)
      inputValueTwo?.setValue(result)
    }
    if(!this.active && name === 'valueTwo'){
      let result: string;
      if(currencyValueOneSelect?.value === 'UAH'){
        result = (value * this.getCurrencyValue[currencyValueTwoSelect?.value]).toFixed(2)
      }else {
        result = (value / this.getCurrencyValue[currencyValueOneSelect?.value]).toFixed(2)
      }
      console.log(result)
      inputValueOne?.setValue(result)
    }

  }


}

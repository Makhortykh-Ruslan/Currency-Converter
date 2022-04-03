import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification} from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements Notification{

  public $preloader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  notificationChange(value: boolean): void {
    this.$preloader.next(value);
  }
}

import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(public notificationService: NotificationService, private cdr: ChangeDetectorRef) {
  }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
  }
}

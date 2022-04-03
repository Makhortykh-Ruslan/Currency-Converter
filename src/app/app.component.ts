import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  public preloaderState: boolean | undefined;
  constructor(private notificationService: NotificationService, private cdr: ChangeDetectorRef) {
  }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.notificationService.$preloader.subscribe(state => this.preloaderState = state);
  }
}

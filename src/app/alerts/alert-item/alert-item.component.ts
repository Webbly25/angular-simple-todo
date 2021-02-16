import { Component, Input, OnInit } from '@angular/core';
import { Alert } from '../../../types/Alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: [ './alert-item.component.scss' ]
})
export class AlertItemComponent implements OnInit {

  pinned = false;
  @Input() alert: Alert = {} as Alert;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.pinned) this.onClose();
    }, 10000);
  }

  /**
   * Handle the close event emitted by the alert
   * Calls the alert service to delete the alert
   */
  onClose(): void {
    this.alertService.delete(this.alert.id);
  }

}

import { Injectable } from '@angular/core';
import { Alert } from '../../types/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert[] = [];

  /**
   * Add an alert
   * Creates a unique id for the alert then saves it
   * @param alert The alert to add
   */
  private add(alert: Alert): void {
    alert.id = this.genId();
    this.alerts.push(alert);
  }

  /**
   * Add a success alert
   * @param message The message to display in the message
   */
  addSuccess(message: string): void { this.add({ type: 'success', message } as Alert); }

  /**
   * Add an info alert
   * @param message The message to display in the message
   */
  addInfo(message: string): void { this.add({ type: 'info', message } as Alert); }

  /**
   * Add a warning alert
   * @param message The message to display in the message
   */
  addWarning(message: string): void { this.add({ type: 'warning', message } as Alert); }

  /**
   * Add a danger alert
   * @param message The message to display in the message
   */
  addDanger(message: string): void { this.add({ type: 'danger', message } as Alert); }

  /**
   * Add a primary alert
   * @param message The message to display in the message
   */
  addPrimary(message: string): void { this.add({ type: 'primary', message } as Alert); }

  /**
   * Add a secondary alert
   * @param message The message to display in the message
   */
  addSecondary(message: string): void { this.add({ type: 'secondary', message } as Alert); }

  /**
   * Add a light alert
   * @param message The message to display in the message
   */
  addLight(message: string): void { this.add({ type: 'light', message } as Alert); }

  /**
   * Add a dark alert
   * @param message The message to display in the message
   */
  addDark(message: string): void { this.add({ type: 'dark', message } as Alert); }

  /**
   * Remove an alert using its id
   * @param id The id of the alert to remove
   */
  delete(id: number): void {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
  }

  /**
   * Clear all alerts
   */
  clearAll(): void {
    this.alerts = [];
  }

  /**
   * Generate a new alert id
   * If there are no current alerts return 1
   * If there are alters, get the current max id and return 1 + that
   */
  genId(): number {
    if (this.alerts.length === 0) {
      return 1;
    }
    return Math.max(...this.alerts.map(alert => alert.id)) + 1;
  }

}

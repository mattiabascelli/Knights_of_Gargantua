import { signal } from '@angular/core';

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
};

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
};

export class UiNotifications {
  private data = signal<Notification[]>([]);

  get notifications() {
    return this.data.asReadonly();
  }

  add(type: NotificationType, message: string) {
    const id = Math.random();
    this.data.update(prev => [({ id, type, message }), ...prev]);
  }

  info(message: string) {
    this.add(NotificationType.Info, message);
  }

  success(message: string) {
    this.add(NotificationType.Success, message);
  }

  error(message: string) {
    this.add(NotificationType.Error, message);
  }

  clear() {
    this.data.set([]);
  }
}

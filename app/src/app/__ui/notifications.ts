import { signal } from "@angular/core";

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export type Notification = {
  type: NotificationType;
  message: string;
};

export function withNotifications() {
  const notifications = signal<Notification[]>([]);

  return {
    notifications: notifications.asReadonly(),
    // ...
  };
}
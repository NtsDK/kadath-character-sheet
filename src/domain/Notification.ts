export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type NotificationCommand = {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
  showInNotificationModal?: boolean;
};

export type KNotification = NotificationCommand & {
  id: string;
  date: Date;
};

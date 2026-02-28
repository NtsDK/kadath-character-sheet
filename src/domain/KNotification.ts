export type KNotificationType = 'success' | 'info' | 'warning' | 'error';

export type KNotification = {
  type: KNotificationType;
  message: string;
  description?: string;
  duration?: number;
  showInNotificationModal?: boolean;
};

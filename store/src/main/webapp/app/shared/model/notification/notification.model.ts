import { NotificationType } from '@/shared/model/enumerations/notification-type.model';
export interface INotification {
  id?: number;
  date?: Date;
  details?: string | null;
  sentDate?: Date;
  format?: NotificationType;
  userId?: number;
  productId?: number;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public date?: Date,
    public details?: string | null,
    public sentDate?: Date,
    public format?: NotificationType,
    public userId?: number,
    public productId?: number
  ) {}
}

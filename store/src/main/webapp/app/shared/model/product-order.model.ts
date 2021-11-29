import { IOrderItem } from '@/shared/model/order-item.model';
import { ICustomer } from '@/shared/model/customer.model';

import { OrderStatus } from '@/shared/model/enumerations/order-status.model';
export interface IProductOrder {
  id?: number;
  placedDate?: Date;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number | null;
  orderItems?: IOrderItem[] | null;
  customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: Date,
    public status?: OrderStatus,
    public code?: string,
    public invoiceId?: number | null,
    public orderItems?: IOrderItem[] | null,
    public customer?: ICustomer
  ) {}
}

import { IShipment } from '@/shared/model/invoice/shipment.model';

import { InvoiceStatus } from '@/shared/model/enumerations/invoice-status.model';
import { PaymentMethod } from '@/shared/model/enumerations/payment-method.model';
export interface IInvoice {
  id?: number;
  code?: string;
  date?: Date;
  details?: string | null;
  status?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: Date;
  paymentAmount?: number;
  shipments?: IShipment[] | null;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public code?: string,
    public date?: Date,
    public details?: string | null,
    public status?: InvoiceStatus,
    public paymentMethod?: PaymentMethod,
    public paymentDate?: Date,
    public paymentAmount?: number,
    public shipments?: IShipment[] | null
  ) {}
}

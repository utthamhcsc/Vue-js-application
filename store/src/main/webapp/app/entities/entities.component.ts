import { Component, Provide, Vue } from 'vue-property-decorator';

import OrderItemService from './order-item/order-item.service';
import CustomerService from './customer/customer.service';
import NotificationService from './notification/notification/notification.service';
import ProductCategoryService from './product-category/product-category.service';
import ProductService from './product/product.service';
import ProductOrderService from './product-order/product-order.service';
import InvoiceService from './invoice/invoice/invoice.service';
import ShipmentService from './invoice/shipment/shipment.service';

@Component
export default class Entities extends Vue {
  @Provide('orderItemService') private orderItemService = () => new OrderItemService();
  @Provide('customerService') private customerService = () => new CustomerService();
  @Provide('notificationService') private notificationService = () => new NotificationService();
  @Provide('productCategoryService') private productCategoryService = () => new ProductCategoryService();
  @Provide('productService') private productService = () => new ProductService();
  @Provide('productOrderService') private productOrderService = () => new ProductOrderService();
  @Provide('invoiceService') private invoiceService = () => new InvoiceService();
  @Provide('shipmentService') private shipmentService = () => new ShipmentService();
}

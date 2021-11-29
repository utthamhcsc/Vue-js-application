import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import OrderItemService from '@/entities/order-item/order-item.service';
import { IOrderItem } from '@/shared/model/order-item.model';

import CustomerService from '@/entities/customer/customer.service';
import { ICustomer } from '@/shared/model/customer.model';

import { IProductOrder, ProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';
import { OrderStatus } from '@/shared/model/enumerations/order-status.model';

const validations: any = {
  productOrder: {
    placedDate: {
      required,
    },
    status: {
      required,
    },
    code: {
      required,
    },
    invoiceId: {},
    customer: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductOrderUpdate extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  @Inject('alertService') private alertService: () => AlertService;

  public productOrder: IProductOrder = new ProductOrder();

  @Inject('orderItemService') private orderItemService: () => OrderItemService;

  public orderItems: IOrderItem[] = [];

  @Inject('customerService') private customerService: () => CustomerService;

  public customers: ICustomer[] = [];
  public orderStatusValues: string[] = Object.keys(OrderStatus);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.productOrder.id) {
      this.productOrderService()
        .update(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.productOrder.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.productOrderService()
        .create(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.productOrder.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.productOrder[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.productOrder[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.productOrder[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.productOrder[field] = null;
    }
  }

  public retrieveProductOrder(productOrderId): void {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        res.placedDate = new Date(res.placedDate);
        this.productOrder = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.orderItemService()
      .retrieve()
      .then(res => {
        this.orderItems = res.data;
      });
    this.customerService()
      .retrieve()
      .then(res => {
        this.customers = res.data;
      });
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { IInvoice } from '@/shared/model/invoice/invoice.model';
import InvoiceService from './invoice.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class InvoiceDetails extends Vue {
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  @Inject('alertService') private alertService: () => AlertService;

  public invoice: IInvoice = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.invoiceId) {
        vm.retrieveInvoice(to.params.invoiceId);
      }
    });
  }

  public retrieveInvoice(invoiceId) {
    this.invoiceService()
      .find(invoiceId)
      .then(res => {
        this.invoice = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { IShipment } from '@/shared/model/invoice/shipment.model';
import ShipmentService from './shipment.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ShipmentDetails extends Vue {
  @Inject('shipmentService') private shipmentService: () => ShipmentService;
  @Inject('alertService') private alertService: () => AlertService;

  public shipment: IShipment = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shipmentId) {
        vm.retrieveShipment(to.params.shipmentId);
      }
    });
  }

  public retrieveShipment(shipmentId) {
    this.shipmentService()
      .find(shipmentId)
      .then(res => {
        this.shipment = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

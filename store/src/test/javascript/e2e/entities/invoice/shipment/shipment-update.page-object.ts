import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../../page-objects/alert-page';

export default class ShipmentUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.invoiceShipment.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  trackingCodeInput: ElementFinder = element(by.css('input#shipment-trackingCode'));

  dateInput: ElementFinder = element(by.css('input#shipment-date'));

  detailsInput: ElementFinder = element(by.css('input#shipment-details'));

  invoiceSelect = element(by.css('select#shipment-invoice'));
}

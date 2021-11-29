import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../../page-objects/alert-page';

export default class InvoiceUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.invoiceInvoice.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  codeInput: ElementFinder = element(by.css('input#invoice-code'));

  dateInput: ElementFinder = element(by.css('input#invoice-date'));

  detailsInput: ElementFinder = element(by.css('input#invoice-details'));

  statusSelect = element(by.css('select#invoice-status'));

  paymentMethodSelect = element(by.css('select#invoice-paymentMethod'));

  paymentDateInput: ElementFinder = element(by.css('input#invoice-paymentDate'));

  paymentAmountInput: ElementFinder = element(by.css('input#invoice-paymentAmount'));
}

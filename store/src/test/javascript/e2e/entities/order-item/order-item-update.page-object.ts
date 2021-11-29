import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class OrderItemUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.orderItem.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  quantityInput: ElementFinder = element(by.css('input#order-item-quantity'));

  totalPriceInput: ElementFinder = element(by.css('input#order-item-totalPrice'));

  statusSelect = element(by.css('select#order-item-status'));
  productSelect = element(by.css('select#order-item-product'));

  orderSelect = element(by.css('select#order-item-order'));
}

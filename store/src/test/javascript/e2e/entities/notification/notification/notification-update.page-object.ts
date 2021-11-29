import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../../page-objects/alert-page';

export default class NotificationUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.notificationNotification.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  dateInput: ElementFinder = element(by.css('input#notification-date'));

  detailsInput: ElementFinder = element(by.css('input#notification-details'));

  sentDateInput: ElementFinder = element(by.css('input#notification-sentDate'));

  formatSelect = element(by.css('select#notification-format'));

  userIdInput: ElementFinder = element(by.css('input#notification-userId'));

  productIdInput: ElementFinder = element(by.css('input#notification-productId'));
}

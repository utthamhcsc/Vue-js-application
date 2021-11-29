import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CustomerUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.customer.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  firstNameInput: ElementFinder = element(by.css('input#customer-firstName'));

  lastNameInput: ElementFinder = element(by.css('input#customer-lastName'));

  genderSelect = element(by.css('select#customer-gender'));

  emailInput: ElementFinder = element(by.css('input#customer-email'));

  phoneInput: ElementFinder = element(by.css('input#customer-phone'));

  addressLine1Input: ElementFinder = element(by.css('input#customer-addressLine1'));

  addressLine2Input: ElementFinder = element(by.css('input#customer-addressLine2'));

  cityInput: ElementFinder = element(by.css('input#customer-city'));

  countryInput: ElementFinder = element(by.css('input#customer-country'));

  userSelect = element(by.css('select#customer-user'));
}

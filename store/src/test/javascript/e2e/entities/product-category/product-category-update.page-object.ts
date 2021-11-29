import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductCategoryUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.productCategory.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-category-name'));

  descriptionInput: ElementFinder = element(by.css('input#product-category-description'));
}

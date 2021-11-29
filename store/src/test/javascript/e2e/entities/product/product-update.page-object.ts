import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('storeApp.product.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-name'));

  descriptionInput: ElementFinder = element(by.css('input#product-description'));

  priceInput: ElementFinder = element(by.css('input#product-price'));

  psizeSelect = element(by.css('select#product-psize'));

  imageInput: ElementFinder = element(by.css('input#file_image'));

  productCategorySelect = element(by.css('select#product-productCategory'));
}

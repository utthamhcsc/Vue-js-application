/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import InvoiceComponentsPage, { InvoiceDeleteDialog } from './invoice.page-object';
import InvoiceUpdatePage from './invoice-update.page-object';
import InvoiceDetailsPage from './invoice-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../../util/utils';

const expect = chai.expect;

describe('Invoice e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: InvoiceUpdatePage;
  let detailsPage: InvoiceDetailsPage;
  let listPage: InvoiceComponentsPage;
  let deleteDialog: InvoiceDeleteDialog;
  let beforeRecordsCount = 0;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login(username, password);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Invoices', async () => {
    await navBarPage.getEntityPage('invoice');
    listPage = new InvoiceComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Invoice page', async () => {
      await listPage.createButton.click();
      updatePage = new InvoiceUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/storeApp.invoiceInvoice.home.createOrEditLabel/);
    });

    it('should create and save Invoices', async () => {
      await updatePage.codeInput.sendKeys('code');

      await updatePage.dateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      await updatePage.detailsInput.sendKeys('details');

      await selectLastOption(updatePage.statusSelect);

      await selectLastOption(updatePage.paymentMethodSelect);

      await updatePage.paymentDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      await updatePage.paymentAmountInput.sendKeys('5');

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new InvoiceDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/storeApp.invoiceInvoice.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Invoice page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new InvoiceDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Invoice page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.codeInput.clear();
        await updatePage.codeInput.sendKeys('modified');

        await updatePage.dateInput.clear();
        await updatePage.dateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');

        await updatePage.detailsInput.clear();
        await updatePage.detailsInput.sendKeys('modified');

        await updatePage.paymentDateInput.clear();
        await updatePage.paymentDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');

        await clear(updatePage.paymentAmountInput);
        await updatePage.paymentAmountInput.sendKeys('6');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});

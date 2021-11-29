/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import NotificationComponent from '@/entities/notification/notification/notification.vue';
import NotificationClass from '@/entities/notification/notification/notification.component';
import NotificationService from '@/entities/notification/notification/notification.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Notification Management Component', () => {
    let wrapper: Wrapper<NotificationClass>;
    let comp: NotificationClass;
    let notificationServiceStub: SinonStubbedInstance<NotificationService>;

    beforeEach(() => {
      notificationServiceStub = sinon.createStubInstance<NotificationService>(NotificationService);
      notificationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<NotificationClass>(NotificationComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          notificationService: () => notificationServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      notificationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllNotifications();
      await comp.$nextTick();

      // THEN
      expect(notificationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.notifications[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      notificationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeNotification();
      await comp.$nextTick();

      // THEN
      expect(notificationServiceStub.delete.called).toBeTruthy();
      expect(notificationServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});

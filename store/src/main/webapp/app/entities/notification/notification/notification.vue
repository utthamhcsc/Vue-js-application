<template>
  <div>
    <h2 id="page-heading" data-cy="NotificationHeading">
      <span v-text="$t('storeApp.notificationNotification.home.title')" id="notification-heading">Notifications</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('storeApp.notificationNotification.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'NotificationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-notification"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('storeApp.notificationNotification.home.createLabel')"> Create a new Notification </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && notifications && notifications.length === 0">
      <span v-text="$t('storeApp.notificationNotification.home.notFound')">No notifications found</span>
    </div>
    <div class="table-responsive" v-if="notifications && notifications.length > 0">
      <table class="table table-striped" aria-describedby="notifications">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('storeApp.notificationNotification.date')">Date</span></th>
            <th scope="row"><span v-text="$t('storeApp.notificationNotification.details')">Details</span></th>
            <th scope="row"><span v-text="$t('storeApp.notificationNotification.sentDate')">Sent Date</span></th>
            <th scope="row"><span v-text="$t('storeApp.notificationNotification.format')">Format</span></th>
            <th scope="row"><span v-text="$t('storeApp.notificationNotification.userId')">User Id</span></th>
            <th scope="row"><span v-text="$t('storeApp.notificationNotification.productId')">Product Id</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notification in notifications" :key="notification.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'NotificationView', params: { notificationId: notification.id } }">{{
                notification.id
              }}</router-link>
            </td>
            <td>{{ notification.date ? $d(Date.parse(notification.date), 'short') : '' }}</td>
            <td>{{ notification.details }}</td>
            <td>{{ notification.sentDate ? $d(Date.parse(notification.sentDate), 'short') : '' }}</td>
            <td v-text="$t('storeApp.NotificationType.' + notification.format)">{{ notification.format }}</td>
            <td>{{ notification.userId }}</td>
            <td>{{ notification.productId }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'NotificationView', params: { notificationId: notification.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'NotificationEdit', params: { notificationId: notification.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(notification)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="storeApp.notificationNotification.delete.question"
          data-cy="notificationDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-notification-heading" v-text="$t('storeApp.notificationNotification.delete.question', { id: removeId })">
          Are you sure you want to delete this Notification?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-notification"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeNotification()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./notification.component.ts"></script>

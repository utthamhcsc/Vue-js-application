<template>
  <div>
    <b-dropdown-item to="/order-item">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.orderItem')">Order Item</span>
    </b-dropdown-item>
    <b-dropdown-item to="/customer">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.customer')">Customer</span>
    </b-dropdown-item>
    <b-dropdown-item to="/notification">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.notificationNotification')">Notification</span>
    </b-dropdown-item>
    <b-dropdown-item to="/product-category">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.productCategory')">Product Category</span>
    </b-dropdown-item>
    <b-dropdown-item to="/product">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.product')">Product</span>
    </b-dropdown-item>
    <b-dropdown-item to="/product-order">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.productOrder')">Product Order</span>
    </b-dropdown-item>
    <b-dropdown-item to="/invoice">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.invoiceInvoice')">Invoice</span>
    </b-dropdown-item>
    <b-dropdown-item to="/shipment">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.invoiceShipment')">Shipment</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>

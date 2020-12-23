<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToSettings"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
        >
        <div class="d-flex mt-3">
          <h2>Billing Address</h2>
        </div>
      </div>
    </vs-col>
    <!-- 
      ***@ --------main part---------------
     -->
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Billing Address Info</h3>
          <div class="mt-2">
            Add your billing address.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Phone Number"
              placeholder="Your phone number..."
              v-model="billing_phone"
              class="w-100 mt-4"
            />
            <vs-input
              label="Address 1"
              placeholder="Address 1"
              v-model="billing_address1"
              class="w-100 mt-4"
            />
            <vs-input
              label="Address 2"
              placeholder="Address 2"
              v-model="billing_address2"
              class="w-100 mt-4"
            />
            <vs-input
              label="Address City"
              placeholder="Address City"
              v-model="billing_city"
              class="w-100 mt-4"
            />
            <vs-input
              label="Address State"
              placeholder="Address State"
              v-model="billing_state"
              class="w-100 mt-4"
            />
            <vs-input
              label="Address Country"
              placeholder="Address Country"
              v-model="billing_country"
              class="w-100 mt-4"
            />
            <vs-input
              label="Zipcode"
              placeholder="Zipcode"
              v-model="billing_zipcode"
              class="w-100 mt-4"
            />
            <vs-input
              label="Vat Number"
              placeholder="Vat Number"
              v-model="billing_vatnumber"
              class="w-100 mt-4"
            />
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <div style="float: right">
        <vs-button class="mt-3" @click="setBillingAddress">Save</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "BillingAddress",

  data: () => ({
    billing_phone: "",
    billing_address1: "",
    billing_address2: "",
    billing_city: "",
    billing_state: "",
    billing_country: "",
    billing_zipcode: "",
    billing_vatnumber: "",
  }),
  /**
   * --------------computed part-------------
   */
  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"];
      },
    },

    notification_text: {
      get() {
        return this.$store.getters["notification_text"];
      },
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"];
      },
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"];
      },
    },

    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },
    billing_address: {
      get() {
        return this.$store.getters["settingManage/billing_address"];
      },
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getBillingAdderss();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    getBillingAdderss() {
      this.$store
        .dispatch("settingManage/getBillingAddress")
        .then(() => {
          this.billing_phone = this.billing_address.phone_number;
          this.billing_address1 = this.billing_address.address1;
          this.billing_address2 = this.billing_address.address2;
          this.billing_city = this.billing_address.address_city;
          this.billing_state = this.billing_address.address_state;
          this.billing_country = this.billing_address.address_country;
          this.billing_zipcode = this.billing_address.zip_code;
          this.billing_vatnumber = this.billing_address.vat_number;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    backToSettings() {
      this.$router.push("/settings");
    },

    setBillingAddress() {
      let billing_address = {
        phone_number: this.billing_phone,
        address1: this.billing_address1,
        address2: this.billing_address2,
        address_city: this.billing_city,
        address_state: this.billing_state,
        address_country: this.billing_country,
        zip_code: this.billing_zipcode,
        vat_number: this.billing_vatnumber,
      };

      this.$store
        .dispatch("settingManage/setBillingAddress", billing_address)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },
  },
};
</script>

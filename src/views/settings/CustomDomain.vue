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
          <h2>Custom Domain</h2>
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
          <h3>Custom Domain</h3>
          <div class="mt-2">
            Please input your custom domain name.
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
              label="Custom Domain"
              placeholder="https://example.com"
              v-model="selected_custom_domain"
              class="w-100 mt-3"
            />
            <label class="mt-2"
              >Example: "www.example.com" or "courses.example.com"</label
            >
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <div style="float: right">
        <vs-button class="mt-3" @click="setCustomDomain">Save</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "BillingAddress",

  data: () => ({
    selected_custom_domain: "",
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

    custom_domain: {
      get() {
        return this.$store.getters["settingManage/custom_domain"];
      },
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getCustomDomain();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    getCustomDomain() {
      this.$store
        .dispatch("settingManage/getCustomDomain")
        .then(() => {
          this.selected_custom_domain = this.custom_domain.custom_domain;
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

    setCustomDomain() {
      let domain = { custom_domain: this.selected_custom_domain };
      this.$store
        .dispatch("settingManage/setCustomDomain", domain)
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

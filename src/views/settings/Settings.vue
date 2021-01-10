<template>
  <vs-row vs-justify="center" class="site-settings primary-font">
    <vs-col vs-lg="10" vs-xs="12">
      <div class="mb-4">
        <div class="d-flex">
          <h2>Site Settings</h2>
        </div>
      </div>
    </vs-col>
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="10"
      vs-xs="12"
      code-toggler
    >
      <vs-card>
        <vs-row class="primary-font">
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToSiteDetails">
              <div class="setting-icon-background">
                <i class="mdi mdi-home" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Site Details</h4>
                <div>
                  Control the info, homepage and SEO settings of your site
                </div>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div
              class="outer-setting-item"
              @click="linkToThirdPartyIntegration"
            >
              <div class="setting-icon-background">
                <i class="mdi mdi-call-split" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Third Party Integration</h4>
                <div>
                  Connect to other applications that work hand in hand with this
                  app
                </div>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToCustomDomain">
              <div class="setting-icon-background">
                <i class="mdi mdi-link" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Custom Domain</h4>
                <div>Set up your custom domain name on your site</div>
              </div>
            </div>
          </vs-col>
          <!-- <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item">
              <div class="setting-icon-background">
                <i class="mdi mdi-credit-card" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Payment Integration</h4>
                <div>
                  Connect your account to trusted payment providers and tax
                  integrations
                </div>
              </div>
            </div>
          </vs-col> -->
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linktToEmailTemplates">
              <div class="setting-icon-background">
                <i class="mdi mdi-email" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Email Templates</h4>
                <div>
                  Control the content of the auto generated system emails
                </div>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToMarketSetting">
              <div class="setting-icon-background">
                <i class="mdi mdi-email-open" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Marketing Settings</h4>
                <div>
                  Control the address, branding and email settings of your site
                </div>
              </div>
            </div>
          </vs-col>
          <!--  <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item">
              <div class="setting-icon-background">
                <i class="mdi mdi-cart" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Checkout Settings</h4>
                <div>
                  Manage under the hood settings of your checkout process
                </div>
              </div>
            </div>
          </vs-col> -->
        </vs-row>
      </vs-card>
    </vs-col>
    <vs-col vs-lg="10" vs-xs="12">
      <div class="mb-4">
        <div class="d-flex">
          <h2>Account Settings</h2>
        </div>
      </div>
    </vs-col>
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="10"
      vs-xs="12"
      code-toggler
    >
      <vs-card>
        <vs-row>
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToAccountDetails">
              <div class="setting-icon-background">
                <i class="mdi mdi-account-circle" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Account Details</h4>
                <div>Manage general settings associated with this account</div>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToAccountUser">
              <div class="setting-icon-background">
                <i class="mdi mdi-account-location" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Sub Users</h4>
                <div>
                  Add or remove the users that have access to your account
                </div>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToNotificationPrivacy">
              <div class="setting-icon-background">
                <i class="mdi mdi-alert-circle" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Notifications & Privacy</h4>
                <div>Control what notification emails you receive from...</div>
              </div>
            </div>
          </vs-col>

          <vs-col vs-lg="4" vs-sm="6" vs-xs="12">
            <div class="outer-setting-item" @click="linkToBilling">
              <div class="setting-icon-background">
                <i class="mdi mdi-currency-usd" style="font-size: 20px"></i>
              </div>
              <div class="ml-2" style="width: 95%">
                <h4>Billing Address</h4>
                <div>
                  Set billing address for users...
                </div>
              </div>
            </div>
          </vs-col>
        </vs-row>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "SiteSettings",
  data: () => ({}),

  created() {
    this.$store.dispatch("changeSideBar", 'default');
  },

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
  },

  methods: {
    linkToThirdPartyIntegration() {
      this.$router.push("/settings/third-party-integration");
    },

    linkToNotificationPrivacy() {
      this.$router.push("/settings/notification-privacy");
    },

    linkToAccountDetails() {
      this.$router.push("/settings/account-details");
    },

    linkToAccountUser() {
      this.$router.push("/settings/sub-users");
    },

    linkToMarketSetting() {
      this.$router.push("/settings/market-setting");
    },

    linkToSiteDetails() {
      this.$router.push("/settings/site-details");
    },

    linktToEmailTemplates() {
      this.$router.push("/settings/email-templates");
    },

    linkToCustomDomain() {
      this.$router.push("/settings/custom-domain");
    },

    linkToBilling() {
      this.$router.push("/settings/billing-address");
    },
  },
};
</script>

<style>
.setting-icon-background {
  background-color: #f3f7fd;
  border-radius: 5px;
  padding: 6px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outer-setting-item {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.outer-setting-item:hover {
  background-color: #f5f7fb;
}

.outer-setting-item:hover .setting-icon-background {
  background-color: #e3e7eb;
}
</style>

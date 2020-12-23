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
          <h2>Notification & Privacy</h2>
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
      vs-sm="12"
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
          <h3>Email Notification</h3>
          <div class="mt-2">
            You can unsubscribe from these emails sent to reply@academy.com at
            any time.
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
            <h4>New & Updates</h4>
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="important"
              >Important update to your account, like password reset emails,
              product updates and getting set up.</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="rewards"
              >Notify me when I earn free swag and rewards from Academy Hero
              Program.</vs-checkbox
            >
            <h4 class="mt-4">Comments</h4>
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="new_comment"
              >Notify me when a new comment is created</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="new_reply"
              >Notify me when a new reply to one of my posts or comments is
              created</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="new_post"
              >Notify me when a community memeber creates post</vs-checkbox
            >
            <h4 class="mt-4">Memeber Subscription & Payments</h4>
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="payment_fail"
              >Notify me when a subscription payments when a member
              fails</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="card_expiry"
              >Notify me when a memeber removes their card on file</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="subscription_cancel"
              >Notify me when a memeber cancels their subscription</vs-checkbox
            >
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Privacy</h3>
          <div class="mt-2">
            You can change your private settings at any time.
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
            <h4>Partner Leaderboard</h4>
            <vs-checkbox
              class="justify-content-start mt-3"
              v-model="privacy"
              size="small"
              >Display my first name and last initial on the partner program
              leaderboard</vs-checkbox
            >
          </vs-card>
          <div style="float: right">
            <vs-button class="mt-3" @click="setNotificaton">Save</vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "NotificationPrivacy",

  data: () => ({
    important: false,
    rewards: false,
    new_comment: false,
    new_reply: false,
    new_post: false,
    payment_fail: false,
    card_expiry: false,
    subscription_cancel: false,
    privacy: false,
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

    notification: {
      get() {
        return this.$store.getters["settingManage/notification"];
      },
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", false);
    this.initNotfication();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    backToSettings() {
      this.$router.push("/settings");
    },

    /**
     * --------------update notification-------------
     */
    setNotificaton() {
      let updateNotificaton = Object.assign({}, this.notification);
      updateNotificaton.important = this.important;
      updateNotificaton.rewards = this.rewards;
      updateNotificaton.new_comment = this.new_comment;
      updateNotificaton.new_reply = this.new_reply;
      updateNotificaton.new_post = this.new_post;
      updateNotificaton.payment_fail = this.payment_fail;
      updateNotificaton.subscription_cancel = this.subscription_cancel;
      updateNotificaton.card_expiry = this.card_expiry;
      updateNotificaton.privacy = this.privacy;

      this.$store
        .dispatch("settingManage/setNotification", updateNotificaton)
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

    /**
     * --------------method part-------------
     */
    initNotfication() {
      this.$store
        .dispatch("settingManage/getNotification")
        .then(() => {
          this.important = this.notification.important;
          this.rewards = this.notification.rewards;
          this.new_comment = this.notification.new_comment;
          this.new_reply = this.notification.new_reply;
          this.new_post = this.notification.new_post;
          this.payment_fail = this.notification.payment_fail;
          this.subscription_cancel = this.notification.subscription_cancel;
          this.card_expiry = this.notification.card_expiry;
          this.privacy = this.notification.privacy;
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
<style>
.con-vs-checkbox {
  display: -webkit-box;
}
</style>

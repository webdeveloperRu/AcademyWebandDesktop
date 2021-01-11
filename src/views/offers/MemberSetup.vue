<template>
  <div class="member-setup">
    <div>
      <div class="member-setup-title">
        <i class="mdi mdi-check" style="font-size: 32px"></i>
        <div>
          Purchase Successful!
        </div>
      </div>
      <div class="member-setup-note primary-font">
        Please complete the fiedls below to create your account
      </div>
      <vs-card class="member-register">
        <vs-input
          label="First Name"
          class="inputx w-100 mb-3"
          v-model="first_name"
        />
        <vs-input
          label="Last Name"
          class="inputx w-100 mb-3"
          v-model="last_name"
        />
        <vs-input
          label="Password"
          class="inputx w-100 mb-3"
          v-model="password"
        />
        <vs-input
          label="Verify Password"
          class="inputx w-100 mb-3"
          v-model="verify_password"
        />
      </vs-card>
      <div class="create-account-button">
        <vs-button color="primary">Create Account</vs-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkout-processing",
  components: {},

  data: () => ({
    first_name: "",
    last_name: "",
    password: "",
    verify_password: "",
  }),

  created() {},

  methods: {
    processing() {},
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
};
</script>

<style lang="scss">
.member-setup {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.member-setup-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.member-setup-note {
  font-size: 14px;
  margin-bottom: 20px;
}
.create-account-button {
  text-align: center;
}
</style>

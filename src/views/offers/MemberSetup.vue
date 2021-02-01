<template>
  <div class="member-setup">
    <div>
      <div class="member-setup-title">
        <i class="mdi mdi-check" style="font-size: 32px"></i>
        <div>Purchase Successful!</div>
      </div>
      <div class="member-setup-note primary-font">
        Please complete the fiedls below to create your account
      </div>
      <vs-card class="member-register">
        <vs-input
          label="Full Name"
          class="inputx w-100 mb-3"
          v-model="full_name"
          :danger="valid_name"
          :danger-text="name_danger_text"
        />
        <vs-input
          label="Password"
          class="inputx w-100 mb-3"
          v-model="password"
          type="password"
          :danger="valid_password"
          :danger-text="password_danger_text"
        />
        <vs-input
          label="Verify Password"
          class="inputx w-100 mb-3"
          type="password"
          v-model="verify_password"
          :danger="valid_verify_password"
          :danger-text="verify_password_danger_text"
        />
      </vs-card>
      <div class="create-account-button">
        <vs-button color="primary" @click.native="createAccount"
          >Create Account</vs-button
        >
      </div>
    </div>
    <!-- 
      ***@  --------Success ---------------
     -->
    <vs-popup
      color="success"
      :active.sync="active_success_register"
      title="Register"
    >
      <div class="mt-3">
        <h5>Successsfully Registered!</h5>
      </div>
      <div class="take-me-there">Take me there!</div>
      <i
        class="mdi mdi-open-in-new take-me-there ml-2"
        style="cursor: pointer; font-size: 20px"
      ></i>
      <div class="d-flex mt-5">
        <vs-button
          color="primary"
          type="border"
          class="save-cancel-button"
          style="margin-left: auto"
          @click.native="active_success_register = false"
          >close</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>
<script>
export default {
  name: "checkout-processing",
  components: {},

  data: () => ({
    full_name: "",
    password: "",
    verify_password: "",
    name_danger_text: "",
    valid_name: false,
    valid_password: false,
    valid_verify_password: false,
    verify_password_danger_text: "",
    password_danger_text: "",
    active_success_register: false,
  }),

  created() {},
  watch: {
    full_name: function (newValue) {
      if (newValue !== "") this.valid_name = false;
    },
    password: function (newValue) {
      if (newValue !== "") this.valid_password = false;
    },
    verify_password: function (newValue) {
      if (newValue !== "") this.valid_verify_password = false;
    },
  },

  methods: {
    createAccount() {
      if (this.full_name == "") {
        this.name_danger_text = "name required";
        this.valid_name = true;
        return;
      }
      if (this.password == "") {
        this.password_danger_text = "password required";
        this.valid_password = true;
        return;
      }
      if (this.verify_password == "") {
        this.verify_password_danger_text = "verify password required";
        this.valid_verify_password = true;
        return;
      }
      if (this.password != this.verify_password) {
        this.valid_verify_password = true;
        this.verify_password_danger_text = "verify password doesn't match";
        return;
      }
      let granted_access = [];
      granted_access[0] = this.purchaser_offer_id;
      let user = {
        email: this.purchaser_email,
        name: this.full_name,
        password: this.password,
        otp: "",
      };
      let people = {
        email: this.purchaser_email,
        name: this.full_name,
        tags: [],
        is_subscribe: false,
        granted_access: granted_access,
      };

      this.$store.dispatch("peopleManage/addPeople", people).then(() => {
        if (this.status_got) {
          this.$store
            .dispatch("auth/forgotStudentPassword", this.purchaser_email)
            .then(() => {
              if (this.status_got) {
                this.$store
                  .dispatch("auth/resetStudentPassword", [
                    user,
                    this.student_email_code,
                  ])
                  .then(() => {
                    if (this.status_got) {
                      window.open(this.custom_domain, "_self");
                    } else {
                      this.$vs.notify({
                        color: this.notification_color,
                        text: this.notification_text,
                        icon: this.notification_icon,
                      });
                    }
                  });
              } else {
                this.$vs.notify({
                  color: this.notification_color,
                  text: this.notification_text,
                  icon: this.notification_icon,
                });
              }
            });
        } else {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        }
      });
    },
  },

  computed: {
    student_email_code: {
      get() {
        return this.$store.getters["student_email_code"];
      },
    },
    purchaser_email: {
      get() {
        return this.$store.getters["purchaser_email"];
      },
    },
    purchaser_offer_id: {
      get() {
        return this.$store.getters["purchaser_offer_id"];
      },
    },
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
        let custom_domain = this.$store.getters["settingManage/custom_domain"]
          .custom_domain;
        let lastChar = custom_domain[custom_domain.length - 1];
        if (lastChar == "/")
          return custom_domain.substr(0, custom_domain.length - 1);
        else return custom_domain;
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
.take-me-there {
  display: inline-flex;
  align-items: center;
  position: relative;
  color: #0072ef;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
}
</style>

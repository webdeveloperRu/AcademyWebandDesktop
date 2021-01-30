<template>
  <div class="checkout-processing">
    <div class="processing-body">
      <div class="success-checkmark" v-if="processing_success">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <div
        class="success-checkmark"
        v-if="!processing_success"
        style="visibility: hidden"
      >
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <div class="processing-title" v-if="!processing_success">
        Processing your purchase for Online Course Offer...
      </div>
      <div class="processing-title" v-else>Success!</div>
      <div class="processing-content primary-font">
        Please sit tight and do not refresh or click away from this page.
      </div>
      <div class="processing-content primary-font">
        This process can take up to 60 seconds
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkout-processing",
  components: {},
  data: () => ({
    processing_success: false,
  }),
  created() {
    setTimeout(() => this.processing(), 1500);
  },
  methods: {
    processing() {
      this.processing_success = true;
      setTimeout(() => {
        if (!this.student_email_exist) {
          if (this.student_register_required)
            this.$router.push("/settings/member-setup");
          else this.registerStudent();
        } else window.open("https://store.krakiun.com/", "_self");
      }, 1000);
    },

    registerStudent() {
      let granted_access = [];
      granted_access[0] = this.purchaser_offer_id;
      let user = {
        email: this.purchaser_email,
        name: this.purchaser_fullname,
        password: this.purchaser_password,
        otp: "",
      };
      let people = {
        email: this.purchaser_email,
        name: this.purchaser_fullname,
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
                      window.open("https://store.krakiun.com/", "_self");
                    } else {
                      this.$vs.notify({
                        color: this.notification_color,
                        text: this.notification_text,
                        icon: this.notification_icon,
                      });
                      this.$router.push(
                        "/offers/" + this.purchaser_offer_id + "/checkout"
                      );
                    }
                  });
              } else {
                this.$vs.notify({
                  color: this.notification_color,
                  text: this.notification_text,
                  icon: this.notification_icon,
                });
                this.$router.push(
                  "/offers/" + this.purchaser_offer_id + "/checkout"
                );
              }
            });
        } else {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$router.push("/offers/" + this.purchaser_offer_id + "/checkout");
        }
      });
    },
  },

  computed: {
    purchaser_offer_id: {
      get() {
        return this.$store.getters["purchaser_offer_id"];
      },
    },
    student_email_code: {
      get() {
        return this.$store.getters["student_email_code"];
      },
    },
    student_register_required: {
      get() {
        return this.$store.getters["student_register_required"];
      },
    },

    purchaser_email: {
      get() {
        return this.$store.getters["purchaser_email"];
      },
    },

    purchaser_password: {
      get() {
        return this.$store.getters["purchaser_password"];
      },
    },

    purchaser_fullname: {
      get() {
        return this.$store.getters["purchaser_fullname"];
      },
    },

    student_email_exist: {
      get() {
        return this.$store.getters["student_email_exist"];
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

    offer_id: function () {
      var id = this.$route.params.offer_id;
      if (id == undefined) return "";
      else return id.slice(0, id.length);
    },
  },
};
</script>

<style lang="scss">
.checkout-processing {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
}
.processing-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}
.processing-content {
  font-size: 16px;
  text-align: center;
  font-weight: 500;
}
/**
 * Extracted from: SweetAlert
 * Modified by: Istiak Tridip
 */
.success-checkmark {
  width: 80px;
  height: 115px;
  margin: 0 auto;

  .check-icon {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid #109114;

    &::before {
      top: 3px;
      left: -2px;
      width: 30px;
      transform-origin: 100% 50%;
      border-radius: 100px 0 0 100px;
    }

    &::after {
      top: 0;
      left: 30px;
      width: 60px;
      transform-origin: 0 50%;
      border-radius: 0 100px 100px 0;
      animation: rotate-circle 4.25s ease-in;
    }

    &::before,
    &::after {
      content: "";
      height: 100px;
      position: absolute;
      background: #ffffff;
      transform: rotate(-45deg);
    }

    .icon-line {
      height: 5px;
      background-color: #109114;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 10;

      &.line-tip {
        top: 46px;
        left: 14px;
        width: 25px;
        transform: rotate(45deg);
        animation: icon-line-tip 0.75s;
      }

      &.line-long {
        top: 38px;
        right: 8px;
        width: 47px;
        transform: rotate(-45deg);
        animation: icon-line-long 0.75s;
      }
    }

    .icon-circle {
      top: -4px;
      left: -4px;
      z-index: 10;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      box-sizing: content-box;
      border: 4px solid rgba(1, 165, 6, 0.5);
    }

    .icon-fix {
      top: 8px;
      width: 5px;
      left: 26px;
      z-index: 1;
      height: 85px;
      position: absolute;
      transform: rotate(-45deg);
      background-color: #ffffff;
    }
  }
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>

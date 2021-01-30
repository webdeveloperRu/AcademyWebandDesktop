<template>
  <div>
    <!-- banner section -->
    <div v-if="banner_enable">
      <div
        class="checkout-banner"
        :style="{
          'background-image': cssbannerImageUrl,
          height: banner_height + 'px',
        }"
        v-bind:key="banner_height"
      ></div>
      <label class="edit-button" size="small">Edit</label>
    </div>
    <vs-row vs-justify="center" class="mt-5" style="width: 100% !important">
      <!-- <vs-col vs-lg="2"></vs-col> -->
      <vs-col vs-lg="5" class="px-5" vs-sm="7" vs-xs="12">
        <!-- 
          thumbnail section 
          -->
        <div v-if="selected_public_offer.thumbnail" class="mb-5">
          <div
            class="checkout-image-div shadow"
            :style="{ 'background-image': cssthumbImageUrl }"
          ></div>
        </div>

        <!-- 
          offer title 
          -->
        <div>
          <h2 class="offer_checkout_title">{{ selected_public_offer.name }}</h2>
        </div>

        <!-- 
          insert a call to action 
          -->
        <div>
          <div
            v-html="htmlBody"
            class="mt-3 mb-3 ql-editor"
            style="word-wrap: break-word"
          ></div>
        </div>
        <!-- 
          testmonial section 
          -->
        <br />
        <div v-for="(testimonial, index) in testimonials" v-bind:key="index">
          <div>
            <h4 class="mt-3 mb-3" v-if="index == 0">
              {{ testimonials[index].title }}
            </h4>
          </div>

          <div class="mb-3">
            <div class="testimonial-description mx-1 my-1">
              {{ testimonials[index].quote_text }}
            </div>
            <div class="d-flex mt-2 mx-1 mb-1" style="align-items: center">
              <vs-avatar
                size="large"
                :src="testimonials[index].avatar_img"
              ></vs-avatar>
              <h4>{{ testimonials[index].author_name }}</h4>
            </div>
          </div>
        </div>
      </vs-col>

      <vs-col vs-lg="4" vs-sm="5" vs-xs="12">
        <vs-card>
          <h2 v-if="selected_public_offer.price > 0">
            <strong>{{ selected_public_offer.price }}</strong>
            <small> {{ selected_public_offer.currency | capitalize }}</small>
          </h2>
          <h2 v-else><strong>Free</strong></h2>
          <vs-divider></vs-divider>
          <div v-show="collect_name_password">
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Full Name"
              :danger="invalid_fullname"
              danger-text="Full Name is required"
              v-model="fullname"
            />
          </div>
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Email Address"
            :danger="invalid_email"
            danger-text="The mail is invalid"
            v-model="email"
          />
          <div v-if="collect_name_password">
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Create Password"
              v-model="createPW"
              :danger="invalid_createPW"
              danger-text="Password is required"
              type="password"
            />
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Confirm Password"
              v-model="confirmPW"
              :danger="invalid_confirmPW"
              danger-text="Confirm Password is required or mismatching"
              type="password"
            />
          </div>

          <div v-if="collect_address">
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Address Line 1"
              v-model="address1"
            />
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Apt, Suite, Etc"
              v-model="apt"
            />
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="City"
              v-model="city"
            />
            <!-- <vs-input
                class="inputx w-100 mt-3"
                placeholder="Country Name"
                v-model="country"
              />
              <vs-input
                class="inputx w-100 mt-3"
                placeholder="State/Province/Region"
                v-model="region"
              /> -->
            <div class="select-country">
              <country-select
                v-model="country"
                :country="country"
                topCountry="US"
                class="w-100 mt-3"
              />
              <region-select
                v-model="region"
                :country="country"
                :region="region"
                class="w-100 mt-3"
              />
            </div>
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Zip/Postal Code"
              v-model="zipcode"
            />
          </div>

          <div v-if="collect_phone">
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Phone Number"
              v-model="phone_number"
            />
          </div>

          <div v-if="selected_public_offer.price > 0">
            <div
              v-if="!payment_type"
              class="mt-3 payment_type"
              style="border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 5px"
            >
              <vs-radio
                v-model="payment_type"
                vs-name="payment_type"
                vs-value="stripe"
                class="ml-3"
                >Stripe</vs-radio
              >
              <vs-divider></vs-divider>
              <vs-radio
                v-model="payment_type"
                vs-name="payment_type"
                vs-value="paypal"
                class="ml-3"
                >PayPal</vs-radio
              >
              <vs-divider></vs-divider>
              <vs-radio
                v-model="payment_type"
                vs-name="payment_type"
                vs-value="btcpay"
                class="ml-3"
                >Btcpay</vs-radio
              >
            </div>
            <div class="text-center">
              <img
                src="../../assets/images/logo/stripe_logo.png"
                width="20%"
                class="mt-3"
                v-if="payment_type == 'stripe'"
              />
              <!-- <vs-button class="w-100 mt-3" color="primary" v-if="payment_type == 'stripe'"><img src="../../assets/images/logo/stripe_logo.png" width="30%" class=""/></vs-button> -->
              <img
                src="../../assets/images/logo/paypal_logo.png"
                width="20%"
                class="mt-3"
                v-if="payment_type == 'paypal'"
              />
              <!-- <vs-button class="w-100 mt-3" color="warning" v-if="payment_type == 'paypal'"><img src="../../assets/images/logo/paypal_logo.png" width="40%" class=""/></vs-button> -->
              <img
                src="../../assets/images/logo/btcpay_logo.png"
                width="20%"
                class="mt-3"
                v-if="payment_type == 'btcpay'"
              />
              <!-- <vs-button class="w-100 mt-3" color="success" v-if="payment_type == 'btcpay'">BTCPAY</vs-button> -->
            </div>
            <div
              v-if="payment_type"
              class="mt-2 ml-2"
              style="color: dodgerblue; cursor: pointer; user-select: none"
              @click="initPaymentType()"
            >
              Change payment method
            </div>
          </div>

          <div class="mt-3" v-if="!student_email_exist">
            <vs-checkbox
              class="justify-content-start"
              size="small"
              v-model="subscribeEmailList"
              >Subscribe to our email list.</vs-checkbox
            >
          </div>

          <!-- service agreement  -->
          <div class="mt-3" v-if="show_required">
            <div class="">
              <vs-checkbox
                class="justify-content-start"
                size="small"
                v-model="required_agreement"
                >I have read and agree to the terms and condition of this
                page.</vs-checkbox
              >
              <div
                class="ml-5 mt-2"
                v-html="custom_agree_text"
                v-if="service_agreement.status == 'custom_agreement'"
              ></div>
            </div>
          </div>
          <!-- <vs-button class="w-100 mt-3">Check Out</vs-button> -->
          <stripe-checkout
            ref="sessionRef"
            :pk="publishableKey"
            :session-id="sessionId"
            v-if="selected_public_offer.price > 0"
          >
            <template slot="checkout-button">
              <vs-button
                @click.native="$refs.sessionRef.redirectToCheckout()"
                color="#42b883"
                class="w-100 mt-3"
                >Checkout</vs-button
              >
            </template>
          </stripe-checkout>
          <vs-button
            v-else
            class="w-100 mt-3"
            color="primary"
            @click.native="signUpFree"
            >{{ signUpFreeText }}</vs-button
          >
          <!-- <div
            class="vs-con-loading__container loading "
            ref="loading"
            id="loading"
          ></div> -->
        </vs-card>
      </vs-col>
    </vs-row>
    <!-- 
      ***@  --------Head Up offer ---------------
     -->
    <vs-popup
      color="success"
      :active.sync="active_headup_pop"
      title="Heads up!"
    >
      <div class="mt-3">
        <h5>
          It looks like you already purchased {{ selected_public_offer.name }}
        </h5>
      </div>
      <div class="take-me-there">Take me there!</div>
      <i
        class="mdi mdi-open-in-new take-me-there ml-2"
        @click="linkToStudentApp"
        style="cursor: pointer; font-size: 20px"
      ></i>
      <div class="d-flex mt-5">
        <vs-button
          color="primary"
          type="border"
          class="save-cancel-button"
          style="margin-left: auto"
          @click.native="closeHeadUp"
          >close</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { StripeCheckout } from "vue-stripe-checkout";
export default {
  name: "PreviewOfferCheckoutNew",
  components: {
    StripeCheckout,
  },
  data: () => ({
    sessionId: "",
    publishableKey:
      "pk_test_51HryTSGco8NY0Qf81QPnsRXL9y2OCTsbf0mwo63gQVZLPUN8TAcH0GtvYoaUjqK0y9aMOo6auH7ljPKg15Kvh8cR00UZ2HXRAf",
    email: "",
    payment_offer_id: "eNQCxMio",
    address1: "",
    phone_number: "",
    apt: "",
    city: "",
    fullname: "",
    confirmPW: "",
    createPW: "",
    country: "",
    region: "",
    zipcode: "",
    subscribeEmailList: false,
    required_agreement: false,
    custom_agreement: false,
    csslogoImageUrl: "",
    agree_title: "",
    show_required: false,
    css_banner_height: "",
    payment_type: "stripe",
    invalid_email: false,
    invalid_fullname: false,
    invalid_confirmPW: false,
    invalid_createPW: false,
    signUpFreeText: "Sign up for free",
    active_headup_pop: false,
    collect_name_password: false,
    collect_address: false,
    collect_phone: false,
    start_search_email: 0,
    already_purchased: false,
    exist_student: null,
  }),
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
    custom_agree_text: {
      get() {
        return this.service_agreement.custom_agreement_text;
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
      return id.slice(0, id.length);
    },

    testimonials: {
      get() {
        return this.selected_public_offer.testimonials;
      },
    },

    service_agreement: {
      get() {
        return this.selected_public_offer.service_agreement;
      },
    },

    extra_contact_information: {
      get() {
        let temp_extra = {
          collect_name_password: false,
          collect_phone: false,
          collect_address: false,
        };
        if (this.selected_public_offer.extra_contact_information == undefined) {
          return temp_extra;
        } else return this.selected_public_offer.extra_contact_information;
      },
    },

    selected_public_offer: function () {
      let offer = [];
      offer = this.$store.state.offerManage.current_public_offer;
      if (offer == undefined) return [];
      else return offer;
    },

    banner_height: {
      get() {
        return this.selected_public_offer.banner_height;
      },
    },

    banner_enable: {
      get() {
        return this.selected_public_offer.banner_enable;
      },
    },

    htmlBody: {
      get() {
        return this.selected_public_offer.description;
      },
    },

    cssbannerImageUrl: {
      get() {
        return "url(" + this.selected_public_offer.banner_img + ")";
      },
    },

    cssthumbImageUrl: {
      get() {
        return "url(" + this.selected_public_offer.thumbnail + ")";
      },
    },

    stripe_session_id: {
      get() {
        return this.$store.state.paymentManage.stripe_session_id;
      },
    },

    people_list: {
      get() {
        return this.$store.getters["peopleManage/people_list"];
      },
    },

    student_email_exist: {
      get() {
        return this.$store.getters["student_email_exist"];
      },
    },
  },

  watch: {
    service_agreement: function () {
      if (this.service_agreement.status !== undefined) {
        if (this.service_agreement.status == "not_required") {
          this.show_required = false;
        } else if (this.service_agreement.status == "required") {
          this.show_required = true;
          this.agree_title =
            "I have read read and agree to the terms and conditions of this page";
        } else if (this.service_agreement.status == "custom_agreement") {
          this.agree_title =
            "I have read read and agree to the terms and conditions of this page as follows";
        }
      }
    },

    email: function (newValue) {
      if (this.start_search_email > 0) {
        clearTimeout(this.start_search_email);
      }
      // this.start_search_email = setTimeout(
      //   this.searchStudentEmail(newValue),
      //   3000
      // );

      this.start_search_email = setTimeout(() => {
        this.searchStudentEmail(newValue);
      }, 1000);
    },
  },

  created() {
    // this.$store.dispatch('changeSideBar', true)
    this.initCheckoutPage();
    this.createNewPayment();
  },

  methods: {
    searchStudentEmail(email) {
      let found = false;
      this.already_purchased = false;
      for (let i = 0; i < this.people_list.length; i++) {
        if (this.people_list[i].email == email) {
          found = true;
          this.$store.commit("SET_STUDENT_EMAIL_EXIST", true);
          this.exist_student = this.people_list[i];
          for (let j = 0; j < this.people_list[i].granted_access.length; j++) {
            if (
              this.people_list[i].granted_access[j].offer_id ==
              this.selected_public_offer.id
            ) {
              this.already_purchased = true;
            }
          }
          break;
        } else {
          found = false;
          this.exist_student = null;
          this.$store.commit("SET_STUDENT_EMAIL_EXIST", false);
        }
      }
      if (found) {
        this.collect_name_password = false;
        this.collect_address = false;
        this.collect_phone = false;
      } else {
        if (this.extra_contact_information !== null) {
          this.collect_name_password = this.extra_contact_information.collect_name_password;
          this.collect_phone = this.extra_contact_information.collect_phone;
          this.collect_address = this.extra_contact_information.collect_address;
          if (this.collect_name_password)
            this.$store.commit("SET_REGISTER_REQUIRE", false);
          else this.$store.commit("SET_REGISTER_REQUIRE", true);
        }
      }
    },
    createNewPayment() {
      let payment = {
        payment_type: "stripe",
        offer_id: "VTVqDfDO",
        email: "Vlad@gmail.com",
      };
      this.$store
        .dispatch("paymentManage/createPaymentStripe", payment)
        .then(() => {
          this.sessionId = this.stripe_session_id;
        });
    },
    initPaymentType() {
      this.payment_type = "";
    },
    changeSideMenu(menu_option) {
      this.$store.dispatch("setCurrentCheckoutMenu", menu_option);
    },

    signUpFree() {
      if (!this.validEmail(this.email)) {
        this.invalid_email = true;
        return;
      }
      if (
        this.extra_contact_information.collect_name_password &&
        this.student_email_exist
      ) {
        if (this.fullname == "") {
          this.invalid_fullname = true;
          return;
        }
        if (this.confirmPW == "") {
          this.invalid_confirmPW = true;
          return;
        }
        if (this.createPW == "") {
          this.invalid_createPW = true;
          return;
        }
        if (this.createPW != this.confirmPW) {
          this.invalid_confirmPW = true;
        }
      }
      this.invalid_confirmPW = false;
      this.invalid_confirmPW = false;
      this.invalid_email = false;
      this.invalid_fullname = false;
      if (this.already_purchased) {
        this.active_headup_pop = true;
        return;
      }
      if (this.student_email_exist) {
        this.signUpFreeText = "Submitting...";
        let access = [];
        for (let j = 0; j < this.exist_student.granted_access.length; j++) {
          access[j] = this.exist_student.granted_access[j].offer_id;
        }
        access[access.length] = this.selected_public_offer.id;
        this.exist_student.granted_access = [];
        this.exist_student.granted_access = access;
        this.addGrantedAccess(this.exist_student);
      } else {
        this.$store.commit("SET_PURCHASER_EMAIL", this.email);
        this.$store.commit("SET_PURCHASER_OFFER_ID", this.offer_id);
        this.$store.commit("SET_PURCHASER_FULLNAME", this.fullname);
        this.$store.commit("SET_PURCHASER_PASSWORD", this.createPW);
        this.$router.push("/offers/" + this.offer_id + "/checkout/processing");
      }

      // if (email_exist == false) {
      //   this.$store.commit("SET_STUDENT_EMAIL_EXIST", false);
      //   this.$store.commit("SET_PURCHASER_EMAIL", this.email);
      //   this.$store.commit("SET_PURCHASER_OFFER_ID", this.offer_id);
      //   this.$router.push("/offers/" + this.offer_id + "/checkout/processing");
      // } else {
      //   this.$store.commit("SET_STUDENT_EMAIL_EXIST", true);
      //   this.$router.push("/offers/" + this.offer_id + "/checkout/processing");
      // }
    },

    addGrantedAccess(people) {
      this.$store
        .dispatch("peopleManage/updatePeopleByID", [people, people.id])
        .then(() => {
          if (this.status_got)
            this.$router.push(
              "/offers/" + this.offer_id + "/checkout/processing"
            );
          // this.$vs.notify({
          //   color: this.notification_color,
          //   text: this.notification_text,
          //   icon: this.notification_icon,
          // });
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      return re.test(email);
    },

    initCheckoutPage() {
      this.$store
        .dispatch("offerManage/getPublicOfferByID", this.offer_id)
        .then(() => {
          if (this.status_got) {
            if (this.selected_public_offer.extra_contact_information !== null) {
              this.collect_name_password = this.selected_public_offer.extra_contact_information.collect_name_password;
              this.collect_address = this.selected_public_offer.extra_contact_information.collect_address;
              this.collect_phone = this.selected_public_offer.extra_contact_information.collect_phone;
            }
            this.csslogoImageUrl =
              "url(" + this.selected_public_offer.logo_image + ")";
            if (this.service_agreement == null) {
              this.show_required = false;
            } else {
              if (this.service_agreement.status != "not_required") {
                this.show_required = true;
              }
              if (this.service_agreement.status == "required") {
                this.agree_title =
                  "I have read read and agree to the terms and conditions of this page";
              } else if (this.service_agreement.status == "custom_agreement") {
                this.agree_title =
                  "I have read read and agree to the terms and conditions of this page as follows";
              }
            }
          }
        });
    },
    linkToStudentApp() {
      window.open("https://store.krakiun.com/", "_blank");
    },
    closeHeadUp() {
      this.active_headup_pop = false;
    },
  },
  filters: {
    capitalize: function (value) {
      if (value == undefined) return "";
      else return value.toUpperCase();
    },
  },
};
</script>

<style>
.checkout-banner {
  background-color: dodgerblue;
  height: 100px;
  width: 100%;
  overflow: hidden;
  padding-top: 10%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.checkout-image-div {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.testimonial-description {
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  padding: 20px;
}

.con-vs-checkbox {
  display: -webkit-box;
}

.outline-edit {
  position: relative;
  border: 2px transparent dashed;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  user-select: none;
}

.outline-edit:hover {
  border: 2px dodgerblue dashed;
  background-color: rgba(98, 120, 243, 0.2);
}

.outline-edit:hover .edit-button {
  display: block;
}

.edit-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  background-color: #2962ff;
  color: white;
  padding: 3px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.payment_type label.con-vs-radio {
  margin-top: 10px;
}

.payment_type .vs-divider {
  margin: 10px 0;
}

.select-country select {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  padding: 0.4rem;
}

.select-country select:focus {
  border: 1px solid rgba(var(--vs-primary), 1) !important;
  -webkit-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
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

/* .loading {
  width: 50px;
  height: 50px;
} */
</style>

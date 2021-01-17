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
    <vs-row vs-justify="center" class="mt-5">
      <!-- <vs-col vs-lg="2"></vs-col> -->
      <vs-col vs-lg="5" class="px-5" vs-sm="7" vs-xs="12">
        <!-- 
          thumbnail section 
          -->
        <div v-if="selected_public_offer.thumbnail" class="mt-5">
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
            style="word-wrap: break-word;"
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
            <div class="testimonial-description  mx-1 my-1">
              {{ testimonials[index].quote_text }}
            </div>
            <div class="d-flex mt-2 mx-1 mb-1" style="align-items:center">
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
          <vs-input
            v-if="extra_contact_information.collect_address"
            class="inputx w-100 mt-3"
            placeholder="Full Name"
            v-model="fullname"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Email Address"
            :danger="invalid_email"
            danger-text="The mail is invalid"
            v-model="email"
          />
          <div v-if="extra_contact_information.collect_name_password">
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Create Password"
              v-model="createPW"
              type="password"
            />
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Confirm Password"
              v-model="confirmPW"
              type="password"
            />
          </div>

          <div v-if="extra_contact_information.collect_address">
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

          <div v-if="extra_contact_information.collect_phone">
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
              style="color: dodgerblue;cursor:pointer; user-select: none"
              @click="initPaymentType()"
            >
              Change payment method
            </div>
          </div>

          <div class="mt-3">
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
            :disabled="signingUpFree"
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
      "pk_test_51HSAi7GPPRAMdTbIlyGMnbQwz7LsHu6CljHZfYaTW36smLIxJEQ486LirXnrTqI0uQLCcd9K64eySJCOVKcroeuy00MDTuAF05",
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
    signingUpFree: false,
    signUpFreeText: "Sign up for free",
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

    offer_id: function() {
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

    selected_public_offer: function() {
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
  },

  watch: {
    service_agreement: function() {
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
  },

  created() {
    // this.$store.dispatch('changeSideBar', true)
    this.initCheckoutPage();
    this.createNewPayment();
  },

  methods: {
    createNewPayment() {
      let payment = {
        payment_type: "stripe",
        offer_id: this.payment_offer_id,
        email: this.email,
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
      this.invalid_email = false;
      this.signingUpFree = true;
      this.signUpFreeText = "Submitting";
      this.$router.push("/offers/" + this.offer_id + "/checkout/processing");
    },

    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      return re.test(email);
    },

    initCheckoutPage() {
      this.$store
        .dispatch("offerManage/getPublicOfferByID", this.offer_id)
        .then(() => {
          this.csslogoImageUrl =
            "url(" + this.selected_public_offer.logo_image + ")";
          if (this.service_agreement.status == undefined) {
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
        });
    },
  },
  filters: {
    capitalize: function(value) {
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
/* .loading {
  width: 50px;
  height: 50px;
} */
</style>

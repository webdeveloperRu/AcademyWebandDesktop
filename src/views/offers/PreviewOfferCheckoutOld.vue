<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col vs-lg="5">
        <vs-card>
          <h4 class="mb-3">Account Information</h4>
          <div>Already have an account? <a href="#">Sign in</a></div>
          <vs-input v-if="extra_contact_information.collect_name_password"
            class="inputx w-100 mt-3"
            placeholder="Full Name"
            v-model="fullname"
          />
          <vs-input
            class="inputx w-100 mt-3 mb-2"
            placeholder="Email Address"
            v-model="email"
          />
          <div v-if="extra_contact_information.collect_name_password">
            <span class="ml-1 text-muted">You'll receive notifications at this email address.</span>
            <vs-input
              class="inputx w-100 mt-3"
              placeholder="Create Password"
              v-model="createPW"
              type="password"
            />
            <vs-input
              class="inputx w-100 mt-3 mb-2"
              placeholder="Confirm Password"
              v-model="confirmPW"
              type="password"
            />
            <span class="ml-1 text-muted">Need help?</span>
          </div>
        </vs-card>

        <vs-card >
          <div v-if="extra_contact_information.collect_address">
            <h4 class="mb-3">Extra Contact Information</h4>
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
              <country-select v-model="country" :country="country" topCountry="US" class="w-100 mt-3" />
              <region-select v-model="region" :country="country" :region="region"  class="w-100 mt-3"/>
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
        </vs-card>


        <vs-card>
          <h4 class="mb-3">Payment</h4>
          <div v-if="!payment_type" class="mt-3 payment_type" style="border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 5px">
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
          <span class="ml-1 text-muted">Card information is stored on a secure server.</span>
        </vs-card>

        <!-- service agreement -->
        <vs-card>
          <h4 class="mb-3">Complete</h4>
          <!-- <vs-button class="w-100 mt-3" color="primary" v-if="payment_type == 'stripe'"><img src="../../assets/images/logo/stripe_logo.png" width="30%" class=""/></vs-button>
          <vs-button class="w-100 mt-3" color="warning" v-if="payment_type == 'paypal'"><img src="../../assets/images/logo/paypal_logo.png" width="40%" class=""/></vs-button>
          <vs-button class="w-100 mt-3" color="success" v-if="payment_type == 'btcpay'">BTCPAY</vs-button> -->
          <div class="text-center">
            <img src="../../assets/images/logo/stripe_logo.png" width="40%" class="mt-3" v-if="payment_type == 'stripe'"/>
            <!-- <vs-button class="w-100 mt-3" color="primary" v-if="payment_type == 'stripe'"><img src="../../assets/images/logo/stripe_logo.png" width="30%" class=""/></vs-button> -->
            <img src="../../assets/images/logo/paypal_logo.png" width="40%" class="mt-3" v-if="payment_type == 'paypal'"/>
            <!-- <vs-button class="w-100 mt-3" color="warning" v-if="payment_type == 'paypal'"><img src="../../assets/images/logo/paypal_logo.png" width="40%" class=""/></vs-button> -->
            <img src="../../assets/images/logo/btcpay_logo.png" width="40%" class="mt-3" v-if="payment_type == 'btcpay'"/>
            <!-- <vs-button class="w-100 mt-3" color="success" v-if="payment_type == 'btcpay'">BTCPAY</vs-button> -->
          </div>

          <div v-if="payment_type" class="mt-2 ml-2" style="color: dodgerblue;cursor:pointer; user-select: none" @click="initPaymentType()">Change payment method</div>
 
          <div class="mt-3">
            <vs-checkbox
              class="justify-content-start"
              size="small"
              v-model="subscribeEmailList"
              >Subscribe to our email list.</vs-checkbox>
          </div>
          <div class="mt-3" v-if="show_required">
            <div class="">
              <vs-checkbox
                class="justify-content-start"
                size="small"
                v-model="required_agreement"
                >{{agree_title}}</vs-checkbox>
                <div class="ml-5 mt-2" v-html="custom_agree_text" v-if="service_agreement.status == 'custom_agreement'"></div>
            </div>
            <label class="edit-button" size="small">Edit</label>
          </div>
        </vs-card>
      </vs-col>
      <vs-col vs-lg="3">
        <vs-card class="product-preview-item">
          <div
            class="checkout-image-div text-center"
            :style="{ 'background-image': cssthumbImageUrl }"
          ></div>
          <div >
            <div class="text-center p-3">
            <h3 class="mb-2 product-title" >{{selected_public_offer.name}}</h3>
              {{selected_public_offer.price}}{{selected_public_offer.currency | capitalize}}
            </div>
            <div class="overlay2" ></div>
          </div>
        </vs-card>

        <!-- 
          offer title 
          -->
        <!-- <div class="outline-edit mt-5" @click="changeSideMenu('offer-details')">
          <h2 class="">{{selected_public_offer.name}}</h2>          
          <label class="edit-button" size="small">Edit</label>
        </div> -->

        <!-- 
          insert a call to action 
          -->
        <div >
          <div v-html="htmlBody" class="mt-3 mb-3"></div>
          <label class="edit-button" size="small">Edit</label>
        </div>
        <!-- 
          testmonial section 
          -->          
          <br/>
        <div v-for="(testimonial, index) in testimonials" v-bind:key="index">
          <div >
            <h4 class="mt-3 mb-3">{{testimonials[index].title}}</h4>
            <label class="edit-button" size="small">Edit</label>
          </div>

          <div>
            <div class="testimonial-description  mx-1 my-1">
              {{testimonials[index].quote_text}}
            </div>
            <div class="d-flex mt-3 mx-1 mb-1" style="align-items:center">
              <vs-avatar size="large" :src="testimonials[index].avatar_img"></vs-avatar>
              <h4>{{testimonials[index].author_name}}</h4>
            </div>
            <label class="edit-button" size="small">Edit</label>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name : 'PreviewOfferCheckoutOld',
  data: ()=>({
    email: '',
    address1: '',
    phone_number: '',
    apt: '',
    city: '',
    fullname: '',
    confirmPW: '',
    createPW: '',
    country: '',
    region: '',
    zipcode:'',
    subscribeEmailList: false,
    required_agreement: false,
    custom_agreement: false,
    cssthumbImageUrl:'',
    agree_title: "",
    show_required: false,
    payment_type: 'stripe',

  }),

  watch: {
    service_agreement: function() {
      if (this.service_agreement.status !== undefined) {
        if (this.service_agreement.status !== 'not_required'){
          this.show_required = true
        }
        if (this.service_agreement.status == 'required') {
          this.agree_title = 'I have read read and agree to the terms and conditions of this page';
        } else if (this.service_agreement.status == 'custom_agreement'){
          this.agree_title = 'I have read read and agree to the terms and conditions of this page as follows';
        }
      }
    }
  },
  
  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"]
      }
    },

    notification_text:{
      get() {
        return this.$store.getters["notification_text"]
      }
    },
    custom_agree_text: {
      get() {
       return this.service_agreement.custom_agreement_text;
      }
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"]
      }
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"]
      }
    },

    status_got: {
      get () {
        return this.$store.getters["status_got"]
      }
    },

    offer_id: function() {
      var id = this.$route.params.offer_id
      return id.slice(0, id.length);
    },

    testimonials: {
      get() {
        return this.selected_public_offer.testimonials;
      }
    },

    service_agreement:{
      get() {
        return this.selected_public_offer.service_agreement;
      }
    },

    extra_contact_information: {
      get() {
        let temp_extra = {
          collect_name_password: false,
          collect_phone: false,
          collect_address: false,
        }
        if(this.selected_public_offer.extra_contact_information == undefined) {
          return temp_extra
        }
        else
          return this.selected_public_offer.extra_contact_information;
      }
    },

    htmlBody: {
      get() {
        return this.selected_public_offer.description
      }
    },


    selected_public_offer: function() {
      let offer = [];
      offer = this.$store.state.offerManage.current_public_offer;
       if(offer == undefined)
        return []
      else
        return offer;
    },
  },

  created() {
    // this.$store.dispatch('changeSideBar', true)
    this.initCheckoutPage();
  },

  methods: {
    initPaymentType(){
      this.payment_type = ''
    },
    changeSideMenu(menu_option){
      this.$store.dispatch('setCurrentCheckoutMenu', menu_option)
    },
    initCheckoutPage() {
      this.$store.dispatch('offerManage/getPublicOfferByID', this.offer_id).then(()=>{
        this.cssthumbImageUrl = "url(" + this.selected_public_offer.thumbnail +")";
        if (this.service_agreement.status == undefined)   {
          this.show_required = false
        }
        else {
          if (this.service_agreement.status != 'not_required'){
            this.show_required = true
          }
          if (this.service_agreement.status == 'required') {
            this.agree_title = 'I have read read and agree to the terms and conditions of this page';
          } else if (this.service_agreement.status == 'custom_agreement'){
            this.agree_title = 'I have read read and agree to the terms and conditions of this page as follows';
          }
        }
      })
    }    
  },

  filters: {
    capitalize: function(value) {
       if (value == undefined) return ''
       else
        return value.toUpperCase();
    }
  }
}
</script>
<style lang='scss'>
.product-preview-item.con-vs-card .vs-card--content{
  padding: 0;
  
}
.checkout-banner {
  height: 100px;
  width: 100%;
  /* margin-left: -20px; */
  /* margin-right: -20px; */
  background-color: dodgerblue;
}
.checkout-image-div{
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
  background-color:  rgba(98, 120, 243, 0.2);
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
  background-color: #2962FF;
  color: white;
  padding: 3px 10px;
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
  padding: .4rem;
}
.select-country select:focus {
  border: 1px solid rgba(var(--vs-primary),1)!important;
  -webkit-box-shadow: 0 3px 10px 0 rgba(0,0,0,.15);
    box-shadow: 0 3px 10px 0 rgba(0,0,0,.15);
}
</style>

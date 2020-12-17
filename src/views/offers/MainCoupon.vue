<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12">
      <div class="d-flex">
        <span class="ml-2 mt-2 primary-font" @click="backToOffers" style="cursor: pointer;"><i class="ti-angle-left" style="font-size: 14px;"></i> Offers</span>
        
      </div>
      <div class="mb-4 mt-4 d-flex"  style="justify-content: space-between;">
        <div class="d-flex">
          <h2>Coupon</h2>
          <i
            class="mdi mdi-help-circle-outline ml-1"
            style="color: #3b66ff; font-size: 22px"
          ></i>
        </div>
        <vs-button
          style="margin-left: auto; height: 45px"
          class="mr-3"
          @click="linkToNewCoupon"
          ><i class="mdi mdi-plus mr-2"></i>Add New Coupon</vs-button
        >
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
      <vs-card class="cardx" v-for="(coupon, index) in coupon_list" v-bind:key="index">
        <vs-row vs-align="center">
          <vs-col vs-lg="6">
            <div
              class="d-flex"
              style="justify-content: flex-start; align-items: center"
            >
              <div class="mr-3">
                <i
                  class="mdi mdi-ticket"
                  style="color: green; font-size: 22px"
                ></i>
              </div>
              <div>
                <h4 class="mb-1">{{coupon.code}}</h4>
                <div>{{offer_data[coupon.offer_id]}}</div>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="6" vs-align="center">
            <div
              class="d-flex"
              style="justify-content: flex-end; align-items: center"
            >
              <div class="text-right">
                <div>{{coupon.value}}% offer {{coupon.use_limit}}</div>
                <div>Valid Thru: {{coupon.end_on}}</div>
              </div>
              <div class="ml-3" @click ="linkToEditCoupon(coupon.id)" style="cursor: pointer">
                <i class="mdi mdi-pencil" style="font-size: 22px"></i>
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
  name: "MainCoupon",

  data: () => ({
    offer_data: {},
  }),

   /**
   * --------------computed part-------------
   */
  computed: {
    coupon_list: {
      get() {
        return this.$store.getters["couponManage/coupon_list"]
      }
    },
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

    offer_list: {
      get() {
        return this.$store.getters["offerManage/offer_list"];
      },
    },

  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch('changeSideBar', false)
    this.initCoupon();
  },
  /**
   * --------------method part-------------
   */
  methods: {
  /**
   * --------------get coupon list-------------
   */
    initCoupon: function() {
      this.$store.dispatch("offerManage/getOfferList", this.offer).then(
        () => {
          for( let i = 0; i < this.offer_list.length; i++) {
            this.offer_data[this.offer_list[i].id] = this.offer_list[i].name;
          }
        })
       .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon
          })
        })

      this.$store.dispatch('couponManage/getCouponList').then(
        () => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon
          })
        })
       .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon
          })
        }
      );

    },

    /**
   * -------------add new coupon -------------
   */

    linkToNewCoupon: function() {
      this.$router.push('/offers/new-coupon')

    },

  /**
   * --------------back to offers-------------
   */

    backToOffers: function() {
      this.$router.push('/offers')
    },

  /**
   * --------------link to Edit Coupon Details------------
   */
    linkToEditCoupon: function(coupon_id) {
      this.$router.push('/offers/edit-coupon/' + coupon_id)

    }
  },

};
</script>

<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12">
      <h5
        class="ml-2 mb-4 mt-2 primary-font"
        @click="backToCoupons"
        style="cursor: pointer;"
      >
        <i class="ti-angle-left" style="font-size: 14px;"></i> Coupons
      </h5>
      <div class="mb-4">
        <div class="d-flex">
          <h2>New Coupon</h2>
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
          <h3>Coupon Details</h3>
          <div class="mt-2">Coupons are final once created</div>
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
              label="Coupon Code"
              placeholder="Coupon Code Here..."
              v-model="coupon_code"
              class="w-100"
            />
            <vs-select
              class="w-100 mt-3"
              label="Discount type"
              v-model="discount_type"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in discount_types"
              />
            </vs-select>
            <div class="mb-2 mt-3 ml-2" style="font-weight: 600;">
              Select offer
            </div>
            <ModelSelect
              class="modelselect"
              :options="offer_list"
              v-model="selected_offer"
              placeholder="offer_list"
            >
            </ModelSelect>

            <vs-input
              v-if="discount_type === 1"
              label="Percent off"
              type="number"
              v-model="coupon_value"
              class="w-100 mt-3"
            />
            <vs-input
              v-else
              label="Amount off"
              type="number"
              v-model="coupon_value"
              class="w-100 mt-3"
            />

            <vs-select class="w-100 mt-3" label="Duration" v-model="duration">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in durations"
              />
            </vs-select>
            <label>
              How many months will this coupon last once applied to your
              customer? (This affects subscription and multipay payments)
            </label>
            <vs-input
              label="Valid Thru"
              type="date"
              v-model="valid_date"
              class="w-100 mt-3"
            />
            <label>
              Will be valid thru end of selected day in Pacific Time (US &
              Canada) timezone
            </label>
          </vs-card>
          <div style="float: right">
            <vs-button class="mt-3" @click.native="saveNewCoupon">Save</vs-button>
          </div>
        </vs-col></vs-row
      >
    </vs-col>
  </vs-row>
</template>
<script>
import { ModelSelect } from "vue-search-select";
import Coupon from "../../models/coupon";
export default {
  name: "CouponInput",
  components: {
    ModelSelect,
  },

  data: () => ({
    coupon_code: "",
    discount_type: 0,
    discount_types: [
      { text: "amount_off", value: 0 },
      { text: "percent_off", value: 1 },
    ],
    coupon_value: 0,
    coupon: new Coupon("", ""),
    durations: [
      { text: "Once", value: 0 },
      { text: "Multi-month", value: 1 },
      { text: "Forever", value: 2 },
    ],
    duration: 0,
    valid_date: "",
    selected_offer: "",
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

    offer_list: {
      get() {
        let offerList = [];
        let list = [];
        list = this.$store.getters["offerManage/offer_list"];
        for (let i = 0; i < list.length; i++) {
          offerList.push({ text: list[i].name, value: list[i].id });
        }

        return offerList;
      },
    },
  },

  /**
   * --------------watch part-------------
   */

  watch: {
    // selected_offer: function(newValue, oldValue) {
    // }
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.initCouponParameter();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    backToCoupons: function() {
      this.$router.push("/offers/coupon");
    },

    /**
     * --------------init coupon parameter------------
     */

    initCouponParameter: function() {
      this.$store
        .dispatch("offerManage/getOfferList", this.offer)
        .then(() => {})
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    /**
     * --------------init coupon parameter------------
     */
    saveNewCoupon() {
      this.coupon.code = this.coupon_code;
      this.coupon.offer_id = this.selected_offer;
      this.coupon.discount_type = this.discount_types[this.discount_type].text;
      this.coupon.end_on = this.valid_date;
      this.coupon.use_limit = this.duration;
      this.coupon.value = this.coupon_value;
      this.$store
        .dispatch("couponManage/addCoupon", this.coupon)
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

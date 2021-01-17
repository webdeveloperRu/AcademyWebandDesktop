<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToMainCoupon"
          style="cursor: pointer;"
        >
          <i class="ti-angle-left" style="font-size: 14px;"></i> Coupon
        </span>
        <div class="d-flex mt-3">
          <h2>{{ selected_coupon.code }}</h2>
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
      <vs-card>
        <h3>Coupon Details</h3>
        <vs-row class="mt-4">
          <vs-col vs-lg="4" class="mb-4">
            <div>Discount Type</div>
            <h5 class="mt-1 strong-font">
              {{ selected_coupon.discount_type }}
            </h5>
          </vs-col>
          <vs-col
            vs-lg="4"
            v-if="selected_coupon.discount_type === 'percent_off'"
          >
            <div>Percent off</div>
            <h5 class="mt-1 strong-font">{{ selected_coupon.value }}%</h5>
          </vs-col>
          <vs-col vs-lg="4" v-else>
            <div>amount off</div>
            <h5 class="mt-1 strong-font">${{ selected_coupon.value }} USD</h5>
          </vs-col>
          <vs-col vs-lg="4">
            <div>Quatity</div>
            <h5 class="mt-1 strong-font">0</h5>
          </vs-col>
          <vs-col vs-lg="4" class="mb-3">
            <div>Duration</div>
            <h5 class="mt-1 strong-font">
              {{ durations[selected_coupon.use_limit].text }}
            </h5>
          </vs-col>
          <vs-col vs-lg="8">
            <div>Valid Thru</div>
            <h5 class="mt-1 strong-font">{{ selected_coupon.end_on }}</h5>
          </vs-col>
        </vs-row>
      </vs-card>
      <vs-card class="add-product-offer">
        <vs-row class="m-0">
          <vs-col vs-sm="12">
            <h4 class="text-left m-4">Included Offers</h4>
          </vs-col>
          <vs-col
            vs-sm="12"
            style="padding: 20px 40px 8px 40px; background-color: #f1f1f1"
          >
            <vs-card
              class="my-0 mb-3"
              v-for="(offer, index) in included_offers"
              :key="index"
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div>
                  <h4>{{ offer.name }}</h4>
                  <div class="mt-2">
                    {{ offer.price }} {{ offer.currency | capitalize }}
                  </div>
                </div>
                <div class="d-flex">
                  <div>
                    <i class="mdi mdi-checkbox-multiple-blank-outline mr-2"></i
                    >Discount link
                  </div>
                  <!-- <div class="ml-3"><i class="mdi mdi-close"></i></div> -->
                </div>
              </div>
            </vs-card>
          </vs-col>
          <!-- <vs-col vs-sm="12">
            <h5 class="text-left m-4"><i class="mdi mdi-plus"></i>Add Offer</h5>
            <multiselect
              v-model="selected_tag"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="code"
              :options="tag_list"
              :multiple="true"
              :taggable="true"
            ></multiselect>
          </vs-col> -->
          <!-- <vs-col vs-sm="12" class="mb-5">
            <h5 class="text-left m-4">Select Offer</h5>
            <vs-select
                class="w-100 px-4"
                v-model="selected_offer"
                >
              <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in offerList" />
            </vs-select>
          </vs-col> -->
        </vs-row>
      </vs-card>
      <div style="float: right">
        <vs-button
          class="mt-3"
          type="flat"
          color="danger"
          @click.native="activeConfirmDeletCoupon = true"
          >Delete Coupon</vs-button
        >
      </div>
    </vs-col>
    <!-- 
      @@ delete coupon confirm
     -->
    <vs-popup
      class="subuser-delete primary-font"
      title="Are you sure?"
      :active.sync="activeConfirmDeletCoupon"
    >
      <br />
      <br />
      <h3 class="ml-5">Are you sure to delete this coupon?</h3>
      <br />
      <br />

      <div style="float: right" class="m-3">
        <vs-button
          color="primary"
          type="flat"
          @click="activeConfirmDeletCoupon = false"
          >Cancel</vs-button
        >
        <vs-button
          color="danger"
          type="filled"
          class="ml-2"
          @click.native="deleteCurrentCoupon"
          >Delete Coupon</vs-button
        >
      </div>
    </vs-popup>
  </vs-row>
</template>
<script>
// import Multiselect from "vue-multiselect";
export default {
  name: "CouponInfo",
  components: {
    // Multiselect
  },

  data: () => ({
    coupon_code: "",
    discount_type: 0,
    discount_types: [
      { text: "Amount Off", value: 0 },
      { text: "Percent Off", value: 1 },
    ],
    percent_off: null,
    durations: [
      { text: "Once", value: 0 },
      { text: "Multi-month", value: 1 },
      { text: "Forever", value: 2 },
    ],
    duration: 0,
    valid_date: "",
    tag_list: [],
    selected_tag: [],
    included_offers: [],
    offerList: [],
    activeConfirmDeletCoupon: false,
  }),
  /**
   * --------------computed part-------------
   */
  computed: {
    offer_list: {
      get() {
        return this.$store.getters["offerManage/offer_list"];
      },
    },

    coupon_list: {
      get() {
        return this.$store.getters["couponManage/coupon_list"];
      },
    },
    selected_coupon: {
      get() {
        var id = this.$route.params.coupon_id;
        var coupon = [];
        id = id.slice(1, id.length);
        for (var i = 0; i < this.coupon_list.length; i++) {
          if (this.coupon_list[i].id == id) {
            coupon = this.coupon_list[i];
          }
        }
        return coupon;
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
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.initCoupon();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    initCoupon() {
      this.selected_offer = this.selected_coupon.offer_id;
      for (let i = 0; i < this.offer_list.length; i++) {
        if (this.offer_list[i].id == this.selected_coupon.offer_id)
          this.included_offers.push(this.offer_list[i]);
        this.offerList[i] = {
          value: this.offer_list[i].id,
          text: this.offer_list[i].name,
        };
      }
    },

    backToMainCoupon() {
      this.$router.push("/offers/coupon");
    },

    deleteCurrentCoupon() {
      this.$store
        .dispatch("couponManage/deleteCouponByID", this.selected_coupon.id)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$router.push("/offers/coupon");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.activeConfirmDeletCoupon = false;
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
.add-product-offer > .vs-card--content {
  padding: 0;
}
</style>

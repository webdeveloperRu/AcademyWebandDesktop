<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="10"
      vs-sm="12"
      code-toggler
    >
      <vs-row>
        <div class="ml-3 mb-4">
          <div class="d-flex">
            <h2>Offers</h2>
            <i
              class="mdi mdi-help-circle-outline ml-1"
              style="color: #3b66ff; font-size: 22px"
            ></i>
          </div>
          <div class="d-flex">
            <h5
              class="ml-2 mt-2"
              @click="linkToCouponPage"
              style="cursor: pointer; font-size: 14px"
            >
              <i class="mdi mdi-ticket"></i> Coupons
            </h5>
            <h5
              class="ml-2 mt-2"
              @click="linkToPayment"
              style="cursor: pointer; font-size: 14px"
            >
              <i class="mdi mdi-currency-usd"></i> Payments
            </h5>
          </div>
        </div>
        <vs-button
          style="margin-left: auto; height: 45px"
          class="mt-3 mr-3"
          @click.native="activeAddOffer = true"
          ><i class="mdi mdi-plus mr-2"></i>Add New Offer</vs-button
        >
      </vs-row>
    </vs-col>
    <!-- 
      ***@ --------main part---------------
     -->
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="10"
      vs-sm="12"
      code-toggler
    >
      <vs-card class="cardx">
        <vs-row vs-justify="center" vs-align="center">
          <vs-col vs-w="4" style="text-align: center">
            <div>
              <h2 class="mb-2">{{ offer_purchases }}</h2>
              <h5 class="mb-1">Purchases</h5>
              <span class="description-font">Last 30 days</span>
            </div>
          </vs-col>
          <vs-col vs-w="4" style="text-align: center">
            <div>
              <h2 class="mb-2">${{ net_revenue30 }}</h2>
              <h5 class="mb-1">Net Revenue</h5>
              <span class="description-font">Last 30 days</span>
            </div>
          </vs-col>
          <vs-col vs-w="4" style="text-align: center">
            <div>
              <h2 class="mb-2">${{ net_revenueall }}</h2>
              <h5 class="mb-1">Net Revenue</h5>
              <span class="description-font">All time</span>
            </div>
          </vs-col>
        </vs-row>
      </vs-card>
      <vs-card class="cardx">
        <div slot="header">
          <h5>Published</h5>
        </div>

        <!-- 
          ***@ --------offers data show part start---------------
        -->
        <div class="table-responsive">
          <vs-table
            max-items="5"
            search
            pagination
            hoverFlat
            :data="offer_list"
            class="offer_data_table"
          >
            <template slot="thead">
              <vs-th class="offer-th"></vs-th>
              <vs-th class="offer-th" sort-key="title">TITLE</vs-th>
              <vs-th class="offer-th" sort-key="product">PRODUCTS</vs-th>
              <vs-th class="offer-th" sort-key="price">PRICE</vs-th>
              <vs-th class="offer-th" sort-key="net_revenue">NET REVENUE</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr
                :key="indextr"
                v-for="(tr, indextr) in data"
                class="offer-row"
              >
                <vs-td class="offer-th">
                  <div
                    class="offer-thumbnail-field"
                    id="offerviewfield"
                    :style="{
                      'background-image': getImageUrl(data[indextr].thumbnail),
                    }"
                  ></div>
                </vs-td>
                <vs-td class="offer-th" :data="data[indextr].name">
                  <div class="offer-name" @click="editOffer(data[indextr].id)">
                    {{ data[indextr].name }}
                  </div>
                </vs-td>

                <vs-td class="offer-th" :data="data[indextr].products.length">
                  {{ data[indextr].products.length }}
                </vs-td>

                <vs-td class="offer-th" :data="data[indextr].price">
                  {{ data[indextr].price }} ({{
                    data[indextr].currency | capitalize
                  }})
                </vs-td>

                <vs-td class="offer-th" :data="data[indextr].net_revenue">
                  {{ data[indextr].net_revenue }}
                </vs-td>
                <vs-td>
                  <div class="offer-action-icon">
                    <i
                      class="mdi mdi-check-circle mr-4"
                      style="font-size: 16px"
                      :style="
                        data[indextr].status == 'published'
                          ? 'color: #08800c;'
                          : ''
                      "
                      @mouseover="onCheckIconMouseOver"
                      @click="onCheckIconClick"
                    ></i>
                    <a
                      :href="getUrl(data[indextr].id)"
                      target="_blank"
                      class="preview-checkout"
                    >
                      <i
                        class="mdi mdi-eye mr-4 product-processing-icon"
                        style="font-size: 16px"
                        @mouseover="onViewIconMouseOver"
                      ></i>
                    </a>

                    <i
                      class="mdi mdi-pencil mr-4 product-processing-icon"
                      style="font-size: 16px"
                      @mouseover="onEditIconMouseOver"
                      @click="editOffer(data[indextr].id)"
                    ></i>
                    <i
                      class="mdi mdi-chart-bar mr-4 product-processing-icon"
                      style="font-size: 16px"
                      @mouseover="onChartIconMouseOver"
                      @click="linkToOfferStats(data[indextr].id)"
                    ></i>
                    <vs-dropdown vs-trigger-click>
                      <i
                        class="mdi mdi-dots-horizontal product-processing-icon mr-2"
                        style="font-size: 16px"
                      ></i>
                      <vs-dropdown-menu>
                        <!-- web hook -->
                        <vs-dropdown-item>
                          <div
                            class="ml-3 mr-3 primary-font"
                            style="font-size: 16px"
                            @click="editCheckout(data[indextr].id)"
                          >
                            Checkout
                          </div>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <!-- 
          ***@ --------offers data show part end---------------
        -->

        <!-- 
          ***@ --------offer items records---------------
        -->
        <div class="ml-3">
          <p class="offer-records">
            <span style="font-weight: 500">{{ offer_records }}</span> Offers
          </p>
        </div>
      </vs-card>
    </vs-col>
    <!-- 
      ***@  --------add offer ---------------
     -->
    <vs-popup
      color="success"
      :active.sync="activeAddOffer"
      title="New Offer"
      class="offer-new-pop"
    >
      <vs-row class="px-5">
        <vs-col>
          <h5 class="mt-2">Title</h5>
          <vs-input v-model="offerTitle" class="w-100 mt-2 mb-1"></vs-input>
          <span
            >The name of your Offer, It can be the name of one of the products
            you are selling or something fun and catchy.</span
          >
          <h5 class="mt-2">Internal Title</h5>
          <vs-input v-model="internalTitle" class="w-100 mt-2 mb-1"></vs-input>

          <h5 class="mt-3 mb-2">Product</h5>
          <Multiselect
            v-model="selectedOfferProduct"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a product"
            label="name"
            track-by="code"
            :options="products"
            :multiple="true"
            :taggable="true"
          ></Multiselect>
          <span>Which product would you like to sell with this offer</span>
          <h5 class="mt-3 mb-2">Price</h5>
          <vs-row>
            <vs-col vs-lg="8" class="mr-0 pr-0">
              <vs-input
                v-model="offerPrice"
                type="number"
                class="new-offer-price w-100"
              ></vs-input>
            </vs-col>
            <vs-col vs-lg="4" class="ml-0 pl-0">
              <vs-select
                class="new-currency-type w-100"
                v-model="selected_currency"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in currencyOptions"
                />
              </vs-select>
            </vs-col>
          </vs-row>

          <div class="d-flex mt-5">
            <vs-button
              color="dark"
              type="border"
              class="save-cancel-button"
              style="margin-left: auto"
              @click.native="activeAddOffer = false"
              >Cancel</vs-button
            >
            <vs-button class="ml-3 mr-3 save-cancel-button" @click.native="addOffer"
              >Save</vs-button
            >
          </div>
        </vs-col>
      </vs-row>
    </vs-popup>
  </vs-row>
</template>

<script>
import Offers from "../../models/offers";
import Multiselect from "vue-multiselect";
export default {
  name: "OffersPage",
  components: {
    Multiselect,
  },

  data: () => ({
    offer: new Offers("", ""),
    searchOfferItem: "",
    activeAddOffer: false,
    offerTitle: "",
    offerPrice: "",
    selectedOfferProduct: "",
    products: [],
    paginationtable: false,
    selected_currency: 0,
    offer_products: [],
    offer_purchases: 0,
    net_revenue30: 0,
    net_revenueall: 0,
    internalTitle: "",
    currencyOptions: [
      {
        text: "USD",
        currency: "usd",
        value: 0,
      },
      {
        text: "EUR",
        currency: "eur",
        value: 1,
      },
      {
        text: "GBP",
        currency: "gbp",
        value: 2,
      },
    ],
  }),

  computed: {
    offer_records: function() {
      return this.offer_list.length;
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

    offer_list: {
      get() {
        return this.$store.getters["offerManage/offer_list"];
      },
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    offer_stats: {
      get() {
        return this.$store.state.offerManage.offer_stats;
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.initProducts();
  },

  methods: {
    linkToCouponPage() {
      this.$router.push("/offers/coupon");
    },
    /*
     ** Init products
     */
    initProducts() {
      for (let i = 0; i < this.product_list.length; i++) {
        this.products[i] = {
          name: this.product_list[i].title,
          code: this.product_list[i].id,
        };
      }
      this.getOfferList();
      this.getPeopleList();
    },
    /*
     ** View Edit item hover processing
     */
    getPeopleList() {
      this.$store
        .dispatch("peopleManage/getPeopleList")
        .then(() => {
          // this.$vs.notify({
          //   color: this.notification_color,
          //   text: this.notification_text,
          //   icon: this.notification_icon,
          // });
          // this.peopleTags = this.tag_name_list;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },
    /*
     ** get offers list
     */

    getOfferList() {
      this.$store
        .dispatch("offerManage/getOfferList")
        .then(() => {
          this.getPurchaseAndNetrevenue();
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

    /*
     ** Check Offer item hover processing
     */
    onCheckIconMouseOver() {
      // alert('icon hover')
    },

    /*
     ** Check Offer item click processing
     */
    onCheckIconClick() {
      // alert("check icon clicked");
    },

    /*
     ** View Offer item hover processing
     */
    onViewIconMouseOver() {},

    /*
     ** View Offer item hover processing
     */
    previewOfferCheckout(offer_id) {
      this.$router.push("/offers/" + offer_id + "/checkout");
    },

    getUrl(offer_id) {
      return "/offers/" + offer_id + "/checkout";
    },

    /*
     ** View Edit item hover processing
     */
    onEditIconMouseOver() {},

    /*
     ** View Edit item hover processing
     */
    editOffer(offer_id) {
      this.$router.push("/offers/edit-offer/" + offer_id);
    },

    /*
     ** View Cahrt item hover processing
     */
    onChartIconMouseOver() {},

    /*
     ** View Chart item click processing
     */
    linkToOfferStats(offer_id) {
      this.$router.push("/offers/offer-stats/" + offer_id);
    },
    /*
     ** View Chart item click processing
     */
    onClickOfferView() {
      // this.$router.push('/offers/edit-offer:' + offer_id )
    },

    /*
     ** View Chart item click processing
     */
    linkToPayment() {
      this.$router.push("/offers/payments");
    },
    /*
     ** Add New Offer
     */
    addOffer() {
      let selectedProducts = [];
      this.offer_products[0] = this.selectedOfferProduct;
      this.offer.title = this.offerTitle;
      for (let i = 0; i < this.selectedOfferProduct.length; i++) {
        selectedProducts.push(this.selectedOfferProduct[i].code);
      }
      this.offer.products = selectedProducts;
      this.offer.description = "";
      this.offer.price = this.offerPrice;
      this.offer.end_on = null;
      this.offer.intern_title = this.internalTitle;
      this.offer.currency = this.currencyOptions[
        this.selected_currency
      ].currency;
      if (this.offerTitle == "") {
        this.$vs.notify({
          color: this.$custom_warning,
          icon: "warning",
          text: "Offer title must be filled",
        });
        return;
      }
      if (this.internalTitle == "") {
        this.$vs.notify({
          color: this.$custom_warning,
          icon: "warning",
          text: "Internal title must be filled",
        });
        return;
      }
      this.$store
        .dispatch("offerManage/addOffer", this.offer)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.selectedOfferProduct = "";
          this.offerTitle = "";
          this.offerPrice = "";
          this.selected_currency = 0;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.activeAddOffer = false;
    },

    editCheckout(offer_id) {
      this.$store.dispatch("changeSideBar", 'checkout');
      this.$store.dispatch("setCurrentCheckoutMenu", "home");
      this.$store.dispatch("updateSidebarWidth", "checkout");
      this.$router.push("/offers/edit-checkout/" + offer_id);
    },

    getImageUrl(url) {
      return "url(" + url + ")";
    },

    getPurchaseAndNetrevenue() {
      for (let i = 0; i < this.offer_list.length; i++) {
        this.$store
          .dispatch("offerManage/getOfferStats", [this.offer_list[i].id, 30])
          .then(() => {
            this.net_revenue30 += this.offer_stats[
              this.offer_list[i].id
            ].netRevenueCustom;
            this.net_revenueall += this.offer_stats[
              this.offer_list[i].id
            ].netRevenueAllTime;
            this.offer_purchases += this.offer_stats[
              this.offer_list[i].id
            ].total_purchases;
          });

        //  .catch(() => {
        //    this.$vs.notify({
        //       color: this.notification_color,
        //       text: this.notification_text,
        //       icon: this.notification_icon
        //     })
        //   });
      }
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
<style lang="scss">
.ps {
  height: 100px;
}

.offer_data_table {
  color: #6c757d;
  .vs-table--search {
    width: 100%;
    max-width: 100%;
  }
  .vs-table--search-input {
    width: 100%;
    border-radius: 5px;
    border-color: #cccccc;
    &:focus {
      border-color: #5d5d5d;
    }
  }
}

.offer-row {
  height: 30px;
  font-size: 14px;
  border: 2px solid #eeeeee;
  border-left: none;
  border-right: none;
}
.offer-row:hover {
  cursor: pointer;
  font-weight: 600;
}
.offer-row td {
  font-weight: 600;
  text-align: center;
}
.offer-th .vs-table-text {
  justify-content: center;
}
vs-th {
  justify-content: center;
}
.offer-records {
  color: #6c757d;
  font-size: 16px;
  font-weight: 500;
}
.offer-view-img {
  width: 80px;
  height: 45px;
}

.offer-action-icon .product-processing-icon:hover {
  color: #08800c;
}

.vs-table--pagination {
  width: 99%;
}

// .offer-new-pop .multiselect__content-wrapper {
//   max-height: 165px !important;
// }

.offer-new-pop .vs-popup--content {
  height: 450px;
}
.new-offer-price .vs-input--input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 38px;
}

.new-currency-type .vs-select--input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 38px;
}
.offer-name:hover {
  text-decoration: underline;
}

#offerviewimage {
  width: auto;
  height: 100%;
}
#offerviewfield {
  width: 100px;
  height: 56.25px;
  overflow: hidden;
}
.offer-thumbnail-field {
  // border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.preview-checkout {
  color: grey;
}
.offer-action-icon a:hover {
  color: #08800c;
}
</style>

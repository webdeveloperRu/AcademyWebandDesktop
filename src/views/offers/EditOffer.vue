<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col vs-lg="10" vs-xs="12" vs-sm="12">
        <span
          @click="backToOffer"
          class="ml-2 mb-5 mt-2 primary-font"
          style="cursor:pointer"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Offers</span
        >
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="10"
        vs-xs="12"
        vs-sm="12"
        class="mb-3"
      >
        <h2 class="ml-2 mb-2 mt-2">{{ selected_offer.name }}</h2>
        <div style="font-size: 14px" class="ml-2">
          <span
            class="mr-3 primary-font"
            style="cursor: pointer"
            @click="linkToOfferStats"
            ><i class="mdi mdi-chart-bar" style="font-size: 14px"></i>
            Stats</span
          >
          <span
            class="mr-3 primary-font"
            style="cursor: pointer"
            @click="linkToCheckout"
            ><i class="mdi mdi-cart" style="font-size: 14px"></i> Edit
            Checkout</span
          >
          <!-- <a
            :href="getUrl(selected_offer.id)"
            target="_blank"
            class="preview-checkout"
          > -->
            <span class="mr-3 primary-font" style="cursor: pointer"
              @click="getUrl(selected_offer.id)"><i class="mdi mdi-eye" style="font-size: 14px" ></i> Preview</span
            >
          <!-- </a> -->
          <span
            class="mr-3 primary-font"
            style="cursor: pointer"
            @click="getLinkPopup = true"
            ><i class="mdi mdi-link" style="font-size: 14px"></i> Get Link</span
          >
          <!-- <span class="primary-font" style="cursor: pointer"> More Actions <i class="mdi mdi-menu-down mr-2 ml-2" style="font-size: 14px"></i></span> -->
          <vs-dropdown vs-trigger-click>
            <span class="ml-3 primary-font">
              More Actions <i class="mdi mdi-menu-down mr-2 ml-2"></i
            ></span>
            <vs-dropdown-menu>
              <!-- web hook -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 primary-font"
                  style="font-size: 14px"
                  @click="webhookPopup = true"
                >
                  Webhooks
                </div>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="7"
        vs-xs="12"
        vs-sm="8"
        code-toggler
      >
        <!-- 
      @@  main part
       -->
        <vs-card class="primary-font">
          <!--  title -->
          <vs-row class="">
            <vs-col vs-sm="12">
              <vs-input
                class="inputx w-100"
                label="Title"
                placeholder="Offer title here..."
                v-model="offer_title"
              />
            </vs-col>
          </vs-row>

          <!--  internal title -->

          <vs-row class="mt-4">
            <vs-col vs-sm="12">
              <vs-input
                class="inputx w-100"
                placeholder="Internal offer title here..."
                v-model="internal_title"
                label="Internal title"
              />
            </vs-col>
          </vs-row>

          <!--  price-->
          <label class="mt-4">Price</label>
          <vs-row>
            <vs-col vs-lg="8" class="mr-0 pr-0">
              <vs-input
                v-model="offer_price"
                type="number"
                class="edit-offer-price w-100"
              ></vs-input>
            </vs-col>
            <vs-col vs-lg="4" class="ml-0 pl-0">
              <vs-select
                class="edit-currency-type w-100"
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

          <!--  description -->
          <vs-row class="mt-4">
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <label>Description</label>
            </vs-col>
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <VueEditor v-model="offer_body"></VueEditor>
            </vs-col>
          </vs-row>
        </vs-card>

        <vs-card class="add-product-offer primary-font">
          <vs-row class="m-0">
            <vs-col vs-sm="12">
              <h4 class="text-left m-4">Included Products</h4>
            </vs-col>
            <vs-card
              class="my-0 mb-3"
              v-for="id in selected_offer.products"
              :key="id"
            >
              <div
                style="display: flex; justify-content: space-between"
                v-if="products[id] != null"
              >
                <div>
                  <i class="mdi mdi-tag-outline mr-2"></i>{{ products[id] }}
                </div>
                <div
                  @click="confirmRemoveProductForOffer(id)"
                  class="remov-product"
                >
                  <i class="mdi mdi-close" style="cursor: pointer;"></i>
                </div>
              </div>
            </vs-card>
            <vs-col vs-sm="12">
              <h5 class="text-left m-4">
                <i
                  class="mdi mdi-plus"
                  style="cursor: pointer;"
                  @click="showSelectProduct"
                ></i
                >Add Product
              </h5>
              <Multiselect
                v-model="selected_product"
                placeholder="Search or add a product..."
                label="name"
                track-by="code"
                :options="possibleProducts"
                v-if="visibleSelectProduct"
              ></Multiselect>
            </vs-col>
          </vs-row>
        </vs-card>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="3"
        vs-xs="12"
        vs-sm="4"
        code-toggler
      >
        <!-- 
      @@ Status part
       -->

        <!-- <vs-card class="p-3 primary-font">
          <div class="d-flex">
            <div class="">
              <vs-radio
                v-model="offer_status"
                vs-name="published"
                vs-value="published"
                >Published</vs-radio
              >
              <vs-radio v-model="offer_status" vs-name="published" vs-value="draft"
                >draft</vs-radio
              >
            </div>
          </div>
        </vs-card> -->

        <!-- 
        @@ thumb nail part
       -->

        <vs-card class="primary-font">
          <div
            class="image-aspect-ratio  "
            :style="{ 'background-image': cssthumbImageUrl }"
          ></div>
          <div
            class="d-flex align-items-center mt-2 file-select"
            style="justify-content: center"
          >
            <vs-dropdown vs-trigger-click>
              <vs-button
                class="btn-drop"
                type="border"
                icon="expand_more"
                color="#5c6369"
                >Select Image</vs-button
              >
              <vs-dropdown-menu>
                <vs-dropdown-item>
                  <label class="thumbnail-select-button text-center">
                    <input
                      type="file"
                      @change="onSelect"
                      style="overflow: hidden"
                      class="custom-file-input"
                      accept="image/png, image/jpeg"
                    />
                    <h6>Upload Image</h6>
                  </label>
                </vs-dropdown-item>
                <vs-dropdown-item class="remove-thumb-menu">
                  <div
                    @click="onClickRemoveImage"
                    color="danger"
                    class="text-center"
                  >
                    <h6 style="color: red">Remove Image</h6>
                  </div>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <br />
          Recommended dimensions of
          <b>1280<i class="mdi mdi-close"></i>720</b>.
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col vs-lg="10" vs-xs="12" vs-sm="12">
        <div class="btn-alignment text-right">
          <vs-button
            color="danger"
            type="flat"
            @click.native="deleteOfferConfirm = true"
            >Delete Offer</vs-button
          >
          <vs-button color="primary" type="filled" @click.native="saveCurrentOffer"
            >Save</vs-button
          >
        </div>
      </vs-col>
    </vs-row>
    <!-- 
      @@ delete offer popup
     -->
    <vs-popup title="Delete this Offer?" :active.sync="deleteOfferConfirm">
      <br /><br /><br />
      <h5>
        Are you sure you want to delete this offer?
      </h5>
      <br /><br /><br />
      <div class="btn-alignment text-right">
        <vs-button
          color="primary"
          type="flat"
          @click.native="deleteOfferConfirm = false"
          >Cancel</vs-button
        >
        <vs-button color="danger" type="filled" @click.native="deleteCurrentOffer"
          >Delete Offer</vs-button
        >
      </div>
    </vs-popup>

    <!-- 
      @@ web hook popup
     -->
    <vs-popup title="Webhook URL" :active.sync="webhookPopup">
      <!-- <h4 class="mt-3">Inbound Webhooks</h4> -->
      <!--
        Activation URL
        -->
      <!-- <label class="mt-3">Activation URL</label>
      <div
        class="d-flex"
        style="align-items: center; justify-content: center"
      >
        <vs-input v-model="activation_url" disabled class="w-100"/>
        <button style="outline: none; border: none; padding: 7px">
          Copy
        </button>
      </div>
      <label class="ml-1 text-muted">Required parameters are: name, email and external_user_id </label>
      <br> -->

      <!--
        Deactivation URL
        -->
      <!-- <label class="mt-3">Deactivation URL</label>
      <div
        class="d-flex"
        style="align-items: center; justify-content: center"
      >
        <vs-input v-model="deactivation_url" disabled class="w-100"/>
        <button style="outline: none; border: none; padding: 7px">
          Copy
        </button>
      </div>
      <label class="ml-1 text-muted">Required parameters are: name, email and external_user_id </label>
      <h4 class="mt-3">Outbound Webhooks</h4> -->
      <!-- <label class="mt-3">Purchase webhook URL</label> -->
      <vs-input v-model="purchase_webhook" class="w-100 mb-5 mt-5"></vs-input>
      <div class="btn-alignment text-right">
        <vs-button color="primary" type="filled" @click.native="saveWebhook"
          >Save</vs-button
        >
      </div>
    </vs-popup>

    <!-- 
      @@ get link popup
     -->
    <vs-popup title="Get Link" :active.sync="getLinkPopup">
      <!--
        Activation URL
        -->
      <br />
      <label class="mt-3"
        >Share the link below with your users to send them to this page</label
      >
      <div
        class="d-flex w-100"
        style="align-items: center; justify-content: center"
      >
        <div v-html="external_link_url" class="w-100 external-link"></div>
        <div
          v-clipboard:copy="external_link_url"
          class="external-link-copy"
          @click="copyToClipBoard"
        >
          Copy
        </div>
      </div>
      <br />
      <br />
      <br />
    </vs-popup>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Multiselect from "vue-multiselect";

export default {
  name: "ProductEditPostDetail",
  components: {
    VueEditor,
    Multiselect,
  },
  data: () => ({
    offer_title: "",
    internal_title: "",
    offer_body: "",
    offer_price: 0,
    offer_status: "",
    products: {},
    selected_product: "",
    addedProduct: 0,
    removeProductID: "",
    possibleProducts: [],
    deleteOfferConfirm: false,
    thumbNail: Object,
    thumbImageUrl: "",
    cssthumbImageUrl: "",
    changedThumbNail: "",
    visibleProduct: true,
    loadedProducts: 0,
    visibleSelectProduct: false,
    getLinkPopup: false,
    external_link_url: "https://app.videocourse.app/offers/",
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
    selected_currency: 0,
    webhookPopup: false,
    purchase_webhook: "",
    // activation_url: 'https://github.com/bearwhite0330',
    // deactivation_url: 'https://github.com/bearwhite0330',
  }),

  watch: {
    selected_product: function() {
      this.confirmAddProductForOffer();
    },
  },

  computed: {
    offer_id: function() {
      var id = this.$route.params.offer_id;
      return id.slice(0, id.length);
    },

    selected_offer: function() {
      let offer = [];
      offer = this.$store.state.offerManage.current_offer;
      if (offer == undefined) return [];
      else return offer;
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
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

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.setOfferItem(this.offer_id);
    var getUrl = window.location;
    this.external_link_url =
      getUrl.protocol + "//" + getUrl.host + "/offers/" + this.offer_id + "/checkout";
  },

  methods: {
    showSelectProduct() {
      this.visibleSelectProduct = true;
    },

    backToOffer() {
      this.$router.push("/offers");
    },
    /**
     * remove Product for offer confirm
     **/
    confirmRemoveProductForOffer(id) {
      this.removeProductID = id;
      if (this.selected_offer.products.length == 1) {
        // this.$vs.dialog({
        //   color: 'danger',
        //   title: `You can't remove this product` ,
        //   text: 'Offer must have at least one product',
        // })
        this.$vs.notify({
          color: "#ff3300",
          // title: "Product should be required",
          text: "At least one product should be required",
          icon: "warning",
        });
      } else {
        this.$vs.dialog({
          type: "confirm",
          color: "primary",
          title: `Please confirm to add Product`,
          text: "Add to this product to this offer?",
          accept: this.removeProductForOffer,
        });
      }
    },
    /**
     * remove Product for offer
     **/

    removeProductForOffer() {
      for (let i = 0; i < this.selected_offer.products.length; i++) {
        if (this.selected_offer.products[i] == this.removeProductID) {
          this.selected_offer.products.splice(i, 1);
          this.updateOffer();
          this.addedProduct--;
        }
      }
    },

    /**
     * confirm add  Product for offer
     **/

    confirmAddProductForOffer() {
      this.$vs.dialog({
        type: "confirm",
        color: "primary",
        title: `Please confirm to add Product`,
        text: "Add to this product to this offer?",
        accept: this.addProductForOffer,
      });
    },

    /**
     * add Product for offer
     **/

    addProductForOffer() {
      for (let i = 0; i < this.selected_offer.products.length; i++) {
        if (this.selected_offer.products[i] == this.selected_product.code) {
          this.$vs.notify({
            color: "primary",
            title: "Add Product",
            text: "Product already added",
          });
          return;
        }
      }
      this.products[this.selected_product.code] = this.selected_product.name;
      this.selected_offer.products.push(this.selected_product.code);
      this.loadedProducts++;
      this.addedProduct++;
      this.visibleSelectProduct = false;
      this.updateOffer();

    },

    /**
     * update offer
     **/
    updateOffer() {
      this.selected_offer.title = this.offer_title;
      this.selected_offer.description = this.offer_body;
      this.selected_offer.price = this.offer_price;
      this.selected_offer.intern_title = this.internal_title;
      this.selected_offer.currency = this.currencyOptions[
        this.selected_currency
      ].currency;
      if (this.selected_offer.title === "") {
        this.$vs.notify({
          color: this.$custom_warning,
          text: "Offer title must be filled",
          icon: "warning",
        });
        return;
      }
      this.$store
        .dispatch("offerManage/updateOfferByID", this.selected_offer)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.webhookPopup = false;
          this.purchase_webhook = "";
          if (this.status_got != true) {
            this.$store
              .dispatch("offerManage/getOfferByID", this.offer_id)
              .then(() => {
                this.addedProduct++;
              });
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    setOfferItem(offer_id) {
      this.$store
        .dispatch("offerManage/getOfferByID", offer_id)
        .then(() => {
          this.offer_title = this.selected_offer.name;
          this.offer_body = this.selected_offer.description;
          this.offer_price = this.selected_offer.price;
          this.internal_title = this.selected_offer.intern_title;
          this.purchase_webhook = this.selected_offer.webhook_url;
          // this.selected_currency  = this.selected_offer.currency
          switch (this.selected_offer.currency) {
            case "usd":
              this.selected_currency = 0;
              break;
            case "eur":
              this.selected_currency = 1;
              break;
            case "gbp":
              this.selected_currency = 2;
              break;
          }
          this.cssthumbImageUrl = "url(" + this.selected_offer.thumbnail + ")";
          for (let i = 0; i < this.product_list.length; i++) {
            this.products[this.product_list[i].id] = this.product_list[i].title;
            this.possibleProducts[i] = {
              name: this.product_list[i].title,
              code: this.product_list[i].id,
            };
          }
          this.loadedProducts++;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur",
      });
    },
    /**
     * save web hook
     */

    saveWebhook() {
      if (this.purchase_webhook == "") {
        this.$vs.notify({
          color: "#ff3300",
          // title: "Product should be required",
          text: "webhook url empty!",
          icon: "warning",
        });
        return;
      }
      this.selected_offer.webhook_url = this.purchase_webhook;
      this.saveCurrentOffer();
    },

    /**
     * save thumbnail
     **/

    saveThumbNail(thumbFile) {
      this.$store
        .dispatch("offerManage/saveThumbNail", [this.offer_id, thumbFile])
        .then(() =>
          this.$vs
            .notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            })
            .catch(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            })
        );
      this.changedThumbNail = false;
    },

    /**
     * remove ThumbNail
     **/
    removeThumbNail() {
      this.$store
        .dispatch("offerManage/removeThumbNail", this.offer_id)
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
      this.changedThumbNail = false;
    },

    /**
     * create image
     **/
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.thumbImageUrl = e.target.result;
        this.cssthumbImageUrl = "url(" + this.thumbImageUrl + ")";
      };
      reader.readAsDataURL(file);
    },

    /**
     * remove Image
     **/
    onClickRemoveImage: function() {
      this.cssthumbImageUrl = "";
      this.changedThumbNail = true;
    },

    onSelect(e) {
      let image = e.target.files[0];
      if (image !== undefined) {
        this.createImage(image);
        this.thumbNail = image;
        this.changedThumbNail = true;
      }
    },

    /**
     * remove Image
     **/

    saveCurrentOffer() {
      this.updateOffer();    
      if (this.changedThumbNail) {
        if (this.cssthumbImageUrl !== "") {
          this.saveThumbNail(this.thumbNail);
        } else {
          this.removeThumbNail();
        }
      }
    },

    /**
     *   delete current Lesson
     **/

    deleteCurrentOffer() {
      this.$store
        .dispatch("offerManage/deleteOfferByID", this.selected_offer.id)
        .then(() => {
          this.deleteOfferConfirm = false;
          this.$router.push("/offers");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.deleteOfferConfirm = false;
    },

    /**
     *   link to check out page
     **/
    linkToCheckout() {
      this.$store.dispatch("changeSideBar", 'checkout');
      this.$store.dispatch("setCurrentCheckoutMenu", "home");
      this.$store.dispatch("updateSidebarWidth", "checkout");
      this.$router.push("/offers/edit-checkout/" + this.selected_offer.id);
    },

    /**
     *   link to offer stats page
     **/
    linkToOfferStats() {
      this.$router.push("/offers/offer-stats/" + this.selected_offer.id);
    },

    /**
     *   delete current Lesson
     **/

    removeProduct() {
      this.visibleProduct = false;
    },

    /**
     * link to preview page
     */
    linkToPreview() {
      this.$router.push("/offers/" + this.selected_offer.id + "/checkout");
    },

    /**
     * get url
     */
    getUrl(offer_id) {

      window.open("/offers/" + offer_id + "/checkout", '_blank');
    },
    copyToClipBoard() {
      this.$vs.notify({
        color: "primary",
        icon: "info",
        text: "Text has been copied to your clipboard",
      });
    },
  },
};
</script>
<style lang="scss">
.con-vs-radio {
  justify-content: flex-start;
}

.image-wrapper-left {
  width: 170px;
  float: left;
}
.ql-toolbar.ql-snow {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.ql-container.ql-snow {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.vs-card--content {
  margin: 0;
}
.image-aspect-ratio {
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
input[type="file"] {
  display: none;
}
.thumbnail-select-button {
  margin-top: 8px;
  display: inline-block;
  padding: 10px 12px;
  height: 38px;

  cursor: pointer;
  border-right: none;
  color: #5c6369;
  background-color: white;
  border-radius: 0.3rem;
}
.edit-offer-price .vs-input--input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 38px;
}

.edit-currency-type .vs-select--input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 38px;
}
.external-link {
  border: 1px solid;
  background-color: #eeeeee;
  border-color: #cccccc;
  padding: 5px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-right: none;
}
.external-link-copy {
  border: 1px solid;
  background-color: gray;
  border-color: #cccccc;
  padding: 5px;
  border-top-right-radius: 3px;
  border-left: none;
  border-bottom-right-radius: 3px;
  cursor: pointer;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

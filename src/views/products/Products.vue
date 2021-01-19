<template>
  <div>
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-row vs-justify="center" class="font-weight-normal">
      <vs-col vs-lg="10" vs-sm="12">
        <vs-row>
          <div class="ml-2 mb-3 ">
            <div class="d-flex">
              <h2>
                Products
              </h2>
              <i
                class="mdi mdi-help-circle-outline "
                style="color: #3b66ff; font-size: 22px;"
              ></i>
            </div>
            <div>
              <h5
                class="ml-2 mt-2"
                @click="linkToComment"
                style="cursor: pointer; font-size: 14px"
              >
                <i class="mdi mdi-comment"></i> Comments
              </h5>
            </div>
          </div>
          <vs-button
            style="margin-left: auto; height: 45px"
            class="mr-2"
            @click.native="addProductPopup"
            >+ Add Product</vs-button
          >
        </vs-row>

        <vs-row vs-justify="left">
          <ProductCard
            v-for="product in product_list"
            :key="product.id"
            :product="product"
          ></ProductCard>
        </vs-row>

        <!-- 
      ***@  --------add Product Popup---------------
     -->
        <vs-popup
          color="success"
          :active.sync="activeAddProduct"
          title="Generate Start from Scratch Product"
        >
          <vs-row>
            <vs-col>
              <h5 class="mt-4">What is the name of this proudct?</h5>
              <vs-input
                v-model="productTitle"
                class="w-100 mt-3 mb-4"
                v-on:keyup.enter="addProduct"
                ref="product_create"
              ></vs-input>
              <div class="d-flex mb-4">
                <vs-button
                  color="dark"
                  type="border"
                  class="save-cancel-button"
                  style="margin-left:auto;"
                  @click.native="activeAddProduct = false"
                  >Cancel</vs-button
                >
                <vs-button class="ml-3 save-cancel-button" @click.native="addProduct"
                  >Save</vs-button
                >
              </div>
            </vs-col>
          </vs-row>
        </vs-popup>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
import Product from "../../models/product";
export default {
  name: "Products",

  components: {
    ProductCard,
  },

  /**
   * --------------data part-------------
   */

  data: () => ({
    activeAddProduct: false,
    productTitle: "",
    product: new Product("", ""),
    productDescription: "",
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
    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.getProductList();
  },
  /**
   * --------------method part-------------
   */
  methods: {
    /*
    @ this is for popup auto focus
     */
    addProductPopup() {
      this.activeAddProduct = true;
      this.$nextTick(() => this.setFocusOnInput("product_create"));
    },
    setFocusOnInput(inputName) {
      let inputEl = this.$refs[inputName].$el.querySelector("input");
      inputEl.focus();
    },
    /**
     * --------------get ProductList-------------
     */
    getProductList() {
      this.$store.dispatch("productManage/getProductList").then(() => {
        this.$vs.notify({
          color: this.notification_color,
          text: this.notification_text,
          icon: this.notification_icon,
        });
      });
    },

    /**
     * --------------add Product-------------
     */
    addProduct() {
      if (this.productTitle == "") {
        this.$vs.notify({
          color: this.$custom_warning,
          icon: "warning",
          text: "Product description must be filled",
        });
      } else {
        this.product.title = this.productTitle;
        this.product.description = this.productDescription;
        this.$store
          .dispatch("productManage/addProduct", this.product)
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
        this.productTitle = "";
        this.activeAddProduct = false;
      }
    },

    /**
     * --------------link to comment-------------
     */

    linkToComment: function() {
      this.$router.push("/products/comments/1");
    },
  },
};
</script>

<!-- style part -->
<style lang="scss">
.ps {
  height: 100px;
}
.save-cancel-button {
  font-size: 16px;
  width: 80px;
  padding: 5px;
}
</style>

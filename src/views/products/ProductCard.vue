<template>
  <vs-col
    type="flex"
    vs-justify="center"
    vs-align="center"
    vs-lg="4"
    vs-xs="12"
    code-toggler
    style="cursor: pointer"
  >
    <vs-card class="product-preview-item">
      <div>
        <div
          class="profile-pic mb-3 mt-3 text-center"
          style="position: relative"
          :style="{ 'background-image': cssthumbImageUrl }"
        >
          <div class="overlay" @click="onProductClick"></div>
        </div>
        <div class="text-center m-2">
          <vs-tooltip color="dark" :text="product_title">
            <h3 class="mb-2 product-title" :title="product_title">
              {{ product_title }}
            </h3>
          </vs-tooltip>
          <i class="mdi mdi-account-multiple mr-2"></i
          >{{ product_members }} members
        </div>
        <div class="project-preview-icon">
          <!-- dropdown menu for product edit -->
          <vs-dropdown vs-trigger-click>
            <i class="mdi mdi-dots-horizontal menu-icon"></i>
            <vs-dropdown-menu>
              <!-- published menu -->
              <!--  <vs-dropdown-item>
                <div class="ml-3 mr-3 primary-font-color" 
                  style="font-size: 16px">
                  Preview 
                </div>
              </vs-dropdown-item> -->

              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 primary-font-color w-100"
                  style="font-size: 16px"
                  v-on:click="editProductDetails"
                >
                  Edit Details
                </div>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 primary-font-color w-100"
                  style="font-size: 16px"
                  @click="linkToPreview"
                >
                  Preview
                </div>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 primary-font-color"
                  style="font-size: 16px"
                  @click="linkToStudentProgress"
                >
                  Students Progress
                </div>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 primary-font-color"
                  style="font-size: 16px"
                  @click="linkToManageComments"
                >
                  Manage Comments
                </div>
              </vs-dropdown-item>

              <!-- delete menu -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 primary-font-color w-100"
                  style="font-size: 16px"
                  @click="confirmDeleteProduct = true"
                >
                  Delete
                </div>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
          <!-- 
            @@ delete product popup dialog
           -->
          <vs-popup
            class="product-delete"
            title=""
            :active.sync="confirmDeleteProduct"
          >
            <div
              style="font-size: 25px; color: white"
              class="px-5 bg-danger m-0"
            >
              <i class="mdi mdi-alert"></i> Are you sure you want to delete
              <strong>"{{ product.title }}"</strong> ?
            </div>
            <div
              style="font-size: 18px; color: white; text-align: justify"
              class="px-5 py-3 bg-danger"
            >
              <br />
              Deleting this product will result in the following actions that
              you may consider before moving forward.
              <br />
              <br />
              <br />
            </div>
            <div style="float: right" class="m-3">
              <vs-button
                color="primary"
                type="flat"
                @click.native="confirmDeleteProduct = false"
                >Cancel</vs-button
              >
              <vs-button
                color="danger"
                type="filled"
                class="ml-2"
                @click.native="deleteCurrentProduct"
                >Delete Product</vs-button
              >
            </div>
          </vs-popup>
        </div>
        <div class="overlay2" @click="onProductClick"></div>
      </div>
    </vs-card>
  </vs-col>
</template>
<script>
export default {
  name: "ProductPreview",

  data: () => ({
    confirmDeleteProduct: false,
  }),

  props: {
    product: Object,
  },

  computed: {
    cssthumbImageUrl: {
      get() {
        return "url(" + this.product.thumbnail + ")";
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

    product_title: function () {
      return this.product.title;
    },

    product_preview_link: function () {
      return this.product.preview_link;
    },
    product_members: function () {
      return this.product.members;
    },

    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
      },
    },

    custom_domain: {
      get() {
        let custom_domain = this.$store.getters["settingManage/custom_domain"]
          .custom_domain;
        let lastChar = custom_domain[custom_domain.length - 1];
        if (lastChar == "/")
          return "https://" + custom_domain.substr(0, custom_domain.length - 1);
        else return "https://" + custom_domain;
      },
    },
  },

  methods: {
    /**
     *   edit product Details
     **/
    editProductDetails() {
      this.$router.push("/products/product-details/" + this.product.id);
    },
    linkToPreview() {
      this.$store.dispatch("productManage/setCurrentProduct", this.product);
      // window.open("/products/preview/" + this.product.id, "_blank");
      let token = this.logged_user.token;
      // window.open(
      //   this.custom_domain +
      //     "/product/" +
      //     this.product.id +
      //     "?academy_token=" +
      //     token +
      //     "&id=" +
      //     this.product.id,
      //   "_blank"
      // );
      window.open(
        "http://localhost:8081/product/" +
          this.product.id +
          "?academy_token=" +
          token +
          "&id=" +
          this.product.id,
        "_blank"
      );
    },

    linkToManageComments() {
      this.$router.push("/products/comments/" + this.product.id);
    },

    linkToStudentProgress() {
      this.$router.push("/analytics/product-progress/" + this.product.id);
    },

    /**
     *   edit product Category
     **/
    onProductClick() {
      this.$router.push("/products/edit-product/" + this.product.id);
    },

    deleteCurrentProduct() {
      this.$store
        .dispatch("productManage/deleteProductByID", this.product.id)
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
      this.confirmDeleteProduct = false;
    },
  },
};
</script>

<style>
.menu-icon {
  color: #ffffff;
  font-size: 2rem;
  position: relative;
}
.product-preview-item {
  position: relative;
  border-radius: 5px;
}
.thumbimage {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 100%;
  height: 180px;
}
.project-preview-icon {
  position: absolute;
  top: 0px;
  right: 15px;
  font-size: 30px;
  z-index: 200;
}
.profile-pic {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
  height: 0;
  padding-top: 56.25%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.product-preview-item .vs-card--content {
  padding: 0 0 5px 0;
}
.overlay {
  width: 100%;
  height: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  z-index: 199;
  left: 0;
  top: 0;
  /*background-color: red;*/
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  display: none;
}

.profile-pic:hover .overlay {
  display: block;
}

.product-delete .vs-popup--content {
  padding: 0;
  padding-left: 0;
  margin: 0;
  width: 100%;
}

.product-delete .vs-popup--header {
  background-color: #f62d51;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.product-delete .vs-icon {
  color: white;
}

.overlay2 {
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  z-index: 199;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  display: none;
}

.project-preview-icon:hover ~ .overlay2 {
  display: block;
}
.product-preview-item .product-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 900px) and (min-width: 600px) {
  .product-preview-item .product-title {
    font-size: 15px;
  }
}
</style>

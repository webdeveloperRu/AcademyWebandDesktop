<template>
  <div>
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="7"
        vs-sm="10"
        vs-xs="12"
        class="mb-3"
      >
        <span
          class="routing-product"
          @click="backToProducts"
          style="cursor: pointer;"
          ><h5 class="ml-2 mb-2 mt-2 primary-font">
            <i class="ti-angle-left" style="font-size: 14px;"></i> Products
          </h5></span
        >
        <br />
        <h2 class="ml-2 mb-2 mt-2">{{ selected_product.title }}</h2>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="7"
        vs-xs="12"
        vs-sm="10"
        code-toggler
      >
        <vs-card class="px-2">
          <vs-row class="mt-4">
            <vs-col vs-sm="12">
              <vs-input
                class="inputx w-100"
                label="Title"
                placeholder="Product title here..."
                v-model="product_title"
              />
              <div class="mt-2">
                Pick an easy to read, and memorable title for your product.
                Example: "7 Days to Productivity", or "Marketing Strategy". 140
                characters max.
              </div>
            </vs-col>
          </vs-row>
          <br />
          <vs-row class="mt-4">
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <!-- <label style="font-weight: 600; color: #2b2b2b; padding-left: 5px"
                >Description</label
              > -->
              <div>
                <vs-textarea
                  label="description"
                  placeholder="Product Description here..."
                  v-model="product_description"
                />
              </div>
              <div class="mt-2">
                A short, one sentence description about the product. This will
                be displayed on the product welcome page.
              </div>
            </vs-col>
          </vs-row>
          <br />
          <vs-row class="mt-4">
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12" class="thumbnail">
              <label style="font-weight: 600; color: #2b2b2b; padding-left: 5px"
                >Product Thumbnail</label
              >
              <!-- 
                @ image part
               -->
              <!-- <img :src="cssthumbImageUrl" /> -->
              <div
                class="image-aspect-ratio"
                :style="{ 'background-image': cssthumbImageUrl }"
              ></div>
              <div
                class="d-flex align-items-center mt-2 file-select"
                style="justify-content: center"
              >
                <!-- pic product thumbnail -->

                <div class="d-flex align-items-center dropdownbtn-alignment">
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
                        <label class="product-thumbnail-select-button">
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
                          @click="removeImage"
                          color="danger"
                          class="text-center"
                        >
                          <h6 style="color: red">Remove Image</h6>
                        </div>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>

                <!-- pic product thumbnail -->
              </div>
              <div class="mt-2">
                This image will be used to display this product when the users
                view their library.
              </div>
              <div class="mt-2">
                Recommended dimensions of
                <b>1280<i class="mdi mdi-close"></i>720</b>.
              </div>
            </vs-col>
          </vs-row>
        </vs-card>
        <div class="btn-alignment text-right">
          <vs-button
            color="danger"
            type="flat"
            @click="confirmDeleteProduct = true"
            >Delete Product</vs-button
          >
          <vs-button color="primary" type="filled" @click="saveProduct"
            >Save</vs-button
          >
        </div>
      </vs-col>
    </vs-row>
    <!-- 
      @@ delete product popup dialog
      -->
    <vs-popup
      class="product-delete"
      title=""
      :active.sync="confirmDeleteProduct"
    >
      <div style="font-size: 25px; color: white" class="px-5 bg-danger m-0 ">
        <i class="mdi mdi-alert"></i> Are you sure you want to delete
        <strong>"{{ selected_product.title }}"</strong> ?
      </div>
      <div
        style="font-size: 18px; color: white; text-align: justify"
        class="px-5 py-3 bg-danger"
      >
        <br />
        Deleting this product will result in the following actions that you may
        consider before moving forward.
        <br />
        <br />
        <br />
      </div>
      <div style="float: right" class="m-3">
        <vs-button
          color="primary"
          type="flat"
          @click="confirmDeleteProduct = false"
          >Cancel</vs-button
        >
        <vs-button
          color="danger"
          type="filled"
          class="ml-2"
          @click="deleteCurrentProduct"
          >Delete Product</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
  name: "ProductEditDetails",
  components: {
    // VueEditor,
  },
  data: () => ({
    thumbNail: Object,
    thumbImageUrl: "",
    cssthumbImageUrl: "",
    product_description: "",
    product_title: "",
    changed_thumbNail: false,
    confirmDeleteProduct: false,
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

    product_id: function() {
      var id = this.$route.params.product_id;
      return id.slice(0, id.length);
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    selected_product: {
      get() {
        let product = [];
        product = this.$store.state.productManage.current_product;
        if (product == undefined) return [];
        else return product;
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", false);
    this.initProduct();
  },

  methods: {
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.thumbImageUrl = e.target.result;
        this.cssthumbImageUrl = "url(" + this.thumbImageUrl + ")";
      };
      reader.readAsDataURL(file);
    },

    removeImage: function() {
      this.cssthumbImageUrl = "";
      this.changed_thumbNail = true;
    },
    backToProducts() {
      this.$router.push("/products");
    },

    onSelect(e) {
      let image = e.target.files[0];
      if (image !== undefined) {
        this.createImage(image);
        this.thumbNail = image;
        this.changed_thumbNail = true;
      }
    },

    /**
     * save thumbnail
     **/

    saveThumbNail(thumbFile) {
      this.$store
        .dispatch("productManage/saveThumbNail", [this.product_id, thumbFile])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.changed_thumbNail = false;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.changed_thumbNail = false;
        });
    },

    /**
     * remove ThumbNail
     **/
    removeThumbNail() {
      this.$store
        .dispatch("productManage/removeThumbNail", this.product_id)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.changed_thumbNail = false;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.changed_thumbNail = false;
        });
    },

    /**
     * save product
     **/

    saveProduct() {
      this.selected_product.title = this.product_title;
      this.selected_product.description = this.product_description;
      if (this.selected_product.title === "") {
        this.$vs.notify({
          color: this.$custom_warning,
          icon: "warning",
          text: "Title must be filled",
        });
      } else {
        this.$store
          .dispatch("productManage/updateProductByID", this.selected_product)
          .then(() => {
            if (!this.status_got) {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            } else {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
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
        if (this.changed_thumbNail) {
          if (this.cssthumbImageUrl !== "") {
            this.saveThumbNail(this.thumbNail);
          } else {
            this.removeThumbNail();
          }
        }
      }
    },

    /**
     * sucess upload
     **/
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur",
      });
    },

    /**
     * init product
     **/

    initProduct() {
      this.$store
        .dispatch("productManage/getProductByID", this.product_id)
        .then(() => {
          this.cssthumbImageUrl =
            "url(" + this.selected_product.thumbnail + ")";
          this.product_title = this.selected_product.title;
          this.product_description = this.selected_product.description;
          this.changed_thumbNail = false;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    /**
     * delete current product
     **/

    deleteCurrentProduct() {
      this.$store
        .dispatch("productManage/deleteProductByID", this.product_id)
        .then(() => {
          this.$router.push("/products");
          this.confirmDeleteProduct = false;
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
<style lang="scss">
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
.select-button {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: white;
  background-color: #2ea169;
  border-radius: 0.3rem;
}
.routing-product:hover {
  cursor: pointer;
}
.product-thumbnail-select-button {
  margin-top: 8px;
  display: inline-block;
  padding: 10px 12px;
  height: 38px;
  cursor: pointer;
  border-right: none;
  color: #5c6369;
  background-color: white;
  border-radius: 0.3rem;
  // border-bottom-left-radius: 0.3rem;
}
.dropdownbtn-alignment .btn-drop {
  border-radius: 4px !important;
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
</style>

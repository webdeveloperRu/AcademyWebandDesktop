<template>
  <vs-row vs-justify="center" class="primary-font">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-sm="12"
      code-toggler
    >
      <span
        @click="backToProducts"
        style="cursor: pointer;"
        class="ml-2 mb-5 mt-2 primary-font"
        ><i class="ti-angle-left" style="font-size: 14px;"></i> Products</span
      >
      <h2 class="mt-3" style="color: #333; font-weight: 600">
        {{ product_title }}
      </h2>
      <br />
      <div
        style="font-size: 14px; cursor: pointer; line-height:14px !important; "
        class="mb-3"
      >
        <span class="primary-font" @click="editProductDetails">
          <i class="mdi mdi-pencil mr-2 primary-font"></i> Edit details
        </span>
        <a :href="current_product.preview_link"
          ><span class="primary-font"
            ><i class="mdi mdi-eye mr-2 ml-3 primary-font"></i> Preview
          </span></a
        >
        <span class="primary-font" @click="customizeCoursePage">
          <i class="mdi mdi-palette mr-2 ml-3 primary-font"></i> Customize
        </span>
        <vs-dropdown vs-trigger-click>
          <span class="ml-3 primary-font">
            More Actions <i class="mdi mdi-menu-down mr-2 ml-2"></i
          ></span>
          <vs-dropdown-menu>
            <!-- manage comment -->
            <vs-dropdown-item>
              <div
                class="ml-3 mr-3 primary-font"
                style="font-size: 14px; line-height:14px; font-weight:400"
                @click="manageComments"
              >
                Manage Comments
              </div>
            </vs-dropdown-item>
            <!-- manage comment -->
            <vs-dropdown-item>
              <div
                class="ml-3 mr-3 primary-font"
                style="font-size: 14px; line-height:14px; font-weight:400"
                @click="linkToProductProgress"
              >
                Product Progress
              </div>
            </vs-dropdown-item>

            <!-- delete -->
            <vs-dropdown-item>
              <div
                class="ml-3 mr-3 primary-font"
                style="font-size: 14px;  line-height:14px; font-weight:400"
                @click="confirmDeleteProduct = true"
              >
                Delete
              </div>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <vs-card actionable>
        <div class="d-flex">
          <h4 class="primary-font" style="font-size: 20px">
            Product Outline
          </h4>
          <i
            class="mdi mdi-plus-circle-outline ml-2"
            style="color: #2962ff; font-size: 20px; margin-top: -5px"
            @click="addCategoryPopup"
          ></i>
        </div>
        <div>
          <vs-list id="product-category">
            <!-- <vs-list-header title="" color="primary"></vs-list-header> -->
            <draggable
              :list="current_categories"
              class="cursor-move"
              group="category-group"
              @change="updateCategoryOrder"
            >
              <transition-group>
                <vs-list-item
                  class="animation product-category-list"
                  v-for="listitem in current_categories"
                  :key="listitem.id"
                  title=""
                >
                  <ProductEditSubCategory
                    :id="listitem.id"
                    :title="listitem.name"
                    :category_id="listitem.id"
                    :category="listitem"
                    :key="loaded"
                  ></ProductEditSubCategory>
                </vs-list-item>
              </transition-group>
            </draggable>
          </vs-list>
        </div>
      </vs-card>
    </vs-col>
    <!-- 
      ***@  --------add Category ---------------
     -->
    <vs-popup
      color="success"
      :active.sync="activeAddCategory"
      title="Add Category"
    >
      <vs-row>
        <vs-col>
          <h5 class="mt-5">Title?</h5>
          <vs-input
            v-model="categoryTitle"
            class="w-100 mt-3 mb-5"
            ref="category_create"
            v-on:keyup.enter="addCategory"
          ></vs-input>
          <div class="d-flex">
            <vs-button
              color="dark"
              type="border"
              class="save-cancel-button"
              style="margin-left:auto;"
              @click="activeAddCategory = false"
              >Cancel</vs-button
            >
            <vs-button class="ml-3 mr-3 save-cancel-button" @click="addCategory"
              >Save</vs-button
            >
          </div>
        </vs-col>
      </vs-row>
    </vs-popup>

    <!-- 
       @@ delete product
      -->
    <vs-popup
      class="product-delete"
      title=""
      :active.sync="confirmDeleteProduct"
    >
      <div style="font-size: 25px; color: white" class="px-5 bg-danger m-0 ">
        <i class="mdi mdi-alert"></i> Are you sure you want to delete
        <strong>"{{ current_product.title }}"</strong> ?
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
  </vs-row>
</template>

<script>
import draggable from "vuedraggable";
import ProductEditSubCategory from "./ProductEditSubCategory";
import Category from "../../models/category";
export default {
  name: "ProductEditCategory",

  data: () => ({
    title: "DragnDropAnimation",
    categoryTitle: "",
    category: new Category("", ""),
    loaded: 0,
    activeAddCategory: false,
    showCategory: false,
    current_categories: [],
    confirmDeleteProduct: false,
  }),

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.getProductByID(this.product_id);
  },

  components: {
    draggable,
    ProductEditSubCategory,
  },

  watch: {
    category_list: function(newValue) {
      this.current_categories = newValue;
    },
  },

  computed: {
    product_id: function() {
      var id = this.$route.params.id;
      return id.slice(0, id.length);
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    current_product: {
      get() {
        let product = [];
        for (let i = 0; i < this.product_list.length; i++) {
          if (this.product_list[i].id == this.product_id) {
            product = this.product_list[i];
          }
        }
        return product;
      },
    },

    product_title: function() {
      let title = "";
      for (let i = 0; i < this.product_list.length; i++) {
        if (this.product_list[i].id == this.product_id) {
          title = this.product_list[i].title;
        }
      }
      return title;
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

    category_list: {
      get() {
        let list = [];
        list = this.$store.getters["productManage/category_list"];
        if (list == undefined) return [];
        else return list;
      },
    },
    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },

    offer_list: {
      get() {
        return this.$store.getters["productManage/offer_list"];
      },
    },

    vousher_list: {
      get() {
        return this.$store.getters["productManage/vousher_list"];
      },
    },
  },

  methods: {
    addCategoryPopup() {
      this.activeAddCategory = true;
      this.$nextTick(() => this.setFocusOnInput("category_create"));
    },

    setFocusOnInput(inputName) {
      let inputEl = this.$refs[inputName].$el.querySelector("input");
      inputEl.focus();
    },

    backToProducts() {
      this.$router.push("/products");
    },

    updateCategoryList() {
      this.current_categories = this.category_list;
      if (this.current_categories == undefined) this.current_categories = [];
    },
    /**
     * --------------------update Category order for product id------------------
     */
    updateCategoryOrder() {
      let updatedList = this.category_list;
      updatedList = JSON.stringify(updatedList);
      this.$store
        .dispatch("categoryManage/updateCategoryOrder", [
          updatedList,
          this.product_id,
        ])
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
    /**
     * --------------------add Category for product id------------------
     */
    addCategory() {
      this.category.name = this.categoryTitle;
      this.category.description = "";
      if (this.category.name === "") {
        this.$vs.notify({
          color: "#ff3300",
          icon: "warning",
          text: "Category name must be filled",
        });
      } else {
        this.$store
          .dispatch("categoryManage/addCategory", [
            this.category,
            this.product_id,
          ])
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.initInputValues();
            this.updateCategoryList();
            this.loaded++;
            this.activeAddCategory = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.initInputValues();
            this.updateCategoryList();
            this.loaded++;
            this.activeAddCategory = false;
          });
      }
      this.categoryTitle = "";
    },

    initInputValues() {
      this.categoryTitle = "";
    },

    /**
     * --------------------get product details by id------------------
     */
    getProductByID(product_id) {
      this.$store
        .dispatch("productManage/getProductByID", product_id)
        .then(() => {
          if (!this.status_got) {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          } else {
            this.getCategoriesForProductID(product_id);
          }
        });
    },

    /**
     * --------------------get Categories for product id------------------
     */
    async getCategoriesForProductID(product_id) {
      this.showCategory = false;
      this.$vs.loading({ type: "material" });

      await this.$store
        .dispatch("productManage/getCategoriesForProductID", product_id)
        .then(async () => {
          if (!this.status_got) {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.updateCategoryList();
          } else {
            this.updateCategoryList();
            for (let i = 0; i < this.category_list.length; i++) {
              await this.getLessonList(this.category_list[i].id);
            }
          }
        });
      this.showCategory = true;
      this.$vs.loading.close(this.$refs.loading);
    },

    /**
     *   get session list
     **/
    getLessonList(category_id) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("lessonManage/getLessonList", category_id)
          .then(() => {
            if (!this.status_got) {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              reject(false);
            } else {
              this.loaded++;
              resolve(true);
            }
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            reject(false);
          });
      });
    },

    /**
     *   edit product Details
     **/
    editProductDetails() {
      this.$router.push("/products/product-details/" + this.product_id);
    },

    /**
     *   edit product Details
     **/
    deleteCurrentProduct() {
      this.$store
        .dispatch("productManage/deleteProductByID", this.product_id)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$router.push("/products");
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

    /**
     *   edit product Details
     **/
    manageComments() {
      this.$router.push("/products/comments/" + this.current_product.id);
    },

    /**
     * linkToProductProgress
     */
    linkToProductProgress() {
      this.$router.push(
        "/analytics/product-progress/" + this.current_product.id
      );
    },

    /**
     * customizeCoursePage
     */
    customizeCoursePage() {
      this.$store.dispatch("changeSideBar", 'product-customize');
      this.$store.dispatch("updateSidebarWidth", "checkout");
      this.$router.push("/products/" +this.current_product.id +"/customize");
    }
  },
};
</script>
<style>
.animation {
  transition: all 0.5s;
}
#product-category .vs-list--item.animation .vs-list--slot {
  margin-left: 0;
  width: 100%;
}
#product-category
  .product-sub-category
  .vs-list--item.animation
  .vs-list--slot {
  margin-left: auto;
  width: auto;
}

.vs-list--item {
  padding: 10px;
}

.product-category-list {
  border: none;
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

import ProductService from '../services/product.service';
import store from './index'
const initialState = {
  product_list: [],
  current_product: [],
  category_list: [],
  vousher_list: [],
  delete_product_id: '',
  product_progress: {},
  current_student_progress: [],
};
export const productManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get product list-------------------
     */
    getProductList({
      commit
    }) {
      return ProductService.getProductList().then(
        res => {
          if (res.status === 200) {
            commit('getProductListSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
              commit("initProductList")
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
          commit("initProductList")
        }
      );
    },

    /**
     * ---------add product -----------------
     */
    addProduct({
      commit
    }, product) {
      return ProductService.addProduct(product).then(
        res => {
          if (res.status === 200) {
            commit('addProductSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    /**
     * ---------delete product by id ----------------
     */
    deleteProductByID({
      commit
    }, product_id) {
      return ProductService.deleteProductByID(product_id).then(
        res => {
          if (res.status === 200) {
            commit('setDeleteProductID', product_id);
            commit('deleteProductByIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    /**
     * ---------get product by id--------------
     */
    getProductByID({
      commit
    }, product_id) {
      return ProductService.getProductByID(product_id).then(
        res => {
          if (res.status === 200) {
            commit('getProductByIDSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    /**
     * ---------update product by id--------------
     */
    updateProductByID({
      commit
    }, product) {
      return ProductService.updateProductByID(product).then(
        res => {
          if (res.status === 200) {
            commit('updateProduct', product)
            commit('updateProductByIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    /**
     * ---------save ThmubNail------------
     */
    saveThumbNail({
      commit
    }, [product_id, thumbnail]) {
      return ProductService.saveThumbNail(product_id, thumbnail).then(
        res => {
          if (res.status === 200) {
            commit('saveThumbNailSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    /**
     * ---------remove ThmubNail------------
     */
    removeThumbNail({
      commit
    }, product_id) {
      return ProductService.removeThumbNail(product_id).then(
        res => {
          if (res.status === 200) {
            commit('removeThumbNailSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },


    /**
     * ---------get Categories for product ID------------
     */
    getCategoriesForProductID({
      commit
    }, product_id) {
      return ProductService.getCategoriesForProductID(product_id).then(
        res => {
          if (res.status === 200) {
            commit('getCategoriesForProductIDSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
              commit("initCategoryList")
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
          commit("initCategoryList")
        }
      );
    },

    /**
     * ---------get Offers for product ID-------------
     */
    getOffersForProductID() {

    },

    /**
     * ---------get voushers for product ID -----------------
     */
    getVoushersForProductID() {

    },

    /**
     * ---------- get product progress details
     */
    getProductProgressID({
      commit
    }, product_id) {
      return ProductService.getProductProgressID(product_id).then(
        res => {
          if (res.status === 200) {
            commit('getProductProgressIDSuccess', {
              res,
              product_id
            });
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    /**
     * ---------- get product progress details
     */
    getStudentProgress({
      commit
    }, [product_id, student_id]) {
      return ProductService.getStudentProgress(product_id, student_id).then(
        res => {
          if (res.status === 200) {
            commit('getStudentProgressSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    setCurrentProduct({ commit }, product) {
      commit("setCurrentProduct", product);
    },


  },
  getters: {
    twofa_key: state => state.twofa_key,
    product_list: state => state.product_list,
    category_list: state => state.category_list,
    vousher_list: state => state.vousher_list,
    current_product: state => state.current_product,
  },

  mutations: {

    updateProduct(state, product) {
      for (let i = 0; i < state.product_list.length; i++) {
        if (state.product_list[i].id == product.id) {
          state.product_list[i] = product
        }
      }
    },
    /**
     * ---------get product by ID Success ----------------
     */
    getProductByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'success to get product';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      state.current_product = res.data
    },

    setDeleteProductID(state, id) {
      state.delete_product_id = id;
    },

    /**
     * ---------get product List  ----------------
     */
    getProductListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_color = "primary"
      store.state.notification_icon = "info"
      state.product_list = res.data.data
      store.state.notification_text = 'Found: ' + state.product_list.length + ' Products';
    },

    initProductList(state) {
      state.product_list = [];
      state.category_list = [];
      state.vousher_list = [];
      state.delete_product_id = '';
      state.current_product = [];
      store.state.status = {};

    },

    /**
     * ---------delete product success ----------------
     */
    deleteProductByIDSuccess(state) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Selected product is deleted';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      for (let i = 0; i < state.product_list.length; i++) {
        if (state.product_list[i].id == state.delete_product_id) {
          state.product_list.splice(i, 1);
        }
      }
    },


    /**
     * ---------add product Success ----------------
     */
    addProductSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'This product is successfully added';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      state.product_list.push(res.data.data)
    },

    /**
     * ---------add product Success ----------------
     */
    getCategoriesForProductIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Success to get categories';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      state.category_list = res.data.data;
    },

    initCategoryList(state) {
      state.category_list = [];

    },


    /**
     * ---------update lesson by id ----------------
     */
    updateProductByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'successfully updated product';
    },


    // success save thumb Nail
    saveThumbNailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'ThmubNail success saved!';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
    },

    // remove save thumb Nail
    removeThumbNailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'ThumbNail removed';
    },

    // get product id progress success
    getProductProgressIDSuccess(state, {
      res,
      product_id
    }) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'product progress succesfully got';
      state.product_progress[product_id] = res.data
    },

    // get current student progress data
    getStudentProgressSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'student progress succesfully got';
      state.current_student_progress = res.data
    },

    setCurrentProduct(state, product) {
      state.current_product = product;
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }


  }
};
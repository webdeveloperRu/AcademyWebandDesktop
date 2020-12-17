import CategoryService from '../services/category.service';
import store from './index'
const initialState = {
    current_category: Object,
};
export const categoryManage = {
  namespaced: true,
  state: initialState,
  actions: {
  
  /**
  * ---------update category by id ----------------
  */
   updateCategoryByID({commit}, category) {
    return CategoryService.updateCategoryByID(category).then(
      res => {
        if(res.status ===200){
          commit('updateCategoryByIDSuccess', res);
        }
        else{
          if(res.response == undefined)
              commit('NETWORK_ERROR', null, { root: true });
          else
            commit("REQUEST_FAILED", res.response, {root: true});
        }
      },
      error => {
        commit("REQUEST_FAILED", error.response, {root: true});
      }
    );
  },


    /**
    * ---------get category for id -----------------
    */
   getCategoryByID({commit}, category_id) {
    return CategoryService.getCategoryByID(category_id).then(
      res => {
        if(res.status ===200){
          commit('getCategoryByIDSuccess', res);
        }
        else{
          if(res.response == undefined)
              commit('NETWORK_ERROR', null, { root: true });
          else
            commit("REQUEST_FAILED", res.response, {root: true});
        }
      },
      error => {
        commit("REQUEST_FAILED", error.response, {root: true});
      }
    );
  },

  /**
  * ---------delete category by id ----------------
  */
   deleteCategoryByID({commit},category_id) {
    return CategoryService.deleteCategoryByID(category_id).then(
      res => {
        if(res.status ===200){
          commit('deleteCategoryByIDSuccess', category_id);
        }
        else{
          if(res.response == undefined)
              commit('NETWORK_ERROR', null, { root: true });
          else
            commit("REQUEST_FAILED", res.response, {root: true});
        }
      },
      error => {
        commit("REQUEST_FAILED", error.response, {root: true});
      }
    );
  },

  /**
  * ---------update categorieds positions ----------------
  */
  updateCategoryOrder({commit}, [list, product_id]){
    return CategoryService.updateCategoryOrder(list, product_id).then(
      res => {
        if(res.status ===200){
          commit('updateCategoryOrderSuccess');
        }
        else{
          if(res.response == undefined)
              commit('NETWORK_ERROR', null, { root: true });
          else
            commit("REQUEST_FAILED", res.response, {root: true});
        }
      },
      error => {
        commit("REQUEST_FAILED", error.response, {root: true});
      }
    );
  },

  
  /**
  * ---------bulk update category index position----------------
  */

  /**
   * ---------get Categories for product ID------------
   */
  // getCategoriesForProdcutID({commit}, product_id) {
  //   return CategoryService.getCategoriesForProdcutID(product_id).then(
  //     res => {
  //       if(res.status ===200){
  //         commit('getCategoriesForProdcutIDSuccess', res);
  //       }
  //       else{
  //         if(res.response == undefined)
  //             commit('NETWORK_ERROR', null, { root: true });
  //         else{
  //           commit("REQUEST_FAILED", res.response, {root: true});
  //           commit("initCategroyList");
  //         }
  //       }
  //     },
  //     error => {
  //       commit("REQUEST_FAILED", error.response, {root: true});
  //       commit("initCategroyList");
  //     }
  //   );
  // },


   /**
   * ---------add Category for proudct_id -------------------
   */
    addCategory({commit}, [category, product_id]) {
      return CategoryService.addCategory(category, product_id).then(
        res => {
          if(res.status ===200){
            commit('addCategorySuccess', res);
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else
              commit("REQUEST_FAILED", res.response, {root: true});              
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
    },

  /**
   * ---------add Category for proudct_id -------------------
   */
    setDrip({commit}, [category_id, dripDays]) {
      return CategoryService.setDrip(category_id, dripDays).then(
        res => {
          if (res.status == 200) {
            commit('setDripSuccess', res);
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else
              commit("REQUEST_FAILED", res.response, {root: true});              
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
    },

     /**
     * ---------save ThmubNail------------
     */
     saveThumbNail({commit},[category_id, thumbnail]){
      return CategoryService.saveThumbNail(category_id, thumbnail).then(
        res => {
          if(res.status ===200){
            commit('saveThumbNailSuccess');
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else {
              commit("REQUEST_FAILED", res.response, {root: true});              
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
     },

     /**
     * ---------remove ThmubNail------------
     */
     removeThumbNail({commit}, category_id){
      return CategoryService.removeThumbNail(category_id).then(
        res => {
          if(res.status ===200){
            commit('removeThumbNailSuccess');
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else {
              commit("REQUEST_FAILED", res.response, {root: true});              
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
     },

  },

   getters: {
    current_category: state=>state.current_category,
  },

  mutations: {

    /**
     * ---------add category mutation  ----------------
     */
    addCategorySuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'New category successfully added';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.productManage.category_list.push(res.data.data);
      store.state.lessonManage.lesson_list[res.data.data.id] = [];
    },

    /**
     * ---------delete category mutation ----------------
     */
    deleteCategoryByIDSuccess(state, category_id){
      store.state.status = { got: true};
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'Selected category deleted!';
      for (let i = 0 ; i < store.state.productManage.category_list.length ; i++){
        if (store.state.productManage.category_list[i].id == category_id) {
          store.state.productManage.category_list.splice(i, 1); 
        }
      }
    },

    
    
    /**
     * ---------udpate category mutation ----------------
     */
    updateCategoryByIDSuccess(state, res) {
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.status = { got: true};
      store.state.notification_text = 'category successfully updated!';
      for (let i = 0 ; i < store.state.productManage.category_list.length ; i++){
        if (store.state.productManage.category_list[i].id == res.data.id) {
          store.state.productManage.category_list[i] = res.data
        }
      }
      state.current_category = res.data.data;
    },


    /**
     * ---------get category mutation ----------------
     */
    getCategoryByIDSuccess(state, res) {
      store.state.status = { got: true};
      store.state.notification_text = 'Category successfully got!';
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      state.current_category = res.data;
      // store.state.productManage.productList.push(res.data.data)
    },
    
    

    // /**
    //  * ---------get categories for product id mutation ----------------
    //  */
    // getCategoriesForProdcutIDSuccess(state, res){
    //   store.state.status = { got: true};
    //   store.state.notification_text = 'Cagegories successfully got!';
    //   store.state.notification_icon = "info"
    //   store.state.notification_color = "primary"
    //   store.state.productManage.category_list = res.data.data;
    //   if(store.state.productManage.category_list  == undefined)
    //     store.state.productManage.category_list = [];
    // },

    initCategroyList(){      
      store.state.productManage.category_list = [];
    },

    setCategoryList(list){
      store.state.productManage.category_list = list
    },

    /**
     * ---------update categories position for product id mutation ----------------
     */
     updateCategoryOrderSuccess(){
      store.state.status = { got: true};
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'Category order successfully updated!';
     },

    

     /**
     * ---------set Drip success ----------------
     */
    setDripSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text = 'Drip successfully set';
      for (let i = 0 ; i < store.state.productManage.category_list.length ; i++){
        if (store.state.productManage.category_list[i].id == res.data.id) {
          store.state.productManage.category_list[i] = res.data
        }
      }
    },
    
     // success save thumb Nail
    saveThumbNailSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = 'ThumbNail successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    
    // remove save thumb Nail
    removeThumbNailSuccess() {
      store.state.status = { got: true};
      store.state.notification_text = 'ThumbNail successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    RESET_MODULE (state) {
      
      Object.assign(state, initialState)
     }



  }
}
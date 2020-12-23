import CouponService from '../services/coupons.service';
import store from './index'
const initialState = {
  coupon_list: [],
  current_coupon: []
};
export const couponManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get coupon list-------------------
     */
    getCouponList({
      commit
    }) {
      return CouponService.getCouponList().then(
        res => {
          if (res.status === 200) {
            commit('getCouponListSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------add new coupon -----------------
     */
    addCoupon({
      commit
    }, coupon) {
      return CouponService.addCoupon(coupon).then(
        res => {
          if (res.status === 200) {
            commit('addCouponSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------update  coupon -----------------
     */
    updateCouponByID({
      commit
    }, coupon) {
      return CouponService.updateCouponByID(coupon).then(
        res => {
          if (res.status === 200) {
            commit('updateCouponByIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------delete coupon id -----------------
     */
    deleteCouponByID({
      commit
    }, coupon_id) {
      return CouponService.deleteCouponByID(coupon_id).then(
        res => {
          if (res.status === 200) {
            commit('deleteCouponByIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------get coupon id -----------------
     */
    getCouponByID({
      commit
    }, coupon_id) {
      return CouponService.getCouponByID(coupon_id).then(
        res => {
          if (res.status === 200) {
            commit('getCouponByIDSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },





  },

  getters: {
    coupon_list: state => state.coupon_list,
    current_coupon: state => state.current_coupon
  },

  mutations: {
    /**
     * ---------get coupon by ID Success ----------------
     */
    getCouponByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'coupon successfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_coupon = res.data
    },


    /**
     * ---------get coupon List  ----------------
     */
    getCouponListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Found ' + res.data.items.length + ' coupons';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      if (res.data.items == undefined) {
        state.coupon_list = []
      } else {
        state.coupon_list = res.data.items
      }
    },



    /**
     * ---------delete coupon success ----------------
     */
    deleteCouponByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'coupon is deleted!';
    },


    /**
     * ---------add coupon Success ----------------
     */
    addCouponSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'New coupon successfully added!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.coupon_list.push(res.data)
    },



    /**
     * ---------update proudct Success ----------------
     */
    updateCouponByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'coupon successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }



  }
};
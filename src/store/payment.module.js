import PaymentService from '../services/payment.service'
import store from './index'
const initialState = {
  payment_list: [],
  current_payment: [],
  stripe_session_id: ''
};
export const paymentManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get details payment ID-------------------
     */
    getDetailsPaymentID({
      commit
    }, id) {
      return PaymentService.getDetailsPaymentID(id).then(
        res => {
          if (res.status === 200) {
            commit('getDetailsPaymentIDSuccess', res);
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
     * ---------get payment list -----------------
     */
    getPaymentList({
      commit
    }) {
      return PaymentService.getPaymentList().then(
        res => {
          if (res.status === 200) {
            commit('getPaymentListSuccess', res);
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
     * ---------update new people -----------------
     */
    updatePaymentID({
      commit
    }, payment) {
      return PaymentService.updatePaymentID(payment).then(
        res => {
          if (res.status === 200) {
            commit('updatePaymentIDSuccess', res);
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
     * ---------create new payment stripe -----------------
     */
    createPaymentStripe({
      commit
    }, payment) {
      return PaymentService.createPaymentStripe(payment).then(
        res => {
          if (res.status === 200) {
            commit('createPaymentStripeSuccess', res);
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


  },

  getters: {
    payment_list: state => state.payment_list,
    current_payment: state => state.current_payment
  },

  mutations: {
    /**
     * ---------get people by ID Success ----------------
     */
    getDetailsPaymentIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Selected payment successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // state.current_people = res.data
    },

    /**
     * ---------get people List  ----------------
     */
    getPaymentListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'payment list successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.payment_list = res.data.items
    },


    /**
     * ---------add People Success ----------------
     */
    createPaymentStripeSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'new payment successfuly created!';
      state.stripe_session_id = res.data.session_id
    },


    /**
     * ---------update proudct Success ----------------
     */
    updatePaymentIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'Payment successfully updated!';
      // state.category_list = 
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }

  }
};
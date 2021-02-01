import SettingsService from "../services/settings.service";
import store from "./index";
const initialState = {
  notification: [],
  custom_domain: { custom_domain: "preview.videocourse.app" },
  billing_address: [],
  account_details: [],
};
export const settingManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get notification-------------------
     */
    getNotification({ commit }) {
      return SettingsService.getNotification().then(
        (res) => {
          if (res.status === 200) {
            commit("getNotificationSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------set notification -----------------
     */
    setNotification({ commit }, notfication) {
      return SettingsService.setNotification(notfication).then(
        (res) => {
          if (res.status === 200) {
            commit("setNotificationSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------get custom domain -----------------
     */
    getCustomDomain({ commit }) {
      return SettingsService.getCustomDomain().then(
        (res) => {
          if (res.status === 200) {
            commit("getCustomDomainSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------set custom domain -----------------
     */
    setCustomDomain({ commit }, custom_domain) {
      return SettingsService.setCustomDomain(custom_domain).then(
        (res) => {
          if (res.status === 200) {
            commit("setCustomDomainSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------delete custom domain -----------------
     */
    deleteCustomDomain({ commit }) {
      return SettingsService.setCustomDomain().then(
        (res) => {
          if (res.status === 200) {
            commit("deleteCustomDomainSuccess");
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------get billing address -----------------
     */
    getBillingAddress({ commit }) {
      return SettingsService.getBillingAddress().then(
        (res) => {
          if (res.status === 200) {
            commit("getBillingAddressSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------set billing address -----------------
     */
    setBillingAddress({ commit }, custom_domain) {
      return SettingsService.setBillingAddress(custom_domain).then(
        (res) => {
          if (res.status === 200) {
            commit("setBillingAddressSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------get account details -----------------
     */

    getAccountDetails({ commit }) {
      return SettingsService.getAccountDetails().then(
        (res) => {
          if (res.status === 200) {
            commit("getAccountDetailsSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------set account details -----------------
     */

    setAccountDetails({ commit }, account_details) {
      return SettingsService.setAccountDetails(account_details).then(
        (res) => {
          if (res.status === 200) {
            commit("setAccountDetailsSuccess", res);
          } else {
            commit("setAccountDetailsFailed", res.response);
          }
        },
        (error) => {
          commit("setAccountDetailsFailed", error.response);
        }
      );
    },

    /**
     * ---------delete account details -----------------
     */

    deleteAccountDetails({ commit }) {
      return SettingsService.deleteAccountDetails().then(
        (res) => {
          if (res.status === 200) {
            commit("deleteAccountDetailsSuccess");
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------set account avatar -----------------
     */

    setAccountAvatar({ commit }, avatar) {
      return SettingsService.setAccountAvatar(avatar).then(
        (res) => {
          if (res.status === 200) {
            commit("setAccountAvatarSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    /**
     * ---------delete account avatar -----------------
     */

    deleteAccountAvatar({ commit }, avatar) {
      return SettingsService.deleteAccountAvatar(avatar).then(
        (res) => {
          if (res.status === 200) {
            commit("deleteAccountAvatarSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },
  },

  getters: {
    notification: (state) => state.notification,
    custom_domain: (state) => state.custom_domain,
    billing_address: (state) => state.billing_address,
    account_details: (state) => state.account_details,
  },

  mutations: {
    /**
     * ---------get notification  ----------------
     */
    getNotificationSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_text = "notification successfully got";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      state.notification = res.data;
    },

    /**
     * ---------get custom domain----------------
     */
    getCustomDomainSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "custom domain succsfully got!";
      if (res.data.custom_domain == null) {
        state.custom_domain = res.data;
        state.custom_domain.custom_domain = "preview.videocourse.app";
      } else if (res.data.custom_domain == "") {
        state.custom_domain = res.data;
        state.custom_domain.custom_domain = "preview.videocourse.app";
      }
    },

    /**
     * ---------delete custom domain----------------
     */
    deleteCustomDomainSuccess() {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "custom domain deleted";
    },

    /**
     * ---------set custom domain----------------
     */
    setCustomDomainSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "custom domain succsfully updated";
      if (res.data.custom_domain == "") {
        state.custom_domain = res.data;
        state.custom_domain.custom_domain = "preview.videocourse.app";
      } else if (res.data.custom_domain == null) {
        state.custom_domain = res.data;
        state.custom_domain.custom_domain = "preview.videocourse.app";
      }
    },

    /**
     * ---------set notificaton  ----------------
     */
    setNotificationSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_text = "notification successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      state.notification = res.data;
    },

    /**
     * ---------get billing address----------------
     */
    getBillingAddressSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "custom domain succsfully updated";
      state.billing_address = res.data;
    },

    getBillingAddressFailed(state, error) {
      store.state.status = {};
      store.state.notification_icon = "warning";
      store.state.notification_color = "#ff3300";
      store.state.notification_text = error.data.message;
    },

    /**
     * ---------set billing address----------------
     */
    setBillingAddressSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "Billing address succsfully updated";
      state.billing_address = res.data;
    },

    /**
     * ---------get account details ----------------
     */
    getAccountDetailsSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "account details successfully got";
      state.account_details = res.data;
      store.state.auth.user.data = state.account_details;
    },

    /**
     * ---------set account details ----------------
     */
    setAccountDetailsSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "account details successfully updated";
      state.account_details = res.data;
      store.state.auth.user.data = state.account_details;
    },

    setAccountDetailsFailed(state, error) {
      store.state.status = {};
      store.state.notification_icon = "warning";
      store.state.notification_color = "#ff3300";
      store.state.notification_text = error.data.message;
    },

    /**
     * ---------delete account details ----------------
     */
    deleteAccountDetailsSuccess(state) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "account details deleted";
      state.account_details = [];
    },

    /**
     * ---------set account avatar ----------------
     */
    setAccountAvatarSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "account avatar successfully updated";
      state.account_details = res.data;
      store.state.auth.user.data = state.account_details;
    },

    /**
     * ---------delete account avatar ----------------
     */
    deleteAccountAvatarSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "account avatar deleted";
      state.account_details.avatar = res.data.avatar;
      store.state.auth.user.data.avatar = res.data.avatar;
    },

    RESET_MODULE(state) {
      Object.assign(state, initialState);
    },
  },
};

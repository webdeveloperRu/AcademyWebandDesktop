import SubUserService from '../services/subuser.service';
import store from './index'
const initialState = {
  subuser_list: [],
  current_subuser: []
};
export const subuserManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------add new SubUser -------------------
     */
    addSubUser({
      commit
    }, subUser) {
      return SubUserService.addSubUser(subUser).then(
        res => {
          if (res.status === 200) {
            commit('addSubUserSuccess', res);
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
     * ---------get all SubUsers -----------------
     */
    getSubUserList({
      commit
    }) {
      return SubUserService.getSubUserList().then(
        res => {
          if (res.status === 200) {
            commit('getSubUserListSuccess', res);
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
     * ---------get SubUser by ID-----------------
     */
    getSubUserByID({
      commit
    }, subUser_id) {
      return SubUserService.getSubUserByID(subUser_id).then(
        res => {
          if (res.status === 200) {
            commit('getSubUserByIDSuccess');
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
     * ---------update SubUser by id -----------------
     */
    updateSubUserByID({
      commit
    }, subUser) {
      return SubUserService.updateSubUserByID(subUser).then(
        res => {
          if (res.status === 200) {
            commit('updateSubUserList', subUser);
            commit('updateSubUserByIDSuccess');
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
     * ---------delete SubUser id -----------------
     */
    deleteSubUserByID({
      commit
    }, subUser_id) {
      return SubUserService.deleteSubUserByID(subUser_id).then(
        res => {
          if (res.status === 200) {
            commit('deleteSubUserByIDSuccess');
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
    subuser_list: state => state.subuser_list,
    current_subuser: state => state.current_subuser
  },

  mutations: {
    /**
     * ---------get offer by ID Success ----------------
     */
    deleteSubUserByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'current template deleted!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // state.current_template = res.data
    },

    /**
     * ---------get offer List  ----------------
     */
    addSubUserSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'User successfully registered!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.subuser_list.push(res.data.data)
    },

    /**
     * ---------delete offer success ----------------
     */
    updateSubUserByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'user successfully updated!';
    },


    /**
     * --------- get subuser list  Success ----------------
     */
    getSubUserListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      if (res.data == undefined) {
        state.subuser_list = [];
      } else {
        state.subuser_list = res.data.items;
      }
      if (state.subuser_list.length == 0)
        store.state.notification_text = 'No registered account users';
      else
        store.state.notification_text = 'Found ' + state.subuser_list.length + ' sub users!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    /**
     * ---------update proudct Success ----------------
     */
    getSubUserByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Offer successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    /**
     * ---------update proudct Success ----------------
     */
    updateSubUserList(state, subUser) {
      for (let i = 0; i < state.subuser_list.length; i++) {
        if (state.subuser_list[i].id == subUser.id) {
          state.subuser_list[i] = subUser;
        }
      }
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }


  }
};
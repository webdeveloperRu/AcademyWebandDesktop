import TemplatesService from '../services/templates.service';
import store from './index'
const initialState = {
  template_list: [],
  current_template: []
};
export const templateManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------add new email template-------------------
     */
    addTemplate({
      commit
    }, template) {
      return TemplatesService.addTemplate(template).then(
        res => {
          if (res.status === 200) {
            commit('addTemplateSuccess', res);
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
     * ---------get all email templates -----------------
     */
    getTemplateList({
      commit
    }) {
      return TemplatesService.getTemplateList().then(
        res => {
          if (res.status === 200) {
            commit('getTemplateListSuccess', res);
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
     * ---------get template by ID-----------------
     */
    getTemplateByID({
      commit
    }, template_id) {
      return TemplatesService.getTemplateByID(template_id).then(
        res => {
          if (res.status === 200) {
            commit('getTemplateByIDSuccess');
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
     * ---------update template by index -----------------
     */
    updateTemplate({
      commit
    }, [template, template_index]) {
      return TemplatesService.updateTemplate(template).then(
        res => {
          if (res.status === 200) {
            commit('updateTemplateList', {
              template,
              template_index
            });
            commit('updateTemplateSuccess');
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
     * ---------delete template id -----------------
     */
    resetTemplate({
      commit
    }, template) {
      return TemplatesService.resetTemplate(template).then(
        res => {
          if (res.status === 200) {
            commit('resetTemplateSuccess');
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
     * ---------send Test Email------------
     */
    sendTestEmail({
      commit
    }, [template, email]) {
      return TemplatesService.sendTestEmail(template, email).then(
        res => {
          if (res.status === 200) {
            commit('sendTestEmailSuccess');
          } else {
            commit('sendTestEmailFailed', res.response);
          }
        },
        error => {
          commit('sendTestEmailFailed', error.response);
        }
      );
    },



  },

  getters: {
    template_list: state => state.template_list,
    current_template: state => state.current_template
  },

  mutations: {
    /**
     * ---------get template by ID Success ----------------
     */
    resetTemplateSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Template reset!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // state.current_template = res.data
    },


    /**
     * ---------get template List  ----------------
     */
    addTemplateSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Found ' + res.data.data.length + ' templates';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // if( res.data == undefined ){
      //   state.template_list = []
      // }
      // else{
      //   state.template_list = res.data.data
      // }
    },

    /**
     * ---------delete template success ----------------
     */
    updateTemplateSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'Template is updated!';
    },


    /**
     * ---------add template Success ----------------
     */
    getTemplateListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      if (res.data == undefined) {
        state.template_list = [];
      } else {
        state.template_list = res.data.items;
      }
      store.state.notification_text = "Found " + state.template_list.length + " templates!";
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';

    },



    /**
     * ---------update proudct Success ----------------
     */
    getTemplateByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'template successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    // send test emial
    sendTestEmailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Send test email success';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    sendTestEmailFailed(state, error) {
      store.state.status = {};
      store.state.notification_icon = "warning"
      store.state.notification_color = "#ff3300"
      store.state.notification_text = error.data.message;
    },

    updateTemplateList(state, {
      template,
      template_index
    }) {
      state.template_list[template_index] = template;
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }


  }
};
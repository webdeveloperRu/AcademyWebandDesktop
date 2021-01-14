import ProdCustomizeService from "../services/prodcustomize.service";
import store from "./index";
const initialState = {
  prod_header: null,
  prod_footer: null,
  prod_hero: null,
  prod_slidebar: null,
  prod_settings: null,
  prod_welcome: null,
  prod_syllabus: null,
};
export const prodCustomizeManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------save product customize header ----------------
     */
    saveProdHeader({ commit }, [header, product_id]) {
      return ProdCustomizeService.saveProdHeader(header, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdHeaderSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize header -----------------
     */
    getProdHeader({ commit }, product_id) {
      return ProdCustomizeService.getProdHeader(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdHeaderSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------save product customize footer ----------------
     */
    saveProdFooter({ commit }, [footer, product_id]) {
      return ProdCustomizeService.saveProdFooter(footer, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdFooterSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize header -----------------
     */
    getProdFooter({ commit }, product_id) {
      return ProdCustomizeService.getProdFooter(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdFooterSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------save product customize hero ----------------
     */
    saveProdHero({ commit }, [hero, product_id]) {
      return ProdCustomizeService.saveProdHero(hero, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdHeroSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize hero -----------------
     */
    getProdHero({ commit }, product_id) {
      return ProdCustomizeService.getProdHero(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdHeroSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------save product customize settings ----------------
     */
    saveProdSettings({ commit }, [settings, product_id]) {
      return ProdCustomizeService.saveProdHero(settings, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdSettingsSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize settings-----------------
     */
    getProdSettings({ commit }, product_id) {
      return ProdCustomizeService.getProdSettings(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdSettingsSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------save product customize slidebar ----------------
     */
    saveProdSlidebar({ commit }, [slidebar, product_id]) {
      return ProdCustomizeService.saveProdHero(slidebar, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdSlidebarSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize slidebar -----------------
     */
    getProdSlidebar({ commit }, product_id) {
      return ProdCustomizeService.getProdSlidebar(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdSlidebarSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------save product customize wellcome ----------------
     */
    saveProdWellcome({ commit }, [wellcome, product_id]) {
      return ProdCustomizeService.saveProdWellcome(wellcome, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdWellcomeSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize wellcome -----------------
     */
    getProdWellcome({ commit }, product_id) {
      return ProdCustomizeService.getProdWellcome(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdWellcomeSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------save product customize syllabus ----------------
     */
    saveProdSyllabus({ commit }, [syllabus, product_id]) {
      return ProdCustomizeService.saveProdSyllabus(syllabus, product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("saveProdSyllabusSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get prod customize syllabus-----------------
     */
    getProdSyllabus({ commit }, product_id) {
      return ProdCustomizeService.getProdSyllabus(product_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getProdSyllabusSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
    prod_header: (state) => state.prod_header,
    prod_footer: (state) => state.prod_footer,
    prod_hero: (state) => state.prod_hero,
    prod_slidebar: (state) => state.prod_slidebar,
    prod_settings: (state) => state.prod_settings,
    prod_welcome: (state) => state.prod_welcome,
    prod_syllabus: (state) => state.prod_syllabus,
  },

  mutations: {
    /**
     * ---------get prod header success mutation ----------------
     */
    getProdHeaderSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_header = res.data;
      store.state.notification_text = "Header successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod header success mutation ----------------
     */
    saveProdHeaderSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_header = res.data;
      store.state.notification_text = "Header successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod footer success mutation ----------------
     */
    getProdFooterSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_footer = res.data;
      store.state.notification_text = "Footer successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod footer success mutation ----------------
     */
    saveProdFooterSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_footer = res.data;
      store.state.notification_text = "Footer successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Hero success mutation ----------------
     */
    getProdHeroSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_hero = res.data;
      store.state.notification_text = "Hero successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Hero success mutation ----------------
     */
    saveProdHeroSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_hero = res.data;
      store.state.notification_text = "Hero successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },
    /**
     * ---------get prod Hero success mutation ----------------
     */
    getProdSettingsSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_settings = res.data;
      store.state.notification_text = "Settings successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Hero success mutation ----------------
     */
    saveProdSettingsSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_settings = res.data;
      store.state.notification_text = "Settings successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Hero success mutation ----------------
     */
    getProdSlidebarSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_slidebar = res.data;
      store.state.notification_text = "Slidebar successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Hero success mutation ----------------
     */
    saveProdSlidebarSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_slidebar = res.data;
      store.state.notification_text = "Slidebar successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Welcome success mutation ----------------
     */
    getProdWellcomeSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_welcome = res.data;
      store.state.notification_text = "Welcome successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Wellcome success mutation ----------------
     */
    saveProdWellcomeSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_welcome = res.data;
      store.state.notification_text = "Welcome successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Syllabus success mutation ----------------
     */
    getProdSyllabusSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_syllabus = res.data;
      store.state.notification_text = "Syllabus successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    /**
     * ---------get prod Syllabus success mutation ----------------
     */
    saveProdSyllabusSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      state.prod_syllabus = res.data;
      store.state.notification_text = "Syllabus successfully updated!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
    },

    RESET_MODULE(state) {
      Object.assign(state, initialState);
    },
  },
};

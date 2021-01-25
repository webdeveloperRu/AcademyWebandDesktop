import OfferService from '../services/offers.service';
import store from './index'
const initialState = {
  offer_list: [],
  current_offer: [],
  testimonial_title: 'What People Are Saying',
  testimonials: [],
  service_agreement: [],
  extra_contact_information: [],
  offer_stats: {},
  current_public_offer: [],
  checkout_new_design: true,
};
export const offerManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get offer list-------------------
     */
    getOfferList({
      commit
    }) {
      return OfferService.getOfferList().then(
        res => {
          if (res.status === 200) {
            commit('getOfferListSuccess', res);
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
     * ---------add new offer -----------------
     */
    addOffer({
      commit
    }, offer) {
      return OfferService.addOffer(offer).then(
        res => {
          if (res.status === 200) {
            commit('addOfferSuccess', res);
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
     * ---------update new offer -----------------
     */
    updateOfferByID({
      commit
    }, offer) {
      return OfferService.updateOfferByID(offer).then(
        res => {
          if (res.status === 200) {
            commit('updateOfferByIDSuccess', res);
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
     * ---------delete offer id -----------------
     */
    deleteOfferByID({
      commit
    }, offer_id) {
      return OfferService.deleteOfferByID(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('deleteOfferByIDSuccess');
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
     * ---------get offer id -----------------
     */
    getOfferByID({
      commit
    }, offer_id) {
      return OfferService.getOfferByID(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('getOfferByIDSuccess', res);
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
    }, [offer_id, thumbnail]) {
      return OfferService.saveThumbNail(offer_id, thumbnail).then(
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
    }, offer_id) {
      return OfferService.removeThumbNail(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('removeThumbNailSuccess', res);
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
     * set Testmonial title
     */
    setTestimonialTitle({
      commit
    }, testimonial_title) {
      commit('setTestimonialTitle', testimonial_title)
    },

    /**
     *  add Testimonial 
     */
    addTestimonial({
      commit
    }, [testimonial, offer_id]) {
      return OfferService.addTestimonial(testimonial, offer_id).then(
        res => {
          if (res.status === 200) {
            commit('addTestimonialSuccess');
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
     *  add Testimonial 
     */
    getTestimonial({
      commit
    }, offer_id) {
      return OfferService.getTestimonial(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('getTestimonialSuccess', res);
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
     *  get service agreement
     */
    getServiceAgreement({
      commit
    }, offer_id) {
      return OfferService.getServiceAgreement(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('getServiceAgreementSuccess', res);
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
    // save service agreement

    saveServiceAgreement({
      commit
    }, [agreement, offer_id]) {
      return OfferService.saveServiceAgreement(agreement, offer_id).then(
        res => {
          if (res.status === 200) {
            commit('saveServiceAgreementSuccess', res);
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

    // get extra contact information
    getExtraContactInformation({
      commit
    }, offer_id) {
      return OfferService.getExtraContactInformation(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('getExtraContactInformationSuccess', res);
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
    // save extra contact information
    saveExtraContactInformation({
      commit
    }, [extra_info, offer_id]) {
      return OfferService.saveExtraContactInformation(extra_info, offer_id).then(
        res => {
          if (res.status === 200) {
            commit('saveExtraContactInformationSuccess', res);
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
     * ---------save banner------------
     */
    saveBanner({
      commit
    }, [offer_id, banner]) {
      return OfferService.saveBanner(offer_id, banner).then(
        res => {
          if (res.status === 200) {
            commit('saveBannerSuccess', res);
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
     * ---------remove banner------------
     */
    removeBanner({
      commit
    }, offer_id) {
      return OfferService.removeBanner(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('removeBannerSuccess', res);
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
     * ---------get offer stats id------------
     */
    getOfferStats({
      commit
    }, [offer_id, days]) {
      return OfferService.getOfferStats(offer_id, days).then(
        res => {
          if (res.status === 200) {
            commit('getOfferStatsSuccess', {
              res,
              offer_id
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
     * get public offer data
     */
    /**
     * ---------get offer id -----------------
     */
    getPublicOfferByID({
      commit
    }, offer_id) {
      return OfferService.getPublicOfferByID(offer_id).then(
        res => {
          if (res.status === 200) {
            commit('getPublicOfferByIDSuccess', res);
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
     * set new desgin
     */
    setNewDesign({
      commit
    }, new_desgin) {
      commit('setNewDesign', new_desgin)
    }
  },

  getters: {
    offer_list: state => state.offer_list,
    current_offer: state => state.current_offer,
    testimonial_title: state => state.testimonial_title,
    testimonials: state => state.testimonials,
    service_agreement: state => state.service_agreement,
    extra_contact_information: state => state.extra_contact_information,
    offer_stats: state => state.offer_stats
  },

  mutations: {
    /**
     * ---------get offer by ID Success ----------------
     */
    getOfferByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Offer successfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_offer = res.data
    },


    /**
     * ---------get offer List  ----------------
     */
    getOfferListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Found ' + res.data.data.length + ' offers';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      if (res.data == undefined) {
        state.offer_list = []
      } else {
        state.offer_list = res.data.data
      }
    },

    /**
     * ---------delete offer success ----------------
     */
    deleteOfferByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'offer is deleted!';
    },

    /**
     * ---------add offer Success ----------------
     */
    addOfferSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'New Offer successfully added!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.offer_list.push(res.data.data)
    },


    /**
     * ---------update proudct Success ----------------
     */
    updateOfferByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Offer successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_offer = res.data.data
    },


    // success save thumb Nail
    saveThumbNailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'ThumbNail successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';

    },

    // remove save thumb Nail
    removeThumbNailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'ThumbNail removed!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    },


    // addTestimonialSuccess
    addTestimonialSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Testimonial succesfully added!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    // getTestimonialSuccess
    getTestimonialSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'testimonial successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.testimonials = res.data.items;
    },

    // getServiceAgreementSuccess
    getServiceAgreementSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'service agreement successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.service_agreement = JSON.parse(res.data);
    },

    // saveServiceAgreementSuccess
    saveServiceAgreementSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'service agreement sucessfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.service_agreement = JSON.parse(res.data);
    },

    getExtraContactInformationSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'extra contact information sucessfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.extra_contact_information = res.data
    },

    saveExtraContactInformationSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'extra contact information sucessfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.extra_contact_information = res.data
    },
    // success save thumb Nail
    saveBannerSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Banner successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_offer = res.data.data

    },

    // remove save thumb Nail
    removeBannerSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Banner removed!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    // get offer stats success

    getOfferStatsSuccess(state, {
      res,
      offer_id
    }) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'current offer stat data succesfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.offer_stats[offer_id] = res.data
    },

    /**
     * ---------get offer by ID Success ----------------
     */
    getPublicOfferByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Offer successfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_public_offer = res.data.data
    },

    setNewDesign(state, new_design) {
      state.checkout_new_design = new_design;
    },

    setTestimonialTitle(state, testimonial_title) {
      state.testimonial_title = testimonial_title;
    }

  }
};
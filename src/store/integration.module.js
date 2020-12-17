import IntegrationService from '../services/Integration.service';
import store from './index'
const initialState = {
    integrations:[],
    mailchimp: [],
    mailchimp_data: [],
    drip: [],
    drip_data: [],
    convert_kit: [],
    convert_kit_data: [],
    segment: [],
    segment_data: [],
    facebook_pixel: [],
    facebook_pixel_data: [],
    google_analytics: [],
    google_analytics_data: [],
    active_campaign: [],
    active_campaign_data: [],
    amazon: [],
    amazon_data: [],
    paypal: [],
    paypal_data: [],
    btcpay: [],
    btcpay_data: [],
    stripe: [],
    stripe_data:[],

};
export const integrationManage = {
  namespaced: true,
  state: initialState,
  actions: {

   /**
   * ---------get integration list--------
   */
  getIntegrationList({commit}) {
    return IntegrationService.getIntegrationList().then(
        res => {
          if(res.status ===200){
            commit('getIntegrationListSuccess', res);
          }
          else{
            commit('getIntegrationListFailed', res.response);
          }
        },
        error => {
          commit('getIntegrationListFailed', error.response);
        }
      );
  },

   /**
   * ---------integration config-------------------
   */
  getIntegrationConfig({commit}, slug) {
      return IntegrationService.getIntegrationConfig(slug).then(
        res => {
          if(res.status ===200){
            commit('getIntegrationConfigSuccess', res);
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
    * ---------delete integration config -----------------
    */
   deleteIntegrationConfig({commit}) {
      return IntegrationService.deleteIntegrationConfig().then(
        res => {
          if(res.status ===200){
            commit('deleteIntegrationConfigSuccess');
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
    * ---------setup integration config-----------------
    */
   setupIntegrationConfig({commit}, config_data) {
      return IntegrationService.setupIntegrationConfig(config_data).then(
        res => {
          if(res.status ===200){
            commit('setupIntegrationConfigSuccess', res);
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

  },

  getters: {
    integrations: state=>state.integrations,
    mailchimp: state=>state.mailchimp,
    drip: state=>state.drip,
    convert_kit: state=>state.convert_kit,
    segment: state=>state.segment,
    facebook_pixel: state=>state.facebook_pixel,
    google_analytics: state=>state.google_analytics,
    active_campaign: state=>state.active_campaign,
    amazon: state=>state.amazon,
    stripe: state=>state.stripe,
    paypal: state=>state.paypal,
    btcpay: state=>state.btcpay,
    mailchimp_data: state=>state.mailchimp_data,
    drip_data: state=>state.drip_data,
    convert_kit_data: state=>state.convert_kit_data,
    segment_data: state=>state.segment_data,
    facebook_pixel_data: state=>state.facebook_pixel_data,
    google_analytics_data: state=>state.google_analytics_data,
    active_campaign_data: state=>state.active_campaign_data,
    amazon_data: state=>state.amazon_data,
    stripe_data: state=>state.stripe_data,
    paypal_data: state=>state.paypal_data,
    btcpay_data: state=>state.btcpay_data,

  },

  mutations: {

    /**
     * -----------get integration list--------------
     */

    getIntegrationListSuccess(state, res) {
      store.state.status = { got: true};
      store.state.notification_text = '' ;
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.integrations = res.data;
      state.mailchimp = state.integrations[0].services[0];
      state.drip = state.integrations[0].services[1];
      state.convert_kit = state.integrations[0].services[2];
      state.active_campaign = state.integrations[0].services[3];
      state.segment = state.integrations[0].services[4];
      state.google_analytics = state.integrations[1].services[0]
      state.facebook_pixel = state.integrations[1].services[1]
      state.amazon = state.integrations[2].services[0]
      state.paypal  = state.integrations[3].services[0]
      state.stripe  = state.integrations[3].services[1]
      state.btcpay  = state.integrations[3].services[2]
    },

    getIntegrationListFailed(state, error){
      store.state.status = {};
      store.state.notification_icon = "warning"
      store.state.notification_color = "#ff3300"
      store.state.notification_text = error.data.message;
    },

     /**
     * -----------get integration config--------------
     */
    getIntegrationConfigSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = '' ;
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
       switch (res.data.integration_type) {
            case 'mailchimp':
              state.mailchimp_data = res.data              
              break;
            case 'drip':
              state.drip_data = res.data              
              break;

            case 'convert_kit':
              state.convert_kit_data = res.data              
              break;

            case 'active_campaign':
              state.active_campaign_data = res.data              
              break;

            case 'segment':
              state.segment_data = res.data              
              break;

            case 'google_analytics':
              state.google_analytics_data = res.data              
              break;

            case 'facebook_pixel':
              state.facebook_pixel_data = res.data              
              break;

            case 'amazon_s3':
              state.amazon_data = res.data 
              break;

            case 'paypal':
              state.paypal_data = res.data 
              break;

            case 'stripe':
              state.stripe_data = res.data 
              break;

            case 'btcpay':
              state.btcpay_data = res.data 
              break;
          
            default:
              break;
          }
    },

    
    /**
     * ---------delete integration config ----------------
     */
    deleteIntegrationConfigSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = '';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },
    
    
    /**
     * ---------setup integration config ---------------
     */
    setupIntegrationConfigSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'Third party configuration succesfully udpated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      switch (res.data.integration_type) {
        case 'mailchimp':
          state.mailchimp_data = res.data              
          break;
        case 'drip':
          state.drip_data = res.data              
          break;

        case 'convert_kit':
          state.convert_kit_data = res.data              
          break;

        case 'active_campaign':
          state.active_campaign_data = res.data              
          break;

        case 'segment':
          state.segment_data = res.data              
          break;

        case 'google_analytics':
          state.google_analytics_data = res.data              
          break;

        case 'facebook_pixel':
          state.facebook_pixel_data = res.data              
          break;

        case 'amazon_s3':
          state.amazon_data = res.data 
          break;

        case 'paypal':
          state.paypal_data = res.data 
          break;

        case 'stripe':
          state.stripe_data = res.data 
          break;

        case 'btcpay':
          state.btcpay_data = res.data 
          break;
      
        default:
          break;
      }
    },

    RESET_MODULE (state) {
      
      Object.assign(state, initialState)
     }

    
  }
};
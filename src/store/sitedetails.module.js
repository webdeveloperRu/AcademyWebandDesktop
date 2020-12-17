import SiteDetailsService from '../services/sitedetails.service';
import store from './index'
const initialState = {
    site_details:[],
};
export const siteDetailsManage = {
  namespaced: true,
  state: initialState,
  actions: {
   /**
   * ---------get all site details-------------------
   */
    getSiteDetails({commit}) {
      return SiteDetailsService.getSiteDetails().then(
        res => {
          if(res.status ===200){
            commit('getSiteDetailsSuccess', res);
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
    * ---------setup site details-----------------
    */
   setupSiteDetails({commit}, site_details) {
    return SiteDetailsService.setupSiteDetails(site_details).then(
      res => {
        if(res.status ===200){
          commit('setupSiteDetailsSuccess');
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
    * ---------get site details info -----------------
    */
   getSiteDetailsInfo({commit}) {
    return SiteDetailsService.getSiteDetailsInfo().then(
      res => {
        if(res.status ===200){
          commit('getSiteDetailsInfoSuccess');
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
    * ---------get site details info -----------------
    */
   setupSiteDetailsInfo({commit}, site_info) {
    return SiteDetailsService.setupSiteDetailsInfo(site_info).then(
      res => {
        if(res.status ===200){
          commit('setupSiteDetailsInfoSuccess');
          commit('updateSiteDetailsInfo', site_info);
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
    * ---------setup default instructor for user -----------------
    */
   setupDefaultInstructor({commit}, instructor) {
    return SiteDetailsService.setupDefaultInstructor(instructor).then(
      res => {
        if(res.status ===200){
          commit('setupDefaultInstructorSuccess', res);
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
    * ---------get default instructor for user -----------------
    */
   getDefaultInstructor({commit}) {
    return SiteDetailsService.getDefaultInstructor().then(
      res => {
        if(res.status ===200){
          commit('getDefaultInstructorSuccess');
        }
        else {
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
    * ---------set up page script-----------------
    */
   setupPageScript({commit}, script) {
    return SiteDetailsService.setupPageScript(script).then(
      res => {
        if(res.status ===200){
          commit('setupPageScriptSuccess', res);
        }
        else{
          if(res.response == undefined)
              commit('NETWORK_ERROR', null, { root: true });
          else
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
    * ---------get page script-----------------
    */
   getPageScript({commit}) {
    return SiteDetailsService.getPageScript().then(
      res => {
        if(res.status ===200){
          commit('getPageScriptSuccess', res);
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
    * ---------delete page script-----------------
    */
   deletePageScript({commit}) {
    return SiteDetailsService. deletePageScript().then(
      res => {
        if(res.status ===200){
          commit('deletePageScriptSuccess');
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
    * ---------setup seo and sharing-----------------
    */
   setupSeoAndSharing({commit}, seo_and_sharing) {
    return SiteDetailsService. setupSeoAndSharing(seo_and_sharing).then(
      res => {
        if(res.status ===200){
          commit('setupSeoAndSharingSuccess', res);
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
    * ---------get seo and sharing-----------------
    */
   getSeoAndSharing({commit}) {
    return SiteDetailsService. getSeoAndSharing().then(
      res => {
        if(res.status ===200){
          commit('getSeoAndSharingSuccess');
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
    * ---------setup branding-----------------
    */
   setupBranding({commit}, branding) {
    return SiteDetailsService.setupBranding(branding).then(
      res => {
        if(res.status ===200){
          commit('setupBrandingSuccess', res);
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
    * ---------get branding-----------------
    */
   getBranding({commit}) {
    return SiteDetailsService. getBranding().then(
      res => {
        if(res.status ===200){
          commit('getBrandingSuccess', res);
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
    * ---------get branding-----------------
    */
   removeInstructorImage({commit}) {
    return SiteDetailsService. removeInstructorImage().then(
      res => {
        if(res.status ===200){
          commit('removeInstructorImageSuccess', res);
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
    * ---------remove page image-----------------
    */
   removePageImage({commit}) {
    return SiteDetailsService. removePageImage().then(
      res => {
        if(res.status ===200){
          commit('removePageImageSuccess', res);
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
    * ---------remove page image-----------------
    */
   removeBrandingImage({commit}, param) {
    return SiteDetailsService. removeBrandingImage(param).then(
      res => {
        if(res.status ===200){
          commit('removeBrandingImageSuccess', res);
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
    site_details: state=>state.site_details,
  },

  mutations: {
    /**
     * ---------get site details  ----------------
     */
    getSiteDetailsSuccess(state, res){
      store.state.status = { got: true};
      state.site_details = res.data;
      store.state.notification_text = 'site details successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },
    /**
     * ---------setup site details----------------
     */
    setupSiteDetailsSuccess(){
      store.state.status = { got: true};
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'site details successfully set';
    },



    /**
     * --------get site details info ----------------
     */
    getSiteDetailsInfoSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = '';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

 

     /**
     * --------set site details info ----------------
     */
    setupSiteDetailsInfoSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = 'Site info successfully udpated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
     
    },

    /**
     * --------setupDefaultInstructor ----------------
     */
    setupDefaultInstructorSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'Instructor successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.site_details.instructor = res.data;
    },


    /**
     * --------get default instructor for user  ----------------
     */
    getDefaultInstructorSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = '';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    
    /**
     * --------set up page script  ----------------
     */
    setupPageScriptSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'Page script successfully supdated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.site_details.page_scripts = res.data;
    },

   

    /**
     * --------set up page script  ----------------
     */
    deletePageScriptSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = '';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    

     /**
     * --------setup seo and sharing-  ----------------
     */
    setupSeoAndSharingSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'seo and share successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.site_details.seo_and_sharing = res.data;
    },

    

    /**
     * --------get seo and sharing ----------------
     */
    getSeoAndSharingSuccess(){
      store.state.status = { got: true};
      store.state.notification_text = '';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

   
    /**
     * --------setup branding -  ----------------
     */
    setupBrandingSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'branding successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.site_details.branding = res.data;
    },

   
    /**
     * --------get branding ----------------
     */
    getBrandingSuccess(state, res){
      store.state.status = { got: true};
      store.state.notification_text = 'branding successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.site_details.branding = res.data;
    },

    // update site info

    updateSiteDetailsInfo(state, site_info) {
      state.site_details.default_currency = site_info.default_currency;
      state.site_details.subdomain = site_info.subdomain;
      state.site_details.support_email = site_info.support_email;
      state.site_details.phone_number = site_info.phone_number;
      state.site_details.language = site_info.language;
      state.site_details.title = site_info.title;
    },
    
    removeInstructorImageSuccess() {
      store.state.status = { got: true};
      store.state.notification_text = 'instructor image removed';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    removePageImageSuccess() {
      store.state.status = { got: true};
      store.state.notification_text = 'page image removed';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';

    },

    removeBrandingImageSuccess() {
      store.state.status = { got: true};
      store.state.notification_text = 'branding image removed';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';

    },

    RESET_MODULE (state) {
      
      Object.assign(state, initialState)
     }


  }
};
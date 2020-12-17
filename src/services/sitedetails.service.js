import axios from 'axios';
import apiurl from './base_api_url'
import {authHeaderV2} from './authHeaderV2'
const API_URL = apiurl.API_URL_V2+'site-details/';
class SiteDetailsService { 
  /**
   * ---------get all site details ---------
   */
  getSiteDetails() {
    return axios
      .get(API_URL + 'all',  {headers:  authHeaderV2()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------setup site details ---------
   */
  setupSiteDetails(site_details) {
    site_details = JSON.stringify(site_details);
    return axios
      .post(API_URL + 'info', site_details, {headers:  authHeaderV2()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get site details info---------------
   */
  getSiteDetailsInfo() {
    return axios
      .get(API_URL + 'info', 
        {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------setup site details info ---------------
   */
  setupSiteDetailsInfo(site_info) {
    return axios
      .post(API_URL + 'info', 
        site_info,
        {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------setup default instructor for user ---------------
   */
  setupDefaultInstructor(instructor) {
    var FormData = require('form-data');
    var data = new FormData()
    data.append('headshot', instructor.headshot);
    data.append('name', instructor.name);
    data.append('title', instructor.title);
    return axios
      .post(API_URL + 'instructor', 
      data,
        {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------get default instructor for user ---------------
   */
  getDefaultInstructor() {
    return axios
      .get(API_URL + 'instructor', 
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------setup page script---------------
   */
  setupPageScript(script) {
    return axios
      .post(API_URL + 'scripts',
      script,
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get page script---------------
   */
  getPageScript() {
    return axios
      .get(API_URL + 'scripts',
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete page script---------------
   */
  deletePageScript() {
    return axios
      .delete(API_URL + 'scripts',
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------setup seo and sharing---------------
   */
  setupSeoAndSharing(seo_and_sharing) {
    var FormData = require('form-data');
    var data = new FormData()
    data.append('page_image', seo_and_sharing.page_image);
    data.append('page_title', seo_and_sharing.page_title);
    data.append('page_description', seo_and_sharing.page_description);
    return axios
      .post(API_URL + 'share',
      data,
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  
  /**
   * ---------get seo and sharing---------------
   */
  getSeoAndSharing() {
    return axios
      .get(API_URL + 'share',
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------setup branding--------------
   */
  setupBranding(branding) {
    var FormData = require('form-data');
    var data = new FormData()
    data.append('logo', branding.logo);
    data.append('favicon', branding.favicon);
    return axios
      .post(API_URL + 'branding',
      data,
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  
  /**
   * ---------get branding---------------
   */
  getBranding() {
    return axios
      .get(API_URL + 'branding',
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

    
  /**
   * ---------remvoe instructor image----
   */
  removeInstructorImage() {
    return axios
      .delete(API_URL + 'img/instructor',
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

    
  /**
   * ---------remvoe page image----
   */
  removePageImage() {
    return axios
      .delete(API_URL + 'img/share',
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------remvoe branding image----
   */
  removeBrandingImage(param) {
    return axios
      .delete(API_URL + 'branding/remove/'+ param,
      {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }
  




}
export default new SiteDetailsService();
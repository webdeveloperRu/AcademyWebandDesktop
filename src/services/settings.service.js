import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
import {authHeaderV2} from './authHeaderV2'
const API_URL = apiurl.API_URL_V2+'settings/';
class SettingService { 
  /**
   * ---------get notification ---------
   */
  getNotification() {
    return axios
      .get(API_URL+'notifications',  {headers:  authHeaderV2()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------update notification-----------------------
   */
  setNotification(notificaton) {
    return axios
      .post(API_URL+'notifications', 
       notificaton,
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------set custom domain-----------------------
   */
  setCustomDomain(custom_domain) {
    return axios
      .put(API_URL+'custom_domain', 
       custom_domain,
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get custom domain-----------------------
   */
  getCustomDomain() {
    return axios
      .get(API_URL+'custom_domain', 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete custom domain-----------------------
   */
  deleteCustomDomain() {
    return axios
      .delete(API_URL+'custom_domain', 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }
  /**
  * ---------set billing adderess-----------------------
   */
  setBillingAddress(billing_address) {
    return axios
      .put(API_URL+'billing-address', 
       billing_address,
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get custom domain-----------------------
   */
  getBillingAddress() {
    return axios
      .get(API_URL+'billing-address', 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get Account details-----------------------
   */
  getAccountDetails() {
    return axios
      .get(API_URL+'account-details', 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------set Account details-----------------------
   */
  setAccountDetails(account_details) {
    let header = {'apikey': store.state.auth.user.token, "accept": "application/json",'Content-Type': 'multipart/form-data'};
    var FormData = require('form-data');
    var data = new FormData()
    data.append('email', account_details.email);
    data.append('name', account_details.name);
    data.append('phone', account_details.phone);
    data.append('time_zone', account_details.time_zone);
    data.append('social_bio', account_details.social_bio);
    data.append('location', account_details.location);
    return axios
      .post(API_URL+'account-details', 
        data,
        {headers: header})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete Account details-----------------------
   */
  deleteAccountDetails() {
    return axios
      .delete(API_URL+'account-details', 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------set Account Avatar-----------------------
   */
  setAccountAvatar(avatar) {
    var FormData = require('form-data');
    var data = new FormData()
    data.append('avatar', avatar);
    return axios
      .put(API_URL+'account-details/avatar', 
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
   * ---------delete Account Avatar-----------------------
   */
  deleteAccountAvatar() {
    return axios
      .delete(API_URL+'account-details/avatar', 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }



 



}
export default new SettingService();
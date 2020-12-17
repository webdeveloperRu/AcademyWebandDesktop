import axios from 'axios';
import apiurl from './base_api_url'
import {authHeaderV2} from './authHeaderV2'
const API_URL = apiurl.API_URL_V2+'sub-users/';
class SubUserService { 
  /**
   * ---------add new SubUser---------
   */
  addSubUser(subUser) {
    return axios
      .post(API_URL,  subUser, {headers:  authHeaderV2()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------get all SubUsers-----------------------
   */
  getSubUserList() {
    return axios
      .get(API_URL, 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------get SubUser by ID----------------
   */
  getSubUserByID(subUser_id) {
    return axios
      .get(API_URL+subUser_id, 
        {headers:  authHeaderV2()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------update SubUser by ID-----------------
   */
  updateSubUserByID(subUser) {
    return axios
      .put(API_URL+subUser.id, 
        subUser, 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete SubUser by ID---------------
   */
  deleteSubUserByID(subUser_id) {
    return axios
      .delete(API_URL+subUser_id, 
        {headers:  authHeaderV2()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
    
  }



}
export default new SubUserService();
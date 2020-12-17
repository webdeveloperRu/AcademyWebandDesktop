import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
import {authHeader} from './authHeader'
const API_URL = apiurl.API_URL+'category/';
class CategoryService { 
  /**
   * ---------add Category for product_id -------------------
   */
  addCategory(category, getLessonList) {
    return axios
      .post(API_URL+getLessonList+'/prod', 
        category, {headers:  authHeader()}).then(response => {
          return response;
        })
        .catch(err => {
          return err;
      });
  }

   /**
   * ---------get categroy by id -----------------------
   */
  getCategoryByID(category_id) {
    return axios
      .get(API_URL+category_id, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------delete category by id ----------------
   */
  deleteCategoryByID(category_id) {
    return axios
      .delete(API_URL+category_id, 
        {headers:  authHeader()})
      .then(response => {   
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  /**
   * ---------update category by ID-----------------
   */
  updateCategoryByID(category) {
    let list = JSON.stringify(category);
    return axios
      .put(API_URL+category.id, 
        list, {headers:  authHeader()}).then(response => {
          return response;
        })
        .catch(err => {
          return err;
      });
  }


  /**
   * ---------update Categories order for product ID----------
   */
  updateCategoryOrder(list, product_id){
     return axios
      .post(API_URL + product_id +'/list', 
        list, 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }
  /**
   * ---------get Offers for product ID---------------
   */
  getOffersForProductID() {

  }

  /**
   * ---------get voushers for product ID ------------
   */
  getVoushersForProductID() {

  }

  /**
   * ---------set Drip ----------
   */
  setDrip(category_id, dripDays){
     return axios
      .post(API_URL + category_id + '/drip',         
        {drip: dripDays},{headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

    /**
   * ---------save ThumbNail-----------------
   */
  saveThumbNail(category_id, thumbnail) {
    var FormData = require('form-data');
    var data = new FormData()

    let header = {'apikey': store.state.auth.user.token, 'Content-Type': 'multipart/form-data'};
    data.append('image', thumbnail);
    return axios
      .post(API_URL+category_id +'/thumbnail', data , {headers:  header}).then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
  }

   /**
   * ---------delete thumbnail by ID-----------------
   */

  removeThumbNail(category_id) {
    return axios
      .delete(API_URL+category_id +'/thumbnail', 
        {headers:  authHeader()})
      .then(response => {       
        return response;
      })
      .catch(err => {
        return err;
    });
    
  }

  
}
export default new CategoryService();
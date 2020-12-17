import axios from 'axios';
import apiurl from './base_api_url'
import {authHeaderV2} from './authHeaderV2'
import store from '../store'
const API_URL = apiurl.API_URL_V2+'integrations/';
class IntegrationService { 
   /**
   * ---------get integration list--------
   */
  getIntegrationList() {
     return axios
      .get(API_URL + 'list', 
        {headers:  authHeaderV2()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });

  }

  /**
   * ---------get integration config--------
   */
  getIntegrationConfig(slug) {
    return axios
     .get(API_URL + 'service/' + slug, 
       {headers:  authHeaderV2()})
     .then(response => {
       return response;
     })
     .catch(err => {
       return err;
   });

 }

 
  /**
   * ---------delete integration config--------
   */
  deleteIntegrationConfig(slug) {
    return axios
     .delete(API_URL + 'service/' + slug, 
       {headers:  authHeaderV2()})
     .then(response => {
       return response;
     })
     .catch(err => {
       return err;
   });
  }

   /**
   * ---------delete integration config--------
   */
  setupIntegrationConfig(config_data) {
    
    let header = {'apikey': store.state.auth.user.token, 'Content-Type': 'multipart/form-data'};
    var formData = new FormData();
    let data = JSON.stringify(config_data.data);
    formData.append("data", data);
    formData.append("slug", config_data.slug);
    return axios
     .post(API_URL + 'service', formData, {headers:  header}
       )
     .then(response => {
       return response;
     })
     .catch(err => {
       return err;
   });
  }
}
export default new IntegrationService();
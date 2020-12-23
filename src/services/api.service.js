import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
const API_URL = apiurl.API_URL + 'api-key/';
class ApiService {
  getApiKey() {
    return axios
      .get(API_URL, {
        headers: {
          'apikey': store.state.auth.user.token
        }
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
  createApiKey() {
    return axios
      .post(API_URL, {
        headers: {
          'apikey': store.state.auth.user.token
        }
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        // router.replace('/login')
        return err;
      });
  }
  deleteApiKey() {
    return axios
      .delete(API_URL, {
        headers: {
          'apikey': store.state.auth.user.token
        }
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        // router.replace('/login')
        return err;
      });
  }
}
export default new ApiService();
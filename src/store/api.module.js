import ApiService from '../services/api.service';
// import {store} from './index'
const initialState = {
  api_key: ''
};
export const apiManage = {
  namespaced: true,
  state: initialState,
  actions: {
    getApiKey({commit}) {
      return ApiService.getApiKey().then(
        res => {
          if(res.status ===200){
            commit('getApiKeySuccess', res);
          }
          else{
            commit('getApiKeyFailed', res.response);
          }
        },
        error => {
          commit('getApiKeyFailed', error.response);
        }
      );
    },
    createApiKey({commit}) {
      return ApiService.createApiKey().then(
        res => {
          if(res.status ===200){
            commit('createApiKeySuccess', res);
          }
          else{
            commit('createApiKeyFailed', res.response);
          }
        },
        error => {
          commit('createApiKeyFailed', error.response);
        }
      );
    },
    deleteApiKey({commit}) {
      return ApiService.deleteApiKey().then(
        res => {
          if(res.status ===200){
            commit('deleteApiKeySuccess');
          }
          else{
            commit('deleteApiKeyFailed', res.response);
          }
        },
        error => {
          commit('deleteApiKeyFailed', error.response);
        }
      );
    },
  },
  getters: {
    api_key: state=>state.api_key,
    error_text: state=>state.error_text
  },
  mutations: {
    getApiKeySuccess(state, res){
      state.status = { got: true};
      state.api_key = res.data.api_key;
      state.error_text = '';
    },
    getApiKeyFailed(state, error){
      state.status = {};
      state.error_text = error.statusText +' : \n' + error.data.message;
    },
    deleteApiKeySuccess(state){
      state.status = { got: true};
      state.api_key = '';
      state.error_text = '';
    },
    deleteApiKeyFailed(state, error){
      state.status = {};
      state.error_text = error.statusText +' : \n' + error.data.message;
    },
    createApiKeySuccess(state, res){
      state.status = { got: true};
      state.api_key = res.data.api_key;
      state.error_text = '';
    },
    createApiKeyFailed(state, error){
      state.status = {};
      state.error_text = error.statusText +' : \n' + error.data.message;
    },

    RESET_MODULE (state) {
      
      Object.assign(state, initialState)
     }


    
  }
};
import PeopleService from '../services/people.service';
import store from './index'
const initialState = {
  people_list: [],
  current_people: [],
};
export const peopleManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get offer list-------------------
     */
    getPeopleList({
      commit
    }) {
      return PeopleService.getPeopleList().then(
        res => {
          if (res.status === 200) {
            commit('getPeopleListSuccess', res);
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
     * ---------add new people -----------------
     */
    addPeople({
      commit
    }, people) {
      return PeopleService.addPeople(people).then(
        res => {
          if (res.status === 200) {
            commit('addPeopleSuccess', res);
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
     * ---------update new people -----------------
     */
    updatePeopleByID({
      commit
    }, [people, people_id]) {
      return PeopleService.updatePeopleByID(people, people_id).then(
        res => {
          if (res.status === 200) {
            commit('updatePeopleByIDSuccess', res);
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
     * ---------delete people id -----------------
     */
    deletePeopleByID({
      commit
    }, people_id) {
      return PeopleService.deletePeopleByID(people_id).then(
        res => {
          if (res.status === 200) {
            commit('removePeopleById', people_id);
            commit('deletePeopleByIDSuccess');
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
     * ---------delete people id -----------------
     */
    getPeopleByID({
      commit
    }, people_id) {
      return PeopleService.getPeopleByID(people_id).then(
        res => {
          if (res.status === 200) {
            commit('getPeopleByIDSuccess', res);
          } else {
            commit('getPeopleByIDFailed', res.response);
          }
        },
        error => {
          commit('getPeopleByIDFailed', error.response);
        }
      );
    },
  },

  getters: {
    people_list: state => state.people_list,
    current_people: state => state.current_people
  },

  mutations: {
    /**
     * ---------get people by ID Success ----------------
     */
    getPeopleByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'People successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_people = res.data
    },

    /**
     * ---------get people List  ----------------
     */
    getPeopleListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      if (res.data.items == undefined) {
        state.people_list = []
      } else {
        state.people_list = res.data.items
      }
      store.state.notification_text = 'Found ' + state.people_list.length + " people";
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    /**
     * ---------delete People success ----------------
     */
    deletePeopleByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'people deleted!';

    },

    removePeopleById(state, people_id) {
      for (let i = 0; i < state.people_list.length; i++) {
        if (state.people_list[i].id == people_id) {
          state.people_list.splice(i, 1)
        }
      }
    },

    /**
     * ---------add People Success ----------------
     */
    addPeopleSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'People successfully added!';
      state.people_list.push(res.data)
    },


    /**
     * ---------update proudct Success ----------------
     */
    updatePeopleByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'People successfully updated!';
      state.current_people = res.data.data
      for (let i = 0; i < state.people_list.length; i++) {
        if (state.people_list[i].id == state.current_people.id) {
          state.people_list[i] = state.current_people;
        }
      }

    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }


  }
};
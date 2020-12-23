import CommentService from '../services/comments.service';
import store from './index'
const initialState = {
  current_comment: [],
  comment_list: []
};
export const commentManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get comment list-------------------
     */
    getCommentList({
      commit
    }) {
      return CommentService.getCommentList().then(
        res => {
          if (res.status === 200) {
            commit('getCommentListSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------add new comment -----------------
     */
    addComment({
      commit
    }, comment) {
      return CommentService.addComment(comment).then(
        res => {
          if (res.status === 200) {
            commit('addCommentSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------update comment by Id -----------------
     */
    updateCommentByID({
      commit
    }, comment) {
      return CommentService.updateCommentByID(comment).then(
        res => {
          if (res.status === 200) {
            commit('updateCommentByIDSuccess');
            commit('updateCommentList', comment);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------delete comment id -----------------
     */
    deleteCommentByID({
      commit
    }, comment_id) {
      return CommentService.deleteCommentByID(comment_id).then(
        res => {
          if (res.status === 200) {
            commit('deleteCommentByIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------get comment by id -----------------
     */
    getCommentByID({
      commit
    }, comment_id) {
      return CommentService.getCommentByID(comment_id).then(
        res => {
          if (res.status === 200) {
            commit('getCommentByIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------get comment by lesson_id -----------------
     */
    getCommentByLessonID({
      commit
    }, lesson_id) {
      return CommentService.getCommentByLessonID(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('getCommentByLessonIDSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------get comment by product_id -----------------
     */
    getCommentByProductID({
      commit
    }, product_id) {
      return CommentService.getCommentByProductID(product_id).then(
        res => {
          if (res.status === 200) {
            commit('getCommentByProductIDSuccess');
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
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
     * ---------save ThmubNail------------
     */
    changeCommentStatus({
      commit
    }, comment) {
      return CommentService.changeCommentStatus(comment).then(
        res => {
          if (res.status === 200) {
            commit('changeCommentStatusSuccess');
            commit('updateCommentList', comment);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },






  },

  getters: {
    comment_list: state => state.comment_list,
    current_comment: state => state.current_comment,
  },

  mutations: {
    /**
     * ---------get comment List  ----------------
     */
    getCommentListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Found ' + res.data.items.length + ' comments';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      if (res.data == undefined) {
        state.comment_list = []
      } else {
        state.comment_list = res.data.items
      }
    },

    /**
     * ---------get comment by ID Success ----------------
     */
    getCommentByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'comment successfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // state.current_comment = res.data
    },



    /**
     * ---------get comment by lesson id Success ----------------
     */
    getCommentByLessonIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'comment successfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.lesson_comment = res.data.items;
    },



    /**
     * ---------get comment by lesson id Success ----------------
     */
    getCommentByProductIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'comment successfully got!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // state.current_comment = res.data.items;
    },




    /**
     * ---------delete comment success ----------------
     */
    deleteCommentByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'comment is deleted!';
    },


    /**
     * ---------add comment Success ----------------
     */
    addCommentSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'New comment successfully added!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      // state.comment_list.push(res.data.data)
    },


    /**
     * ---------update proudct Success ----------------
     */
    updateCommentByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'comment successfully updated!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    // success save thumb Nail
    changeCommentStatusSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'comment status successfully updated';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },



    // update commentlist
    updateCommentList(state, comment) {
      for (let i = 0; i < state.comment_list.length; i++) {
        if (state.comment_list[i].id == comment.id) {
          state.comment_list[i] = comment;
        }
      }
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }



  }
};
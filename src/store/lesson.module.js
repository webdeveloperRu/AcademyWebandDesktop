import LessonService from '../services/lesson.service';
import store from './index'
const initialState = {
  lesson_list: {},
  current_lesson: [],
  downloadfile_list: [],
  current_category_id: '',
  lesson_comment: "",
  current_downloadfile: []
};
export const lessonManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get lesson list-------------------
     */
    getLessonList({
      commit
    }, category_id) {
      return LessonService.getLessonList(category_id).then(
        res => {
          if (res.status === 200) {
            commit('setCategoryID', category_id)
            commit('getLessonListSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
              commit("initCurrentCategoryID")
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
          commit("initCurrentCategoryID")
        }
      );
    },

    /**
     * ---------add new lesson -----------------
     */
    addLesson({
      commit
    }, [lesson, category_id]) {
      return LessonService.addLesson(lesson, category_id).then(
        res => {
          if (res.status === 200) {
            commit('setCategoryID', category_id)
            commit('addLessonSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
              commit("initCurrentCategoryID")
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
          commit("initCurrentCategoryID")
        }
      );
    },

    /**
     * ---------get lesson by id--------------
     */
    getLessonByID({
      commit
    }, lesson_id) {
      return LessonService.getLessonByID(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('getLessonByIDSuccess', res);
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
     * ---------get comment by id--------------
     */
    getCommentByID({
      commit
    }, lesson_id) {
      return LessonService.getCommentByID(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('getCommentByIDSuccess');
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
     * ---------update lesson by id--------------
     */
    updateLessonByID({
      commit
    }, lesson) {
      return LessonService.updateLessonByID(lesson).then(
        res => {
          if (res.status === 200) {
            commit('updateLessonByIDSuccess');
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
     * ---------update lesson list --------------
     */
    updateLessonListOrder({
      commit
    }, [lesson_list, category_id]) {
      return LessonService.updateLessonListOrder(lesson_list, category_id).then(
        res => {
          if (res.status === 200) {
            commit('setCategoryID', category_id)
            commit('updateLessonListOrderSuccess', res);
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
     * ---------delete lesson by id ----------------
     */
    deleteLessonByID({
      commit
    }, [lesson_id, categoryIDForDelete]) {
      return LessonService.deleteLessonByID(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('setCategoryID', categoryIDForDelete)
            commit('deleteLessonByIDSuccess', lesson_id);
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
     * ---------save ThmubNail------------
     */
    saveThumbNail({
      commit
    }, [lesson_id, thumbnail]) {
      return LessonService.saveThumbNail(lesson_id, thumbnail).then(
        res => {
          if (res.status === 200) {
            commit('saveThumbNailSuccess');
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
     * ---------remove ThmubNail------------
     */
    removeThumbNail({
      commit
    }, lesson_id) {
      return LessonService.removeThumbNail(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('removeThumbNailSuccess');
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
     * ---------save Video------------
     */
    saveVideo({
      commit
    }, [lesson_id, video]) {
      return LessonService.saveVideo(lesson_id, video).then(
        res => {
          if (res.status === 200) {
            commit('saveVideoSuccess');
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
     * ---------remove Video------------
     */
    removeVideo({
      commit
    }, lesson_id) {
      return LessonService.removeVideo(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('removeVideoSuccess');
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
     * ---------save Dwonload file------------
     */
    saveDownloadFile({
      commit
    }, [lesson_id, download_file]) {
      return LessonService.saveDownloadFile(lesson_id, download_file).then(
        res => {
          if (res.status === 200) {
            commit('saveDownloadFileSuccess', res);
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
     * ---------remove download file------------
     */
    removeDownloadFile({
      commit
    }, file_id) {
      return LessonService.removeDownloadFile(file_id).then(
        res => {
          if (res.status === 200) {
            commit('removeDownloadFileSuccess', file_id);
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
     * ---------get download file list------------
     */
    getDownloadFileList({
      commit
    }, lesson_id) {
      return LessonService.getDownloadFileList(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('getDownloadFileListSuccess', res);
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
     * ---------remove Video------------
     */
    getDownloadFile({
      commit
    }, file_id) {
      return LessonService.getDownloadFile(file_id).then(
        res => {
          if (res.status === 200) {
            commit('getDownloadFileSuccess');
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
     * ---------change comment status------------
     */
    changeCommentStatus({
      commit
    }, [lesson_id, status]) {
      return LessonService.changeCommentStatus(lesson_id, status).then(
        res => {
          if (res.status === 200) {
            commit('changeCommentStatusSuccess', res);
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

    setCurrentLesson({ commit }, lesson) {
      commit("setCurrentLesson", lesson);
    },
  },

  getters: {
    lesson_list: state => state.lesson_list,
    current_downloadfile: state => state.current_downloadfile,
    downloadfile_list: state => state.downloadfile_list,
    current_lesson: state => state.current_lesson,
  },

  mutations: {
    setCategoryID(state, category_id) {
      state.current_category_id = category_id;
    },
    /**
     * ---------get lesson by ID Success ----------------
     */
    getLessonByIDSuccess(state, res) {
      store.state.status = {
        got: true
      };
      state.current_lesson = res.data
      store.state.notification_text = 'lesson is successfully set';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },

    /**
     * ---------get lesson List  ----------------
     */
    getLessonListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'lesson list successfully got';
      if (res.data.items.length == 0)
        state.lesson_list[state.current_category_id] = []
      else
        state.lesson_list[state.current_category_id] = res.data.items;
      state.current_category_id = ''
    },

    initCurrentCategoryID(state) {
      state.current_category_id = ''
    },

    /**
     * ---------delete lesson success ----------------
     */
    deleteLessonByIDSuccess(state, id) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Selected lesson deleted!';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      for (let i = 0; i < state.lesson_list[state.current_category_id].length; i++) {
        if (state.lesson_list[state.current_category_id][i].id == id) {
          state.lesson_list[state.current_category_id].splice(i, 1);
        }
      }
    },

    /**
     * ---------add lesson Success ----------------
     */
    addLessonSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'New lesson successfully added!';
      if (state.lesson_list[state.current_category_id] == undefined) {
        state.lesson_list[state.current_category_id] = [];
        state.lesson_list[state.current_category_id].push(res.data.data);
      } else {
        state.lesson_list[state.current_category_id].push(res.data.data);
      }
      state.current_category_id = ''
    },

    /**
     * ---------update lesson by id ----------------
     */
    updateLessonByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'Lesson successfully updated!';
    },



    /**
     * ---------get comment by id ----------------
     */
    getCommentByIDSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'comment successfully got';
      // state.lesson_comment = res.data.data
    },


    /**
     * ---------update lesson list ----------------
     */
    updateLessonListOrderSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      store.state.notification_text = 'Lesson order successfully updated';
      state.lesson_list[state.current_category_id] = res.data.items;
    },


    /**
     * ---------set updated lesson list ----------------
     */

    // setUpdateLessonList(state, {lesson_list, category_id}) {
    //   state.lesson_list[category_id] = []
    //   state.lesson_list[category_id] = lesson_list;
    // },

    // success save thumb Nail
    saveThumbNailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'ThumbNail successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    // remove save thumb Nail
    removeThumbNailSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'ThumbNail successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },


    // success save thumb Nail
    saveVideoSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'Video successfully saved';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },



    // remove save thumb Nail
    removeVideoSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'video removed';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
    },



    // getDownloadFileSuccess

    getDownloadFileSuccess() {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'download file  successfully got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      
      // state.current_downloadfile = res.data
    },

    // addDownloadFileSuccess

    saveDownloadFileSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'download file  successfully added';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.downloadfile_list.push(res.data.data)

    },

    // remove DownloadFile Success

    removeDownloadFileSuccess(state, file_id) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'download file  removed';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      for (let i = 0; i < state.downloadfile_list.length; i++) {
        if (state.downloadfile_list[i].id == file_id) {
          state.downloadfile_list.splice(i, 1);
        }
      }
    },


    // getDownloadFileList Success

    getDownloadFileListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'download file list got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.downloadfile_list = res.data.items

    },

    // changeCommentStatusSuccess
    changeCommentStatusSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'changed comment status';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.current_lesson = res.data;
    },

    setCurrentLesson(state, lesson) {
      state.current_lesson = lesson;
    },

    RESET_MODULE(state) {

      Object.assign(state, initialState)
    }




  }
};
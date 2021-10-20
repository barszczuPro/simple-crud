import Vue from "vue";
import Vuex from "vuex";
import { Api } from "@/types/api-types";
import { actions } from "@/store/actions";
import { mutations } from "@/store/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
    currentUser: null,
    dialog: false,
    editedUser: false,
  } as Api.User.Store.State,
  getters: {},
  mutations,
  actions,
});

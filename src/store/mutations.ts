import { MutationTree } from "vuex";
import { Api } from "@/types/api-types";
import UserStore = Api.User.Store.State;

export const mt = {
  FETCH_USERS: "FETCH_USERS",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SWITCH_DIALOG: "SWITCH_DIALOG",
  SET_EDITED_USER: "SET_EDITED_USER",
};

export const mutations: MutationTree<UserStore> = {
  [mt.FETCH_USERS](state, payload) {
    state.users = payload;
  },
  [mt.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  },
  [mt.SWITCH_DIALOG](state, payload) {
    state.dialog = payload;
  },
  [mt.SET_EDITED_USER](state, payload) {
    state.editedUser = payload;
  },
};

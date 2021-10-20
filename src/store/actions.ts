import Vue from "vue";
import { ActionContext, ActionTree } from "vuex";
import { Api, RootState } from "@/types/api-types";
import { mt } from "@/store/mutations";
import UserStore = Api.User.Store.State;

export const actions: ActionTree<UserStore, RootState> = {
  async fetchUsers({ commit }: ActionContext<UserStore, RootState>) {
    return Vue.$api.fetchUsers().then(({ data }) => {
      const mappedUser = data
        .map((user) => ({
          [user.id]: user,
        }))
        .reduce((x, y) => ({ ...x, ...y }), {});
      commit(mt.FETCH_USERS, mappedUser);
      return Promise.resolve(data);
    });
  },
  async createUser(
    { dispatch }: ActionContext<UserStore, RootState>,
    payload: Api.User.Requests.UserEditRequest
  ) {
    return Vue.$api.createUser(payload).then(() => dispatch("fetchUsers"));
  },
  async fetchSingleUser(
    { commit }: ActionContext<UserStore, RootState>,
    id: string
  ) {
    return Vue.$api.fetchSingleUser(id).then(({ data }) => {
      commit(mt.SET_CURRENT_USER, data);
      return Promise.resolve(data);
    });
  },
  async removeUser(
    { dispatch }: ActionContext<UserStore, RootState>,
    id: string
  ) {
    return Vue.$api.removeUser(id).then(() => dispatch("fetchUsers"));
  },
  async updateUser(
    { dispatch }: ActionContext<UserStore, RootState>,
    { id, payload }: { id: string; payload: Api.User.Requests.UserEditRequest }
  ) {
    return Vue.$api.updateUser(id, payload).then(({ data }) => {
      dispatch("fetchUsers");
      return Promise.resolve(data);
    });
  },
};

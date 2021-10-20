<template>
  <v-container>
    <modal>
      <create-user></create-user>
    </modal>
    <v-row>
      <v-col>
        <users-list />
      </v-col>
      <v-col>
        <user-info
          v-if="currentUser"
          :user="currentUser"
          @close="setCurrentUser(null)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";

@Component({
  components: {
    Modal: () => import("@/components/Modal.vue"),
    CreateUser: () => import("@/components/CreateUser.vue"),
    UsersList: () => import("@/components/UsersList.vue"),
    UserInfo: () => import("@/components/UserInfo.vue"),
  },
})
export default class Home extends Vue {
  @State currentUser: any;
  @Mutation("SET_CURRENT_USER") setCurrentUser: any;
}
</script>

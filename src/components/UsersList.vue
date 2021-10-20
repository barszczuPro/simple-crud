<template>
  <v-card class="mx-auto">
    <v-toolbar color="grey" dark>
      <v-toolbar-title>Użytkownicy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="switchDialog(true)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="(item, i) in users" :key="i">
        <v-list-item-icon>
          <v-icon v-text="`mdi-account`"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-text="`${item.firstName} ${item.lastName}`"
          ></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="editUser(i)">
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon @click="fetchSingleUser(i)">
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon @click="deleteUser(i)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

@Component
export default class UsersList extends Vue {
  @State users: any;
  @State currentUser: any;
  @Action fetchUsers: any;
  @Action removeUser: any;
  @Action fetchSingleUser: any;
  @Mutation("SWITCH_DIALOG") switchDialog: any;
  @Mutation("SET_CURRENT_USER") setCurrentUser: any;
  @Mutation("SET_EDITED_USER") setEditedUser: any;

  deleteUser(id: string): void {
    if (this.currentUser.id === id) {
      this.setCurrentUser(null);
    }
    this.removeUser(id);
  }

  editUser(id: string): void {
    this.setEditedUser(id);
    this.switchDialog(true);
  }

  mounted() {
    this.fetchUsers();
  }
}
</script>

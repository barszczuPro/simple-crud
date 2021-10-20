<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="grey">
        <v-toolbar-title>{{ titleDialog }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mx-2" icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component
export default class Modal extends Vue {
  @State dialog: any;
  @State editedUser: any;
  @Mutation("SWITCH_DIALOG") switchDialog: any;
  @Mutation("SET_EDITED_USER") setEditedUser: any;
  @Mutation("SET_CURRENT_USER") setCurrentUser: any;

  get titleDialog(): string {
    return !this.editedUser
      ? "Utwórz nowego użytkownika"
      : "Edytuj użytkownika";
  }

  closeDialog(): void {
    this.switchDialog(false);
    if (this.editedUser) {
      this.setEditedUser(false);
      this.setCurrentUser(null);
    }
  }
}
</script>

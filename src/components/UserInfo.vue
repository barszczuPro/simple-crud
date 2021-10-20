<template>
  <v-card class="mx-auto">
    <v-toolbar color="grey" dark>
      <v-toolbar-title>Użytkownik</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <template v-for="(item, i) in user">
        <v-list-item v-if="hideId(i)" :key="i">
          <v-list-item-icon>
            <v-icon v-text="icons[i]"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="isDate(i) ? formatDate(item) : item"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Api } from "@/types/api-types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserInfo extends Vue {
  @Prop({
    type: Object,
  })
  user?: Api.User.Responses.User | null;

  icons: { [key: string]: string } = {
    firstName: "mdi-account",
    lastName: "",
    email: "mdi-email",
    phone: "mdi-phone",
    birthDate: "mdi-calendar-range",
  };

  hideId(key: string): boolean {
    return key !== "id";
  }

  isDate(key: string): boolean {
    return key === "birthDate";
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pl-PL");
  }
}
</script>

<template>
  <v-container>
    <form>
      <v-text-field
        v-model="firstName"
        label="Imię"
        :error-messages="firstNameErrors"
        required
        @input="$v.firstName.$touch()"
        @blur="$v.firstName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Nazwisko"
        :error-messages="lastNameErrors"
        required
        @input="$v.lastName.$touch()"
        @blur="$v.lastName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
        :error-messages="emailErrors"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="Numer telefonu"
        :error-messages="phoneErrors"
        required
        @input="$v.phone.$touch()"
        @blur="$v.phone.$touch()"
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="birthDate"
            label="Data urodzenia"
            :error-messages="birthDateErrors"
            @input="$v.birthDate.$touch()"
            @blur="$v.birthDate.$touch()"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="birthDate"
          :active-picker.sync="activePicker"
          :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          "
          min="1950-01-01"
          @change="saveDataPicker"
        ></v-date-picker>
      </v-menu>
      <v-btn class="mr-4" @click="createOrEditUser"> Utwórz użytkownika </v-btn>
      <v-btn @click="clear"> Wyczyść </v-btn>
    </form>
  </v-container>
</template>

<script lang="ts">
import { Api } from "@/types/api-types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Validations } from "vuelidate-property-decorators";
import { required, numeric, email, minLength } from "vuelidate/lib/validators";
import { Action, Mutation, State } from "vuex-class";

@Component
export default class CreateUser extends Vue {
  @State editedUser: any;
  @Action createUser: any;
  @Action updateUser: any;
  @Action fetchSingleUser: any;
  @Mutation("SWITCH_DIALOG") switchDialog: any;
  @Mutation("SET_EDITED_USER") setEditedUser: any;
  @Mutation("SET_CURRENT_USER") setCurrentUser: any;

  @Validations()
  validations = {
    firstName: { required, minLength: minLength(5) },
    lastName: { required, minLength: minLength(5) },
    email: { required, email },
    phone: { required, numeric, minLength: minLength(9) },
    birthDate: { required },
  };

  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  birthDate: string | null = null;
  activePicker = null;
  menu = false;

  get firstNameErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.firstName.$dirty) return errors;
    !this.$v.firstName.minLength && errors.push("Minimum 5 znaków");
    !this.$v.firstName.required && errors.push("Imię jest wymagane");
    return errors;
  }
  get lastNameErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.lastName.$dirty) return errors;
    !this.$v.lastName.minLength && errors.push("Minimum 5 znaków");
    !this.$v.lastName.required && errors.push("Nazwisko jest wymagane");
    return errors;
  }
  get emailErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.email.$dirty) return errors;
    !this.$v.email.email && errors.push("Wpisz poprawny adres E-mail");
    !this.$v.email.required && errors.push("E-mail jest wymagane");
    return errors;
  }
  get phoneErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.phone.$dirty) return errors;
    !this.$v.phone.minLength && errors.push("Minimum 9 znaków");
    !this.$v.phone.numeric && errors.push("Wymagane jedynie cyfry");
    !this.$v.phone.required && errors.push("Numer telefonu jest wymagane");
    return errors;
  }
  get birthDateErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.birthDate.$dirty) return errors;
    !this.$v.birthDate.required && errors.push("Data urodzenia jest wymagane");
    return errors;
  }

  saveDataPicker(date: string): void {
    this.$refs.menu?.save(date);
  }

  createOrEditUser() {
    this.editedUser ? this.onEditUser() : this.onCreateUser();
  }

  onCreateUser(): void {
    this.$v.$touch();
    if (this.$v.$dirty) {
      this.createUser({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        birthDate: this.birthDate,
      }).then(() => {
        this.clear();
        this.closeDialog();
      });
    }
  }

  onEditUser(): void {
    this.$v.$touch();
    if (this.$v.$dirty) {
      this.updateUser({
        id: this.editedUser,
        payload: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          birthDate: this.birthDate,
        },
      }).then(() => {
        this.clear();
        this.closeDialog();
      });
    }
  }

  clear(): void {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phone = "";
    this.birthDate = "";
    this.$v.$reset();
  }

  closeDialog(): void {
    this.switchDialog(false);
    if (this.editedUser) {
      this.setEditedUser(false);
      this.setCurrentUser(null);
    }
  }

  @Watch("editedUser", { immediate: true })
  fetchEditedUser(): void {
    if (this.editedUser) {
      this.fetchSingleUser(this.editedUser).then(
        (res: Api.User.Responses.User) => {
          const { firstName, lastName, email, phone, birthDate } = res;
          this.firstName = firstName;
          this.lastName = lastName;
          this.email = email;
          this.phone = phone;
          this.birthDate = new Date(birthDate).toISOString().substr(0, 10);
        }
      );
    }
  }
}
</script>

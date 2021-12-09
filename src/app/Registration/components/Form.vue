<script>
import { validateEmail } from '@/utils/validate';
import { getTeamList } from '@/modules/Team/Team.api';
import { sortByName } from '@/utils/sorting';

export default {
  props: {
    form: {
      type: Object,
    },
  },
  data: () => ({
    dialog: true,
    valid: true,
    accept: false,
    online: false,
    snackbar: false,
    teams: [],
  }),
  computed: {
    account() {
      return this.$store.state.app.account;
    },
  },
  methods: {
    async init() {
      try {
        this.teams = sortByName(await getTeamList());
      } catch (e) {
        console.log(e);
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    validateEmail,
    handlerSubmit() {
      if (!this.validate()) {
        this.snackbar = true;
        return;
      }
      this.form.phone = `+${this.form.phone.replace(/\D/g, '')}`;
      if (this.form.phone[1] === '8') {
        this.form.phone = this.form.phone.replace('8', '7');
      }
      this.$emit('submit', this.form);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-toolbar-title>Регистрация</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          v-if="form"
        >
          <v-text-field
            label="Имя"
            v-model="form.firstName"
            :rules="[ v => !!v || '']"
            required
          />
          <v-text-field
            label="Фамилия"
            v-model="form.lastName"
            :rules="[ v => !!v || '']"
            required
          />
          <v-text-field
            label="Отчество"
            v-model="form.middleName"
          />
          <v-text-field
            label="Email"
            v-model="form.email"
            :rules="[ v => !!v || '', v => validateEmail(v) || '']"
            required
          />
          <v-text-field
            label="Телефон"
            v-model="form.phone"
            :rules="[ v => !!v || '', v => v.replace(/\D/g,'').length === 11 || '']"
            required
          />
          <v-autocomplete
            label="Компания"
            v-model="form.organizationUnitId"
            :items="teams"
            :rules="[ v => !!v || '']"
            :messages="[messageCompany]"
            required
          />
          <v-checkbox
            v-model="form.hideActivitiesByDefault"
            label="Скрывать тренировки по умолчанию"
          />
          <v-checkbox
            label="Даю согласие на обработку персональных данных"
            v-model="accept"
            :rules="[ v => !!v || '']"
          />
        </v-form>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="handlerSubmit" :disabled="!accept || !valid">Отправить</v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
      >
        Необходимо заполнить поля

        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

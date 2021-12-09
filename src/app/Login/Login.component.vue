<script>
import StoreMixin from '@/mixins/Store.vue';

export default {
  mixins: [
    StoreMixin,
  ],
  props: {},
  data: () => ({
    loading: false,
    dialog: true,
    valid: true,
    form: {
      login: '',
      password: '',
    },
    localhost: false,
  }),
  methods: {
    async handlerLogin() {
      if (this.loading || !this.$refs.form.validate()) {
        return;
      }
      this.loading = true;

      try {
        await this.$store.dispatch('login', this.form);
      } catch (e) {
        console.error('Ошибка');
      }
      this.loading = false;
    },
  },
  mounted() {
    this.localhost = window.location.hostname === 'localhost';
  },
};
</script>
<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="320"
    >
      <v-card>
        <v-card-title>
          Вход
          <v-spacer/>
          <v-btn icon class="mr-3" to="/">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider v-if="setting$.loginPassword"></v-divider>
        <v-card-text v-if="setting$.loginPassword">
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
            @submit="handlerLogin"
          >
            <v-text-field
              label="Логин"
              v-model="form.login"
              :rules="[ v => !!v || 'Введите логин']"
              required
              @keyup.enter="handlerLogin"
            />
            <v-text-field
              label="Пароль"
              type="password"
              v-model="form.password"
              :rules="[ v => !!v || 'Введите пароль']"
              @keyup.enter="handlerLogin"
              required
            />
            <v-btn @click="handlerLogin" block class="mt-3" color="primary">Войти</v-btn>
            <v-divider></v-divider>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-card-subtitle>Чтобы участвовать в событии необходимо авторизация через</v-card-subtitle>
          <v-btn link :href="setting$.strava" block>
            <span class="app-logo-strava"></span>
          </v-btn>
        </v-card-text>
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<style lang="scss">
  .app-logo-strava {
    display: inline-block;
    background: 50% 50% url(./img/strava.png) no-repeat;
    width: 91px;
    height: 20px;
  }
</style>

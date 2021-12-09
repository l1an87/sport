<script>
import AccountComponent from '../Account/Account.component.vue';

export default {
  components: {
    AccountComponent,
  },
  props: {},
  data: () => ({
    loading: true,
    login: false,
    registration: false,
    driver: null,
    edit: false,
    isHistoryState: false,
    editAccount: false,
  }),
  methods: {
    init() {
      this.loading = false;
    },
    handlerLogout() {
      this.loading = true;
      this.$store
        .dispatch('logout')
        .finally(() => {
          if (this.$route.fullPath !== '/') {
            this.$router.push('/');
          }
          this.loading = false;
        });
    },
  },
  computed: {
    account() {
      return this.$store.state.app.account;
    },
    isBack() {
      const path = (this.$route.fullPath || '/').match(/\//g);

      return path.length > 1 && this.isHistoryState;
    },
  },
  mounted() {
    this.isHistoryState = !!window.history.state;
    this.init();
  },
  updated() {
    this.isHistoryState = !!window.history.state;
  },
};
</script>
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dense
      dark
    >
      <v-app-bar-nav-icon v-if="!isBack" @click="driver = !driver"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon v-if="isBack" @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handlerLogout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="driver"
    >
      <v-list-item @click="editAccount=true">
        <v-list-item-avatar color="primary">
          <v-img :src="account.avatar" v-if="account.avatar"></v-img>
          <v-icon v-if="!account.avatar" dark>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ account.lastName }} {{ account.firstName }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="account.teamName">
            {{ account.teamName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list>
        <v-list-item
          to="/dashboard"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard-variant-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Личный кабинет
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/activity"
        >
          <v-list-item-icon>
            <v-icon>mdi-map-check-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Мои тренировки
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/task"
        >
          <v-list-item-icon>
            <v-icon>mdi-map-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Задачи
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/rating"
        >
          <v-list-item-icon>
            <v-icon>mdi-poll</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Рейтинг
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/news"
        >
          <v-list-item-icon>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Новости
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/chat"
        >
          <v-list-item-icon>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Чат
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/regulations"
        >
          <v-list-item-icon>
            <v-icon>mdi-book-information-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Правила
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/contact"
        >
          <v-list-item-icon>
            <v-icon>mdi-card-account-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Контакты
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <div style="height: 50px">
      <v-img src="./img/grass.png" height="50px"></v-img>
    </div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <AccountComponent
      v-if="editAccount"
      v-model="editAccount"
    />
  </v-app>
</template>
<style lang="scss">
  .img-max-width {
    img {
      max-width: 100%;
    }
  }

  @media (min-width: 1264px) {
    .container {
      max-width: 900px;
    }
  }

  @media (max-width: 600px) {
    .container {
      padding: 0!important;
    }
  }
</style>

<script>
import { getRatingList } from '@/modules/Rating/Rating.api';
import ListItems from '@/components/List.vue';
import Loader from '@/components/Loader.vue';
import UserComponent from './User.component.vue';
import TeamComponent from './Team.component.vue';

export default {
  components: {
    ListItems,
    Loader,
    UserComponent,
    TeamComponent,
  },
  props: {
    type: String,
    date: Date,
  },
  data: () => ({
    loading: true,
    tab: 0,
    team: null,
    teams: [],
    users: [],
  }),
  computed: {
    users$() {
      if (!this.team) return this.users;
      return this.users.filter(i => i.organizationUnitId === this.team.id);
    },
  },
  methods: {
    async init() {
      this.loading = true;
      const data = await getRatingList(this.date, this.type);
      this.teams = data.teams;
      this.users = data.users;
      this.loading = false;
    },
    handlerClickTeam(team = null) {
      this.tab = team ? 1 : 0;
      this.team = team;
    },
  },
  watch: {
    type() {
      this.init();
    },
    date() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>Команды</v-tab>
      <v-tab>Участники</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ListItems
          :items="teams"
          :size="20"
          :loading="loading"
          txt-no-entity="Команды отсутствуют"
        >
          <TeamComponent
            slot="item"
            slot-scope="{ item }"
            :item="item"
            @click="handlerClickTeam"
          />
        </ListItems>
      </v-tab-item>
      <v-tab-item>
        <TeamComponent
          v-if="team"
          :item="team"
          @click="handlerClickTeam()"
        />
        <v-divider v-if="team"/>
        <ListItems
          :items="users$"
          :size="20"
          :loading="loading"
          txt-no-entity="Участники отсутствуют"
          key-name="userId"
        >
          <UserComponent
            slot="item"
            slot-scope="{ item }"
            :item="item"
          />
        </ListItems>
      </v-tab-item>
    </v-tabs-items>
    <Loader
      :value="loading"
    />
  </div>
</template>
<style lang="scss">

</style>

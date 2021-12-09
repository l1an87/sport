<script>
import ListItems from '@/components/List.vue';
import Loader from '@/components/Loader.vue';
import UserComponent from './User.component.vue';
import TeamComponent from './Team.component.vue';
import { getTask } from '@/modules/Task/Task.api';

export default {
  components: {
    ListItems,
    Loader,
    UserComponent,
    TeamComponent,
  },
  props: {
    id: [Number, String],
    ruleId: [Number, String],
  },
  data: () => ({
    item: null,
    loading: true,
    tab: 0,
    team: null,
  }),
  computed: {
    type() {
      return this.item.type;
    },
    users() {
      if (!this.team) return this.item.users;
      return this.item.users.filter(i => i.organizationUnitId === this.team.id);
    },
  },
  methods: {
    async init() {
      this.loading = true;
      this.item = await getTask(+this.id, +this.ruleId);
      this.$store.dispatch('setTitle', this.item.name);
      this.loading = false;
    },
    handlerClickTeam(team = null) {
      this.tab = team ? 1 : 0;
      this.team = team;
    },
  },
  watch: {
    id() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div class="">
    <v-card v-if="item">
      <v-list-item>
        <v-list-item-avatar :color="item.sport.color">
          <v-icon dark>{{ item.sport.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-if="!item.isCompetition">
          <v-list-item-title>
            {{ item.type.name }}: {{ item.rule.main }} {{ item.type.unit }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content v-if="item.isCompetition">
          <v-list-item-title>
            Марафон
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr v-if="item.rule.time">
            <td>Время между тренировками</td>
            <td>
              <v-chip>
                {{ item.rule.time }} мин
              </v-chip>
            </td>
          </tr>
          <tr v-if="item.rule.timeMin">
            <td>Время тренировки</td>
            <td>
              <v-chip>
                {{ item.rule.timeMin }} мин
              </v-chip>
            </td>
          </tr>
          <tr v-if="item.rule.distance">
            <td>Мин. расстояние</td>
            <td>
              <v-chip>
                {{ item.rule.distance }} км
              </v-chip>
            </td>
          </tr>
          <tr v-if="item.rule.paceMin">
            <td>Средний скорость(min)</td>
            <td>
              <v-chip>
                {{ item.rule.paceMin }} км/ч
              </v-chip>
            </td>
          </tr>
          <tr v-if="item.rule.paceMax">
            <td>Средний скорость(max)</td>
            <td>
              <v-chip>
                {{ item.rule.paceMax }} км/ч
              </v-chip>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-divider v-if="item.description"/>
      <v-card-text v-if="item.description" v-html="item.description"/>
      <v-divider></v-divider>
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
            :items="item.teams"
            :size="20"
            :loading="loading"
            txt-no-entity="Команды отсутствуют"
          >
            <TeamComponent
              slot="item"
              slot-scope="{ item }"
              :item="item"
              :type="type"
              :taskId="id"
              @click="handlerClickTeam"
            />
          </ListItems>
        </v-tab-item>
        <v-tab-item>
          <TeamComponent
            v-if="team"
            :item="team"
            :type="type"
            :taskId="id"
            @click="handlerClickTeam()"
          />
          <v-divider v-if="team"/>
          <ListItems
            :items="users"
            :size="20"
            :loading="loading"
            txt-no-entity="Участники отсутствуют"
            key-name="userId"
          >
            <UserComponent
              slot="item"
              slot-scope="{ item }"
              :item="item"
              :type="type"
              :taskId="id"
            />
          </ListItems>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <Loader
      :value="loading"
    />
  </div>
</template>
<style lang="scss">

</style>

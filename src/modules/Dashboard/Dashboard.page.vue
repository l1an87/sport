<script>
import { getDashboardData } from './Dashboard.api';
import Page from '@/mixins/Page.vue';
import Profile from './components/Profile.vue';
import Task from './components/Task.vue';


export default {
  mixins: [
    Page,
  ],
  components: {
    Profile,
    Task,
  },
  data: () => ({
    statistic: [],
    trainings: 0,
    loading: true,
    stars: 0,
    cups: 0,
    medals: 0,
    day: Date.now(),
  }),
  computed: {},
  methods: {
    async init() {
      this.loading = true;
      this.statistic = await getDashboardData();
      this.loading = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div class="">
    <Profile
      class="mb-3"
      :statistic="statistic"
    />
    <Task/>
    <!--    <TaskList-->
    <!--      :day="day"-->
    <!--      v-if="day"-->
    <!--      label="Задачи на сегодня"-->
    <!--      hideProgress-->
    <!--    />-->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<style lang="scss">

</style>

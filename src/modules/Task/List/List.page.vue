<script>
import FormComponent from './Form.component.vue';
import ListComponent from './List.component.vue';
import { getSport } from '@/modules/Sport/Sport.api';

export default {
  components: {
    FormComponent,
    ListComponent,
  },
  data: () => ({
    sport: '1',
    year: '2020',
    month: '1',
    show: false,
  }),
  methods: {
    update() {
      window.localStorage.setItem('taskForm', JSON.stringify({
        sport: this.sport,
        year: this.year,
        month: this.month,
        time: Date.now() + (60 * 60000),
      }));
      this.setTitle();
    },
    init() {
      let form = JSON.parse(window.localStorage.getItem('taskForm'));
      if (!form || form.time < Date.now()) {
        const date = new Date();
        form = {
          sport: 1,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          time: Date.now() + (60 * 60000),
        };
      }
      this.sport = form.sport;
      this.year = form.year;
      this.month = form.month;
    },
    setTitle() {
      this.$store.dispatch('setTitle', `Задачи: ${getSport(+this.sport)?.name || ''}`);
    },
  },
  mounted() {
    this.init();
    this.setTitle();
    this.show = true;
  },
};
</script>
<template>
  <div class="">
    <v-card>
      <FormComponent
        v-if="show"
        :sport.sync="sport"
        :year.sync="year"
        :month.sync="month"
        @change="update"
      />
      <v-divider/>
      <ListComponent
        v-if="show"
        :sport="sport"
        :year="year"
        :month="month"
      />
    </v-card>
  </div>
</template>
<style lang="scss">

</style>

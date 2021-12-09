<script>
import { getSportList } from '@/modules/Sport/Sport.api';
import { getDateMonthTextList } from '@/utils/date';

export default {
  props: {
    sport: [Number, String],
    month: [Number, String],
    year: [Number, String],
  },
  data: () => ({
    sports: getSportList(),
    years: [2021],
    months: getDateMonthTextList()
      .map((month, idx) => ({
        text: month,
        value: idx + 1,
      })),
  }),
};
</script>
<template>
  <v-card-text class="py-0">
    <v-row>
      <v-col md="8" cols="12">
        <v-btn
          v-for="item in sports"
          :key="item.id"
          @click="$emit('update:sport', item.id) && $emit('change')"
          :color="item.id===+sport ? item.color: 'grey'"
          fab
          small
          class="ma-2"
        >
          <v-icon color="#ffffff">{{ item.icon }}</v-icon>
        </v-btn>
      </v-col>
      <v-col md="2" cols="6">
        <v-select
          label="Год"
          :value="+year"
          :items="years"
          @input="$emit('update:year', $event) && $emit('change')"
          hide-details
        />
      </v-col>
      <v-col md="2" cols="6">
        <v-select
          label="Месяц"
          :value="+month"
          :items="months"
          @input="$emit('update:month', $event) && $emit('change')"
          hide-details
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>
<style lang="scss">

</style>

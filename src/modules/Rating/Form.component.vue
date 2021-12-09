<script>
export default {
  props: {
    type: String,
    date: Date,
  },
  methods: {
    nextYear(v) {
      const d = new Date(this.date);
      d.setFullYear(d.getFullYear() + v);
      this.$emit('update:date', d);
    },
    disableYear(v) {
      const val = this.date.getFullYear() + v;
      if (val < 2021) {
        return true;
      }
      return val > new Date().getFullYear();
    },
    nextMonth(v) {
      const d = new Date(this.date);
      d.setMonth(d.getMonth() + v);
      this.$emit('update:date', d);
    },
    disableMonth(v) {
      const d = new Date(this.date);
      d.setMonth(d.getMonth() + v);
      if (d.getFullYear() < 2021) {
        return true;
      }
      return d.getTime() > Date.now();
    },
  },
};
</script>
<template>
  <div>
    <v-card-title>
      Рейтинг
      <v-spacer/>
      <v-card-subtitle class="pa-0">
        <v-btn
          text
          small
          color="primary"
          @click="$emit('update:type', 'year')"
          :class="{'v-btn--active': type === 'year'}"
        >год
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          @click="$emit('update:type', 'month')"
          :class="{'v-btn--active': type === 'month'}"
        >месяц
        </v-btn>
      </v-card-subtitle>
    </v-card-title>
    <v-divider/>
    <v-card-subtitle
      v-if="type==='year'"
      content="space-between"
      style="display:flex; align-items: center"
      class="py-1"
    >
      <v-btn
        icon
        @click="nextYear(-1)"
        :disabled="disableYear(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer/>
      <span style="user-select: none">{{ date | dateYear }}</span>
      <v-spacer/>
      <v-btn
        icon
        @click="nextYear(1)"
        :disabled="disableYear(1)"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-subtitle>
    <v-card-subtitle
      v-if="type==='month'"
      content="space-between"
      style="display:flex; align-items: center"
      class="py-1"
    >
      <v-btn
        @click="nextMonth(-1)"
        :disabled="disableMonth(-1)"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer/>
      <span style="user-select: none">{{ date | dateMonth }} {{ date | dateYear }}</span>
      <v-spacer/>
      <v-btn
        @click="nextMonth(1)"
        :disabled="disableMonth(1)"
        icon
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-subtitle>
  </div>
</template>
<style lang="scss">
</style>

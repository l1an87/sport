<script>
import { getTaskBonus } from '@/modules/TaskBonus/TaskBonus.api';

export default {
  props: {
    item: Object,
  },
  computed: {
    bonus() {
      return getTaskBonus(this.item.rule.bonusType || 1);
    },
    isCompetition() {
      return this.item.isCompetition;
    },


    isComplete() {
      if (this.isCompetition) return false;
      if (!this.item.score) return false;
      if (this.item.selectedVariantId !== this.item.rule.id) return false;
      return this.item.progress >= this.item.score;
    },
    isProgress() {
      if (this.isCompetition) return true;
      if (this.item.selectedVariantId !== this.item.rule.id) return false;
      if (this.isComplete) return false;
      if (Date.now() > new Date(this.item.dateTo).getTime()) return false;
      return !!this.item.selectedVariantId;
    },
    isSelected() {
      if (this.isProgress) return false;
      if (this.isComplete) return false;
      if (this.isCompetition) return false;
      if (this.item.selectedVariantId) return false;
      return Date.now() < new Date(this.item.dateTo).getTime();
    },
  },
  methods: {
    handlerAccept(event) {
      event.preventDefault();
      this.$emit('accept', this.item);
    },
  },
};
</script>
<template>
  <v-list-item
    :to="`/task/${item.key}`"
  >
    <v-list-item-avatar :color="item.sport.color">
      <v-icon dark>{{ item.sport.icon }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="mb-3">
        {{ item.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ item.dateFrom | dateMin }} - {{ item.dateTo | dateMin }}
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="!item.isCompetition">
        {{ item.type.label }}
        {{ item.rule.main | toFixed(item.type.fixed) }} {{ item.type.unit }}
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="isCompetition">
        общая дистанция
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="isComplete">
      <v-chip>
        <v-icon>{{ bonus.icon }}</v-icon>
      </v-chip>
    </v-list-item-action>
    <v-list-item-action v-if="isProgress">
      <v-chip>
        {{ item.progress | toFixed(0)}} {{item.type.unit}}
      </v-chip>
    </v-list-item-action>
    <v-list-item-action v-if="isSelected">
      <v-btn @click="handlerAccept" color="primary" small>
        Принять
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>
<style lang="scss">

</style>

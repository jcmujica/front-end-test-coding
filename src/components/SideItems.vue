<template>
  <v-sheet rounded="lg">
    <v-list v-if="items && items.length > 0" color="transparent">
      <v-list-item v-for="item in items" :key="item.value">
        <v-list-item-content>
          <v-list-item-title class="item">
            <span class="item-name">
              {{ item.label }}
            </span>
            : {{ item.value }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list class="progress" v-else-if="fetching" color="transparent">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-list>
    <v-list v-else color="transparent">
      <v-list-item>
        <v-list-item-content>
          <span class="item-name"> No items yet </span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  props: ["rawItems", "fetching"],
  computed: {
    items() {
      if (this.rawItems?.address) {
        return Object.keys(this.rawItems).map((key) => {
            if (this.rawItems[key]) {
                return {
                  label: key,
                  value: this.rawItems[key],
                };
            }
            return null;
        }).filter(el => el);
      }
      return {};
    },
  },
};
</script>

<style scoped>
.item {
  font-size: 0.8rem;
}
.item-name {
  font-weight: bold;
  text-transform: capitalize;
}
.progress {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <p class="pt-3 font-weight-black">Welcome to IP data search!</p>
        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            placeholder="Enter your IP address"
            v-model="ipAddress"
          ></v-text-field>
        </v-responsive>
        <v-btn
          class="ml-4"
          :elevation="0"
          fab
          x-small
          dark
          color="primary"
          @click="getUserData"
        >
          <v-icon small>mdi-magnify</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="4">
            <SideItems :rawItems="sideItemData" :fetching="fetching" />
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <Map
                v-if="!fetching && userData.latitude && userData.longitude"
                :lat="this.userData.latitude"
                :lng="this.userData.longitude"
              />
              <div v-else-if="fetching">
                <v-card-text class="progress-main">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-card-text>
              </div>
              <div class="welcome" v-else-if="userData.error">
                {{ userData.error }}
              </div>
              <div class="welcome" v-else>
                Welcome, please enter a valid IP address above to see the map.
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideItems from "./components/SideItems.vue";
import Map from "./components/Map.vue";
export default {
  data: () => ({
    ipAddress: "",
  }),
  computed: {
    userData() {
      const data = this.$store.getters.getUserData;

      return data;
    },
    fetching() {
      return this.$store.state.fetching;
    },
    sideItemData() {
      if (!Object.keys(this.userData).length > 0) {
        return;
      }

      const sideItemData = {
        address: this.userData.ip,
        country: this.userData.country,
        region: this.userData.regionName,
        city: this.userData.city,
        timezone: this.userData.timezone,
        currency: this.userData.currency,
      };

      return sideItemData;
    },
  },
  components: {
    SideItems,
    Map,
  },
  methods: {
    getUserData() {
      this.$store.dispatch("fetchUserData", this.ipAddress);
    },
  },
};
</script>

<style>
.welcome {
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.progress-main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
}
</style>
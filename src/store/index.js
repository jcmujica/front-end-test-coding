import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {
    },
    fetching: false,
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    },
    setFetching(state, payload) {
      state.fetching = payload
    }
  },
  actions: {
    async fetchUserData(state, ip) {
      let userData = {};
      try {
        state.commit('setUserData', {});
        state.commit('setFetching', true)
        const remoteData = await fetch(`https://ipapi.co/${ip}/json/`)
        userData = await remoteData.json();

        if (userData.error) {
          userData = {
            error: userData.reason,
          }
        };
      } catch (e) {
        console.log(e)
        userData = {
          error: e.reason || 'There was an error fetching the data',
        }
      };

      state.commit('setUserData', userData);
      state.commit('setFetching', false)
    }
  },
  modules: {
  },
  getters: {
    getUserData: state => state.userData
  }
})

export const state = () => ({
  zones: []
})
export const getters = {}
export const mutations = {
  zones(state, data) {
    state.zones = data.result
  }
}
export const actions = {
  async getZones({commit}, params) {
    try {
      const response = await this.$axios.get('/cloudflare/zones', {params})
      commit('zones', response.data)
    } catch (e) {
      console.log(e)
    }
  }
}

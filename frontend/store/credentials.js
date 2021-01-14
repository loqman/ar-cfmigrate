export const state = () => ({
  cloudflare: {
    apiKey: null,
    email: null,
    apiToken: null,
    user: null
  },
  arvan: {
    apiKey: null
  }
})

export const getters = {}

export const mutations = {
  setCloudflareParam(state, data) {
    state.cloudflare[data.key] = data.value
  }
}

export const actions = {
  async getCloudflareUserDetails({commit}, params) {
    try {
      const response = await this.$axios.get('/cloudflare/user/details', {params})
      commit('setCloudflareParam', {key: 'user', value: response.data.result})
      return response.data.success
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

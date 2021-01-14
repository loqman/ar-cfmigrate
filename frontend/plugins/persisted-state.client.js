import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'ar-cfmigrate',
    paths: [
      'credentials.cloudflare',
      'credentials.arvan'
    ]
  })(store)
}

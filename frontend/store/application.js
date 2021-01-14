export const state = () => ({
  snackbar: false,
  snackbarMessage: '',
  snackbarColor: 'error'
})
export const getters = {}
export const mutations = {
  showSnackbar(state, data) {
    state.snackbar = true
    state.snackbarMessage = data.message
    state.snackbarColor = data.color
  },
  snackbar(state, value) {
    state.snackbar = value
  }
}
export const actions = {}

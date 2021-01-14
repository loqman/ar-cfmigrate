module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'مهاجر آروان',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'ابزار مهاجرت از کلودفلر به ابرآروان'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  modules: [
    ['@nuxtjs/vuetify', {rtl: true}],
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.API_URL || 'http://192.168.27.10:3000/api/v1',
    // prefix: '/api/v1'
  },
  css: [
    '~/assets/stylesheets/application.scss'
  ],
  plugins: [
    '@/plugins/persisted-state.client.js',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)|(cloudflare.client.js)/
        })
      }
    }
  },
  target: 'static'
}


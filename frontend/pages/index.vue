<template>
  <v-sheet rounded="lg" min-height="268">
    <section class="container">
      <div>
        <h1 class="fa-title">
          مهاجر آروان
        </h1>
        <h2 class="subtitle">
          ابزار مهاجرت از کلودفلر به ابرآروان
        </h2>
        <v-divider></v-divider>
        <v-alert border="left" colored-border color="teal" elevation="2" class="mt-2">
          برای شروع باید آدرس ایمیل و
          <a href="https://dash.cloudflare.com/profile/api-tokens" title="دریافت API Key از کلودفلر">API Key</a>
          ، و یا
          <a href="https://dash.cloudflare.com/profile/api-tokens" title="دریافت API Token از کلودفلر">API Token</a>
          را از پنل کلودفلر دریافت کنید.
        </v-alert>
        <v-form v-on:submit.prevent="checkCloudflareCredentials()">
          <v-row class="pt-4">
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                v-model="cloudflareEmail"
                outlined
                label="آدرس ایمیل"
                class="ltr-text"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                v-model="cloudflareAPIKey"
                outlined
                label="API Key"
                class="ltr-text"></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="cloudflareAPIToken"
                outlined
                label="API Token"
                class="ltr-text"></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0 pb-2">
              <v-btn color="teal" dark large type="submit" :loading="loading">
                مرحله بعد
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div class="links">

        </div>
      </div>
    </section>
  </v-sheet>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        loading: false
      }
    },
    computed: {
      cloudflareEmail: {
        get() {
          return this.$store.state.credentials.cloudflare.email;
        },
        set(value) {
          this.$store.commit('credentials/setCloudflareParam', {key: 'email', value: value})
        }
      },
      cloudflareAPIKey: {
        get() {
          return this.$store.state.credentials.cloudflare.apiKey;
        },
        set(value) {
          this.$store.commit('credentials/setCloudflareParam', {key: 'apiKey', value: value})
        }
      },
      cloudflareAPIToken: {
        get() {
          return this.$store.state.credentials.cloudflare.apiToken;
        },
        set(value) {
          this.$store.commit('credentials/setCloudflareParam', {key: 'apiToken', value: value})
        }
      },
    },
    methods: {
      ...mapActions({
        getCloudflareUserDetails: 'credentials/getCloudflareUserDetails'
      }),
      checkCloudflareCredentials() {
        this.loading = true
        this.getCloudflareUserDetails({
          email: this.cloudflareEmail,
          api_key: this.cloudflareAPIKey,
          api_token: this.cloudflareAPIToken
        }).then((response) => {
          this.loading = false
          if (response) {
            this.$router.replace('/zones')
          } else {
            this.$store.commit('application/showSnackbar', {
              message: 'آدرس ایمیل یا کلید API اشتباه است.',
              color: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .fa-title {
    font-family: Sahel, Vazir, Tahoma, serif;
    display: block;
    font-weight: 300;
    font-size: 50px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 25px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>


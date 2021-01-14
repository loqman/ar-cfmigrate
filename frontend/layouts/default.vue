<template>
  <div style="transform-origin: center top 0px;">
    <v-app>
      <v-app-bar app color="white" flat>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none"/>
        <v-tabs centered class="ml-n9 d-none d-md-block" color="grey darken-1" icons-and-text>
          <v-tab v-for="link in links" :key="link.icon" :to="link.link" nuxt :exact="link.exact">
            {{ link.title }}
            <v-icon>mdi-{{link.icon}}</v-icon>
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-avatar color="grey darken-1 shrink" size="32"></v-avatar>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app right temporary class="d-md-none">
        <v-list nav dense>
          <v-list-item-group active-class="amber--text text--darken-3">

            <v-list-item v-for="link in links" :key="link.icon" :to="link.link" nuxt :exact="link.exact">
              <v-list-item-icon>
                <v-icon>mdi-{{link.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main class="grey lighten-3">
        <v-container :fluid="$vuetify.breakpoint.lgAndDown">
          <v-row class="content-center">
            <v-col cols="12" md="9">
              <Nuxt/>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-snackbar v-model="snackbar" color="error" class="rtl-text" dark multi-line top>
        {{ snackbarMessage }}
        <v-btn color="white" text @click="snackbar = false">
          باشه
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>


<script>
  export default {
    computed: {
      snackbar: {
        get() { return this.$store.state.application.snackbar },
        set(value) { this.$store.commit('application/showSnackbar', value)}
      },
      snackbarMessage() {
        return this.$store.state.application.snackbarMessage;
      }
    },
    data: () => ({
      links: [
        {title: 'خانه', link: '/', icon: 'home', exact: true},
        // {title: 'آگهی‌های من', link: '/cars', icon: 'car-multiple', exact: true},
        // {title: 'ثبت آگهی', link: '/cars/new', icon: 'car-2-plus', exact: false},
        // {title: 'حساب کاربری', link: '/users/profile', icon: 'account-details', exact: false},
      ],
      drawer: false,
      group: null
    }),
    watch: {
      group() {
        this.drawer = false
      },
    },
  }
</script>

<style>
  .v-tab‌ {
    letter-spacing: 0 !important;
    font-size: 2em;
  }

  .v-application--is-rtl .v-list-item__action:first-child, .v-application--is-rtl .v-list-item__icon:first-child {
    margin-left: 15px;
  }

  .v-application--is-rtl .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
    padding-right: 40px;
  }
</style>


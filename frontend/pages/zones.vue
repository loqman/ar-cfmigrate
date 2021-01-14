<template>
  <div>
    <v-list-item-group multiple v-model="selectedZones">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-alert border="left" color="info" dark elevation="2" class="mt-2">
              از لیست زیر دامنه‌هایی که مایل به انتقال آن‌ها هستید انتخاب کنید:
            </v-alert>
            <v-btn
              to="/"
              color="blue-grey"
              dark
              large
              type="submit"
              :loading="loading"
              style="float: right;">
              <v-icon>mdi-chevron-right</v-icon>
              مرحله قبل
            </v-btn>
            <v-btn
              color="teal"
              dark
              large
              type="submit"
              :loading="loading"
              v-if="selectedZones.length > 0"
              style="float: left;">
              مرحله بعد
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" class="mb-0 pb-0">
            <v-text-field
              class="mb-0 pb-0"
              v-model="search"
              label="جست‌وجو"
              solo
              reverse
              clearable
              prepend-inner-icon="mdi-filter"></v-text-field>
          </v-col>
          <v-col cols="12" v-if="loading">
            <v-progress-linear
              indeterminate
              color="teal"></v-progress-linear>
          </v-col>
          <v-col cols="12" sm="6" lg="4"
                 v-for="zone in zones"
                 :key="zone.id">
            <v-card>
              <v-list-item
                :value="zone.id"
                color="teal">
                <template v-slot:default="{ active, }">
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="primary"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title class="mono-font">{{ zone.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ zone.plan.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="zones.length <= 0 && !loading">
            <h3 class="grey--text">
              <v-icon large>mdi-information-variant</v-icon>
              دامنه‌ای یافت نشد.
            </h3>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="blue-grey"
              dark
              large
              type="submit"
              to="/"
              :loading="loading"
              style="float: right;">
              <v-icon>mdi-chevron-right</v-icon>
              مرحله قبل
            </v-btn>
            <v-btn
              color="teal"
              dark
              large
              type="submit"
              :loading="loading"
              v-if="selectedZones.length > 0"
              style="float: left;">
              مرحله بعد
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-list-item-group>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        selectedZones: [],
        search: '',
        loading: true
      }
    },
    computed: {
      cloudflare() {
        return this.$store.state.credentials.cloudflare
      },
      zones() {
        return this.$store.state.cloudflare.zones.filter((item) => this.filterAlgorithm(item.name, this.search))
      }
    },
    methods: {
      loadCloudflareZones() {
        this.$store.dispatch('cloudflare/getZones', {
          email: this.cloudflare.email,
          api_key: this.cloudflare.apiKey,
          api_token: this.cloudflare.apiToken
        }).then((response) => {
          this.loading = false
        })
      },
      filterAlgorithm: (item, search) => {
        if (item && search) {
          return item.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        } else {
          return true
        }
      }
    },
    beforeMount() {
      this.loadCloudflareZones();
    }
  }
</script>

<style>
  .v-list-item__title {
    font-size: 1.2rem;
  }
</style>

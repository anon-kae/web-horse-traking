<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      permanent
      clipped
      fixed
      app>
      <v-list dense nav rounded>
        <!-- Home -->
        <v-list-item nuxt link to="/">
          <v-list-item-icon>
            <v-icon>
              dashboard
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Dashboard
          </v-list-item-title>
        </v-list-item>
        <v-divider class="mb-3 mt-3" />

        <v-list-group prepend-icon="pets">
          <template #activator>
            <v-list-item-title>
              Animal
            </v-list-item-title>
          </template>
          <v-list>
            <v-list-item to="/training">
              <v-list-item-icon>
                <v-icon>
                  create_new_folder
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Create Training
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      class="px-lg-2"
      height="60"
      dark
      elevate-on-scroll
      app
      fixed>
      <v-avatar color="white" size="40" class="mr-2">
        <v-img :src="require('@/assets/images/HORSE.png')" />
      </v-avatar>
      <h2>Horse Tracking</h2>
      <v-spacer />
      <v-menu v-if="$vuetify.breakpoint.mdAndUp" offset-y>
        <template #activator="{ on }">
          <v-btn text depressed large v-on="on">
            <v-avatar class="mr-1" size="36">
              <v-icon>account_circle</v-icon>
            </v-avatar>
            {{ user.name }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-content>
              <v-list-item-title class="text-body-1">
                logout
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main class="pl-0 backgroudColor">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <component-snackbar :style="{ left: 0, top: 0 }" />
  </v-app>
</template>

<script>
import ComponentSnackbar from '@/components/snackbar/Snackbar'

export default {
  name: 'DefaultLayout',
  middleware: 'DefaultLayoutMiddleware',
  components: {
    ComponentSnackbar
  },
  data () {
    return {
      user: {
        name: 'Admin',
        picture: ''
      },
      drawer: true
    }
  },
  errorCaptured (error) {
    const errorHandler = async error => {
      const errorMessage = error.response.data.error.message;
      await this.$store.dispatch('snackbar/setErrorMessage', errorMessage);
    };

    if (error && error.response) {
      errorHandler(error);
      return false;
    } else if (process.env.SH_CLIENT_NOTIFY_UI_ERROR === 'true') {
      const errorMessage = `[UI] ${error.message}`;
      this.$store.dispatch('snackbar/setErrorMessage', errorMessage);
      return false;
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      window.location.reload()
    },
  }
}
</script>

<style scoped>

.v-navigation-drawer .v-list-group .v-list {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 16px;
}

.theme--dark .v-navigation-drawer .v-list-group .v-list {
  background-color: #555555;
}

.theme--light .v-navigation-drawer .v-list-group .v-list {
  background-color: #eaeaea;
}
</style>

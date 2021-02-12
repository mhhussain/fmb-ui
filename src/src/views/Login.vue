<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="justify-center align-center">
        <v-sheet
          elevation="4"
          class="login-sheet d-flex flex-column justify-space-between"
          rounded
        >
          <v-container class="d-flex justify-center pa-16">
            <div class="text-h6">Sign in</div>
          </v-container>
          <v-container class="pb-16 d-flex justify-center">
            <v-btn color="primary">ITS login</v-btn>
          </v-container>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    //
  }),
  computed: {
  },
};
</script>

<style scoped>
.login-sheet {
  width: 350px;
  min-width: 25vw;
  min-height: 20vw;
}

.v-btn {
  width: 60%
}
</style>

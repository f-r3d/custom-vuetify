<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view />
    </v-main>
    <Footer></Footer>

  </v-app>
</template>

<script lang="ts" setup>
  import Header from "./components/header.vue"
  import Footer from "./components/footer.vue"
</script>

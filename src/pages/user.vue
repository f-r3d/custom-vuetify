<template>
  <v-container
    fluid
    class="mt-1 flex-column fill-height align-stretch pt-0"
  >

    <v-breadcrumbs
      class="pa-0 text-body-2 mb-0"
      :items="breadcrumbsItems"
      density="compact"
    >
    </v-breadcrumbs>

    <h1
      class="pt-4"
    >
      Dati personali
    </h1>

    <v-row
      class="mt-5"
    >
      <v-col
        cols="12"
        sm="6"
      >
        <h2
          class="mb-2"
        >
          Informazioni
        </h2>
        <div>
          User:	<b>desys</b><br>
          Nome:	<b>Arrigo</b><br>
          Cognome: <b>Pierotti</b><br>
          locale:	<b>it</b><br>
          E-mail: <b>a.pierotti@desys.it</b>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <h2
          class="mb-2"
        >
          Preferenze
        </h2>

        <v-checkbox
          v-model="enableMail"
          label="Abilita notifiche e-mail"
          hide-details
        >
        </v-checkbox>

        <v-btn-primary
          v-if="enableMail"
        >
          Manda mail di test
        </v-btn-primary>


      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const enableMail = ref(true);

  const breadcrumbsItems = ref([
    {
      title: 'Home',
      disabled: false,
      href: '/',
    },
    {
      title: "Dati personali",
      disabled: true,
      href: ''
    }
  ]);

</script>
<template>
  <v-row>

    <v-col>

      <div class="mb-3 ga-2 d-flex">
        <v-btn
          prepend-icon="mdi-plus"
          text="Button"
          elevation="1"
        ></v-btn>

        <v-btn
          prepend-icon="mdi-plus"
          text="Tonal"
          variant="tonal"
        ></v-btn>

        <v-btn
          prepend-icon="mdi-plus"
          text="Disabled"
          disabled
        ></v-btn>

        <v-btn
          prepend-icon="mdi-plus"
          text="Outlined"
          variant="outlined"
        ></v-btn>

        <v-btn
          text="Text"
          variant="text"
        ></v-btn>

        <v-btn
          text="Plain"
          variant="plain"
        ></v-btn>
      </div>

      <div class="mb-3 ga-2 d-flex">
        <VBtnPrimary
          text="Load Primary"
          :disabled="loading"
          :loading="loading"
          @click="loading = !loading"
        ></VBtnPrimary>

        <VBtnPrimary
          text="Tonal"
          variant="tonal"
        ></VBtnPrimary>

        <VBtnPrimary
          text="disabled"
          disabled
        ></VBtnPrimary>

        <VBtnPrimary
          text="outlined"
          variant="outlined"
        ></VBtnPrimary>

        <VBtnPrimary
          text="Text"
          variant="text"
        ></VBtnPrimary>

        <VBtnPrimary
          text="Plain"
          variant="plain"
        ></VBtnPrimary>

      </div>

      <div class="mb-3 ga-2 d-flex">
        <VBtnSecondary
          text="Bottom Secondary"
          @click="sheet = !sheet"
        ></VBtnSecondary>

        <VBtnSecondary
          text="Tonal"
          variant="tonal"
        ></VBtnSecondary>

        <VBtnSecondary
          text="Disabled"
          disabled
        ></VBtnSecondary>

        <VBtnSecondary
          text="outlined"
          variant="outlined"
        ></VBtnSecondary>

        <VBtnSecondary
          text="Text"
          variant="text"
        ></VBtnSecondary>

        <VBtnSecondary
          text="Plain"
          variant="plain"
        ></VBtnSecondary>

      </div>

    </v-col>

    <v-col cols="12" md="6">

      <div class="mb-3 ga-2 d-flex">
        <v-btn
          text="Warning"
          color="warning"
        ></v-btn>

        <v-btn
          prepend-icon="$success"
          text="Success"
          color="success"
        ></v-btn>

        <v-btn
          prepend-icon="$error"
          text="Error"
          color="error"
        ></v-btn>

        <v-btn
          text="Info"
          color="info"
        ></v-btn>
      </div>

    </v-col>


    <v-col cols="12" md="6">

      <v-btn
        elevation="2"
        density="compact"
        icon="mdi-plus"
      >
      </v-btn>
    </v-col>


  </v-row>

  <v-divider class="mt-2"></v-divider>

  <v-bottom-sheet v-model="sheet">
    <v-card
      class="text-center"
      height="200"
    >
      <v-card-text
        >
        <v-btn
          variant="text"
          @click="sheet = !sheet"
        >
          Chiudi
        </v-btn>

        <br>
        <br>

        <div>
          This is a bottom sheet using the controlled by v-model instead of activator
        </div>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>

</template>

<script setup lang="ts">
  import { ref, watch } from "vue";

  const sheet = ref(false);

  const loading = ref(false);
  watch(loading, async(val) => {
    if (!val) return
    setTimeout(() => (loading.value = false), 2000)
  });
</script>

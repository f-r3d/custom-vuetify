<template>
  <v-row>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
      >
        <template v-slot:title>
          <div class="d-flex">
            <div>
              Standard
            </div>
            <v-spacer></v-spacer>
            <v-chip
              color="primary"
              variant="flat"
              @contextmenu.prevent="showContextMenu($event)"
            >
              Right click
            </v-chip>
          </div>
        </template>
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        title="Outlined"
        variant="outlined"
        :text=sampleText
      >
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        title="Plain card elevation"
        variant="plain"
        elevation="6"
        href="https://www.desys.it"
        target="_blank"
        :text=sampleText
      >
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        text=""
        title="Card image"
        color="surface-variant"
        image="/public/images/test-1.jpg"
        elevation="6"
        href="https://www.desys.it"
        target="_blank"
        class="image-hover-card"
      >
        <template v-slot:text>
          Aggiungedo la classe `image-hover-card` a una card con un'immagine di sfondo si crea l'effetto ingrandimento al passaggio del mouse
        </template>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Primary"
        color="primary"
      >
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Tonal primary"
        variant="tonal"
        color="primary"
      >
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Outlined primary"
        variant="outlined"
        color="primary"
      >
      </v-card>
    </v-col>


    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Disabled primary"
        variant="tonal"
        color="primary"
        to="/"
        disabled
      >
      </v-card>
    </v-col>

  </v-row>

  <v-row>

    <v-col cols="12" md="4" lg="3">
      <v-card
        color="secondary"
        subtitle="This is a card subtitle"
        title="Secondary"
      >
        <template v-slot:text>
          <div style="height: 100px; overflow: auto">
            We do not recommend using this method unless you have a specific reason to do so. The default CSS utilises the unicode-range property to only load the characters that are used on the page, which is more efficient than manually loading subsets.
            <br><br><br>

            <br><br><br><br><br><br>
            <div
              @contextmenu.prevent="showContextMenu($event)"
            >
              Tasto destro
            </div>
            <br><br>
            <br><br><br><br><br><br><br><br><br><br>
          </div>
        </template>
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Tonal secondary"
        variant="tonal"
        color="secondary"
      >
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Outlined secondary"
        variant="outlined"
        color="secondary"
      >
      </v-card>
    </v-col>

    <v-col cols="12" md="4" lg="3">
      <v-card
        subtitle="This is a card subtitle"
        :text=sampleText
        title="Disabled secondary"
        variant="tonal"
        color="secondary"
        to="/"
        disabled
      >
      </v-card>
    </v-col>

  </v-row>

  <!-- <v-divider class="mt-2"></v-divider>

  <v-row>
    <v-col>
      <div class="d-flex ga-2 mt-2">

        <v-chip
          color="primary"
          prepend-icon="mdi-plus"
        >
          Chip
        </v-chip>



        <v-chip
          closable
          variant="outlined"
        >
          Chip
        </v-chip>

        <v-chip
          label
          append-icon="mdi-label"
          color="success"
          variant="flat"
          @click="overlay = !overlay"
        >
          Label click
        </v-chip>

      </div>

    </v-col>

  </v-row> -->

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


  <v-menu
    v-model="rightMenu"
    :target="coordsContextMenu"
    scroll-strategy="close"
  >
    <v-list
      density="comfortable"
    >
      <v-list-item>
        Menu 1
      </v-list-item>
      <v-list-item>
        Menu 2
      </v-list-item>
      <v-list-item>
        Menu 3
      </v-list-item>
    </v-list>
  </v-menu>

  <v-overlay
    :model-value="overlay"
    class="align-center justify-center"
  >
    <v-progress-circular
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>

</template>

<script setup lang="ts">
  import { ref, watch } from "vue";

  const sheet = ref(false);

  const loading = ref(false);
  watch(loading, async(val) => {
    if (!val) return
    setTimeout(() => (loading.value = false), 2000)
  });

  const overlay = ref(false);
  watch(overlay, async(val) => {
    if (!val) return
    setTimeout(() => (overlay.value = false), 2000)
  });

  const coordsContextMenu = ref(["100px","100px"]);
  const rightMenu = ref(false);
  function showContextMenu(ev) {
    console.log(ev.y);
    rightMenu.value = true;
    coordsContextMenu.value = [ev.x, ev.y];

  }

  // function coordsContextMenuPosition() {
  //   return coordsContextMenu.value;
  // }

  const sampleText = ref("Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!");
</script>

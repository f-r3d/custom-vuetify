<template>
  <v-row>
    <v-col cols="2">
      <v-card
        color="primary"
      >
        <v-card-text>
          Primary:<br>
          Hex: f36f21<br>
          RGB: 243,111,33
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="2">
      <v-card
        variant="tonal"
        color="primary"
      >
        <v-card-text>
          Primary tonal:<br>
          Hex: fdede2<br>
          RGB: 253,237,226
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="2">
      <v-card
        color="secondary"
      >
        <v-card-text>
          Secondary<br>
          Hex: 2b2b2b<br>
          RGB: 43,43,43
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="2">
      <v-card
        color="secondary"
        variant="tonal"
      >
        <v-card-text>
          Secondary tonal<br>
          Hex: e5e5e5<br>
          RGB: 229,229,229
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="2">
      <v-card>
        <v-card-text>
          None<br>
          Hex: fff<br>
          RGB: 255,255,255
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="2">
      <v-card
        color="surface-light"
      >
        <v-card-text>
          Surface light<br>
          Hex: eeeeee<br>
          RGB: 238,238,238
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card flat>
        <v-card-text>
          <template
            v-for="el in primaryVariant"
          >
            <v-row
              :class="`bg-primary-${el.color}`"
            >
              <v-col
                cols="6"
              >
                primary-{{ el.color }}
              </v-col>
              <v-col
                cols="6"
              >
                {{ el.rgb }}
              </v-col>
            </v-row>
          </template>

        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card flat>
        <v-card-text>
          <template
            v-for="el in secondaryVariant"
          >
            <v-row
              :class="`bg-secondary-${el.color}`"
            >
              <v-col
                cols="6"
              >
              secondary-{{ el.color }}
              </v-col>
              <v-col
                cols="6"
              >
                {{ el.rgb }}
              </v-col>
            </v-row>
          </template>

        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>

<script lnag="ts" setup>
  const primaryVariant =
  [
    {
      color: "lighten-5", rgb: "253,237,226"
    },
    {
      color: "lighten-4", rgb: "249,216,193"
    },
    {
      color: "lighten-3", rgb: "247,183,139"
    },
    {
      color: "lighten-2", rgb: "249,138,56"
    },
    {
      color: "lighten-1", rgb: "246,121,28"
    },
    {
      color: "darken-1", rgb: "224,108,19"
    },
    {
      color: "darken-2", rgb: "212,107,29"
    },
    {
      color: "darken-3", rgb: "198,104,35"
    },
    {
      color: "darken-4", rgb: "182,97,32"
    },
    {
      color: "darken-5", rgb: "166,97,32"
    }
  ];

// {
//     color: "darken-2", rgb: "228,110,22"
//   },

  const secondaryVariant =
  [
    {
      color: "lighten-5", rgb: "198,198,198"
    },
    {
      color: "lighten-4", rgb: "165,165,165"
    },
    {
      color: "lighten-3", rgb: "134,134,134"
    },
    {
      color: "lighten-2", rgb: "105,105,105"
    },
    {
      color: "lighten-1", rgb: "78,78,78"
    },
    {
      color: "darken-1", rgb: "35,35,35"
    },
    {
      color: "darken-2", rgb: "27,27,27"
    },
    {
      color: "darken-3", rgb: "19,19,19"
    },
    {
      color: "darken-4", rgb: "11,11,11"
    },
    {
      color: "darken-5", rgb: "3,3,3"
    },
  ];
</script>
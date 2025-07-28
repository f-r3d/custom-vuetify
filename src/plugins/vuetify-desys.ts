/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// Font
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/source-sans-pro";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import '../styles/variables.scss'

import { VBtn } from 'vuetify/components/VBtn'
import { VCard } from 'vuetify/components/VCard'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Colori tema chiaro
const desysThemeLight: ThemeDefinition = {
  dark: false,
  // text: {
  //   theme: 'rgb(18,18,18)'
  // },
  colors: {
    'error': '#ea2224',
    'primary-lighten-5': 'rgb(253, 226, 211)',
    'primary-lighten-4': 'rgb(251, 212, 188)',
    'primary-lighten-3': 'rgb(249, 183, 144)',
    'primary-lighten-2': 'rgb(247, 154, 100)',
    'primary-lighten-1': 'rgb(245, 140, 77)',
    primary: 'rgb(243, 111, 13)',
    'primary-darken-1': 'rgb(224, 108, 19)',
    'primary-darken-2': 'rgb(212, 107, 29)',
    'primary-darken-3': 'rgb(198, 104, 35)',
    'primary-darken-4': 'rgb(182, 97, 32)',
    'primary-darken-5': 'rgb(166, 97, 32)',

    'secondary-lighten-5': 'rgb(203, 233, 231)',
    'secondary-lighten-4': 'rgb(178, 223, 219)',
    'secondary-lighten-3': 'rgb(128, 203, 196)',
    'secondary-lighten-2': 'rgb(77, 182, 172)',
    'secondary-lighten-1': 'rgb(38, 166, 154)',
    secondary: 'rgb(0, 150, 136)',
    'secondary-darken-1': 'rgb(0, 137, 123)',
    'secondary-darken-2': 'rgb(0, 121, 107)',
    'secondary-darken-3': 'rgb(0, 105, 92)',
    'secondary-darken-4': 'rgb(0, 77, 64)',
    'secondary-darken-5': 'rgb(0, 58, 48)',

    'grey-lighten-5': 'rgb(252, 252, 252)',
    'grey-lighten-4': 'rgb(239, 239, 239)',
    'grey-lighten-3': 'rgb(229, 229, 229)',
    'grey-lighten-2': 'rgb(212, 212, 212)',
    'grey-lighten-1': 'rgb(189, 189, 189)',
    grey: 'rgb(158, 158, 158)',
    'grey-darken-1': 'rgb(132, 132, 132)',
    'grey-darken-2': 'rgb(100, 100, 100)',
    'grey-darken-3': 'rgb(66, 66, 66)',
    'grey-darken-4': 'rgb(33, 33, 33)',
    'grey-darken-5': 'rgb(16, 16, 16)',
  },
  variables: {
    'on-background': 'rgb(18, 18, 18)',
  }
}

// Colori tema scuro
const desysThemeDark: ThemeDefinition = {
  dark: true,
  colors: {
    'error': '#ea2224',
    'surface': 'rgb(28,28,28)',
    'primary-lighten-5': 'rgb(253, 226, 211)',
    'primary-lighten-4': 'rgb(251, 212, 188)',
    'primary-lighten-3': 'rgb(249, 183, 144)',
    'primary-lighten-2': 'rgb(247, 154, 100)',
    'primary-lighten-1': 'rgb(245, 140, 77)',
    primary: 'rgb(243, 111, 13)',
    'primary-darken-1': 'rgb(224, 108, 19)',
    'primary-darken-2': 'rgb(212, 107, 29)',
    'primary-darken-3': 'rgb(198, 104, 35)',
    'primary-darken-4': 'rgb(182, 97, 32)',
    'primary-darken-5': 'rgb(166, 97, 32)',

    'secondary-lighten-5': 'rgb(203, 233, 231)',
    'secondary-lighten-4': 'rgb(178, 223, 219)',
    'secondary-lighten-3': 'rgb(128, 203, 196)',
    'secondary-lighten-2': 'rgb(77, 182, 172)',
    'secondary-lighten-1': 'rgb(38, 166, 154)',
    secondary: 'rgb(0, 150, 136)',
    'secondary-darken-1': 'rgb(0, 137, 123)',
    'secondary-darken-2': 'rgb(0, 121, 107)',
    'secondary-darken-3': 'rgb(0, 105, 92)',
    'secondary-darken-4': 'rgb(0, 77, 64)',
    'secondary-darken-5': 'rgb(0, 58, 48)',

    'grey-darken-5': 'rgb(252, 252, 252)',
    'grey-darken-4': 'rgb(239, 239, 239)',
    'grey-darken-3': 'rgb(229, 229, 229)',
    'grey-darken-2': 'rgb(212, 212, 212)',
    'grey-darken-1': 'rgb(189, 189, 189)',
    grey: 'rgb(158, 158, 158)',
    'grey-lighten-1': 'rgb(132, 132, 132)',
    'grey-lighten-2': 'rgb(100, 100, 100)',
    'grey-lighten-3': 'rgb(66, 66, 66)',
    'grey-lighten-4': 'rgb(38, 38, 38)',
    'grey-lighten-5': 'rgb(16, 16, 16)',
  },
  variables: {
    'on-background': 'rgb(234, 234, 234)'
  }
}

let themeOptions =
  {
    // Tema chiaro di default
    defaultTheme: 'desysThemeLight',
    // Temi disponibili
    themes: {
      desysThemeLight, desysThemeDark
    }
  }
;

// Configurazione globale libreria
export default createVuetify({

  // Estende proprietà di un componente a nuovi componenti
  // In questo caso estende proprietà bottoni ai nuovi componenti "VBtnSecondary" e "VBtnPrimary")
  aliases: {
    VBtnSecondary: VBtn,
    VBtnPrimary: VBtn,
    VCardFlat: VCard,
  },

  // lang: {
  //   t: (key, ...params) => i18n.t(key, params),
  // },

  // Temi
  theme: themeOptions,

  // Proprietà di default dei componenti
  defaults: {
    VCard: {
      // Bordo arrondato "large"
      rounded: 'lg'
    },
    VCardFlat: {
      rounded: 0,
      elevation: 0
    },
    VBtn: {
      // Le classi e, in generale, lo stile css possono essere definiti sui singoli componenti
      // In questo caso sui pulsant avrò di default la classe .text-none
      class: 'text-none',
    },
    VBtnPrimary: {
      color: 'primary',
      class: 'text-none',
      rounded: 'lg'
    },
    VBtnSecondary: {
      color: 'secondary',
      class: 'text-none',
      rounded: 'lg'
    },
    VFab: {
      // Bordo rotondo completo
      rounded: "circle"
    },
    VTextField: {
      // Presenta bordo intorno
      variant: 'outlined',
      // Altezza del testo all'interno dell'input
      density: 'compact'
    },
    VNumberInput: {
      variant: 'outlined',
      density: 'compact'
    },
    VSelect: {
      variant: 'outlined',
      density: 'compact'
    },
    VFileInput: {
      variant: 'outlined'
    },
    VDateInput: {
      variant: 'outlined',
      density: 'compact'
    }
  },
  components,
  directives
})

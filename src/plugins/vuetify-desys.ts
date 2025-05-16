/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/source-sans-pro";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '../styles/variables.scss' // Importa le variabili CSS

import { VBtn } from 'vuetify/components/VBtn'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'

const desysThemeLight: ThemeDefinition = {
  dark: false,
  // text: {
  //   theme: 'rgb(18,18,18)'
  // },
  colors: {
    'primary-lighten-5': 'rgb(249, 216, 193)',
    'primary-lighten-4': 'rgb(247, 183, 139)',
    'primary-lighten-3': 'rgb(233, 145, 121)',
    'primary-lighten-2': 'rgb(227, 127, 100)',
    'primary-lighten-1': 'rgb(246, 121, 28)',
    primary: 'rgb(243, 111, 13)',
    'primary-darken-1': 'rgb(224, 108, 19)',
    'primary-darken-2': 'rgb(212, 107, 29)',
    'primary-darken-3': 'rgb(198, 104, 35)',
    'primary-darken-4': 'rgb(182, 97, 32)',
    'primary-darken-5': 'rgb(166, 97, 32)',
    'secondary-lighten-5': 'rgb(198, 198, 198)',
    'secondary-lighten-4': 'rgb(165, 165, 165)',
    'secondary-lighten-3': 'rgb(134, 134, 134)',
    'secondary-lighten-2': 'rgb(105, 105, 105)',
    'secondary-lighten-1': 'rgb(78, 78, 78)',
    secondary: 'rgb(43, 43, 43)',
    'secondary-darken-1': 'rgb(35, 35, 35)',
    'secondary-darken-2': 'rgb(27, 27, 27)',
    'secondary-darken-3': 'rgb(19, 19, 19)',
    'secondary-darken-4': 'rgb(11, 11, 11)',
    'secondary-darken-5': 'rgb(3, 3, 3)',
  },
  variables: {
    'on-background': 'rgb(18, 18, 18)',
  }
}

const desysThemeDark: ThemeDefinition = {
  dark: true,
  colors: {
    'primary-lighten-5': 'rgb(249, 216, 193)',
    'primary-lighten-4': 'rgb(247, 183, 139)',
    'primary-lighten-3': 'rgb(233, 145, 121)',
    'primary-lighten-2': 'rgb(227, 127, 100)',
    'primary-lighten-1': 'rgb(246, 121, 28)',
    primary: 'rgb(243, 111, 13)',
    'primary-darken-1': 'rgb(224, 108, 19)',
    'primary-darken-2': 'rgb(212, 107, 29)',
    'primary-darken-3': 'rgb(198, 104, 35)',
    'primary-darken-4': 'rgb(182, 97, 32)',
    'primary-darken-5': 'rgb(166, 97, 32)',
    'secondary-lighten-5': 'rgb(198, 198, 198)',
    'secondary-lighten-4': 'rgb(165, 165, 165)',
    'secondary-lighten-3': 'rgb(134, 134, 134)',
    'secondary-lighten-2': 'rgb(105, 105, 105)',
    'secondary-lighten-1': 'rgb(78, 78, 78)',
    secondary: 'rgb(43, 43, 43)',
    'secondary-darken-1': 'rgb(35, 35, 35)',
    'secondary-darken-2': 'rgb(27, 27, 27)',
    'secondary-darken-3': 'rgb(19, 19, 19)',
    'secondary-darken-4': 'rgb(11, 11, 11)',
    'secondary-darken-5': 'rgb(3, 3, 3)',
  },
  variables: {
    'on-background': 'rgb(234, 234, 234)'
  }
}

export default createVuetify({
  aliases: {
    VBtnSecondary: VBtn,
    VBtnPrimary: VBtn,
  },
  components: {
    VDateInput
  },
  // lang: {
  //   t: (key, ...params) => i18n.t(key, params),
  // },
  theme: {
    defaultTheme: 'desysThemeLight',
    themes: {
      desysThemeLight, desysThemeDark
    },
  },
  defaults: {
    VCard: {
      rounded: 'lg'
    },
    VBtn: {
      class: 'text-none',
      rounded: 'xl'
    },
    VBtnPrimary: {
      color: 'primary',
      class: 'text-none',
      rounded: 'xl'
    },
    VBtnSecondary: {
      color: 'secondary',
      class: 'text-none',
      rounded: 'xl'
    },
    VTextField: {
      variant: 'outlined',
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
})

// export necessari per la pubblicazione della libreria
export * from 'vuetify/components'
export * from 'vuetify/directives'
export * from 'vuetify/labs/components'

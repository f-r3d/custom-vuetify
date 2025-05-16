import { createMemoryHistory, RouteRecordRaw, createRouter, createWebHistory  } from 'vue-router'
// import Vue from 'vue';

import HomeView from '../pages/Home.vue'
import BomView from '../pages/Bom.vue'
import ComponentsView from '../pages/Components.vue'
import metadataView from '../pages/metadata.vue'
import settings from '../pages/settings.vue'
import user from '../pages/user.vue'

import intro from '../pages/styles/intro.vue'
import text from '../pages/styles/text.vue'
import colors from '../pages/styles/colors.vue'

import card from '../pages/containment/card.vue'
import button from '../pages/containment/button.vue'

import cardList1 from '../pages/sample/card/card-list-1.vue'
import cardList2 from '../pages/sample/card/card-list-2.vue'

import table1 from '../pages/sample/table/table-1.vue'

import chat from '../pages/chat/chat.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'ASAP2 - Home'
    }
  },
  {
    path: '/user',
    component: user,
    meta: { title: 'Dati personali' }
  },
  {
    path: '/settings',
    component: settings,
    meta: { title: 'Settings' }
  },
  {
    path: '/bom',
    component: BomView,
    meta: { title: 'BOM' }
  },
  {
    path: '/components',
    component: ComponentsView,
    meta: { title: 'Test componenti' },
    children: [
      {
        path: '',
        component: intro,
        meta: { title: 'Introduzione' }
      },
      {
        path: 'text',
        component: text,
        meta: { title: 'Testi' }
      },
      {
        path: 'colors',
        component: colors,
        meta: { title: 'Colori' }
      },
      {
        path: 'button',
        component: button,
        meta: { title: 'Bottoni' }
      },
      {
        path: 'card',
        component: card,
        meta: { title: 'Card' }
      },
      {
        path: 'card-list-1',
        component: cardList1,
        meta: { title: 'Paginazione con card' }
      },
      {
        path: 'card-list-2',
        component: cardList2,
        meta: { title: 'Paginazione con card' }
      },
      {
        path: 'table-1',
        component: table1,
        meta: { title: 'Tabella' }
      },
      {
        path: 'chat',
        component: chat,
        meta: { title: 'Chat' }
      },
    ]
  },
  {
    path: '/metadata',
    component: metadataView,
    meta: { title: 'Metadati' }
  },
];

export const router = createRouter({
  history: createWebHistory (),
  routes: routes as RouteRecordRaw[], // fix typing route
})


router.beforeEach((to, from) => {
  const { title, description } = to.meta;

  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  // @ts-ignore
  document.title = title || "ASAP2";
});

export default router

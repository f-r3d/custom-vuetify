# Libreria personalizzazioni Vuetify

Questo progetto consente di creare la libreria "vuetify-desys", utilizzabile nei vari progetti aziendali, con vuetify e le customizzazioni aziendali già preimpostate.

## Struttura del progetto

Le customizzazioni di Vuetify si trovano nei file:
- `src/plugins/vuetify-desys.ts`
- `src/styles/variables.scss`

Dentro le cartelle "components" e "pages" si trovano i test per verificare le customizzazioni e non vengono buildate all'interno della libreria.

La cartella "router" serve solo per la navigazione delle pagine sotto "pages"

## Sviluppo
Per lavorare in sviluppo basta usare il comando `npm run dev`, tutte le modifiche alla libreria vanno effettuate, come scritto sopra, nei file `vuetify-desys.ts` e `variables.scss`

## Pubblicazione della libreria
Una volta cambiata la versione della libreria usare il comando `npm run build` e `npm publish`.
- L'entry non è il file main.ts, altrimenti finirebbero nella libreria anche tutte le pagine di test, ma il file `vuetify-desys.ts`. Da questo file viene esportato anche vuetify
- La libreria `vite-plugin-dts` nel file `vite-config` consente di esportare tutti i "tipi" di Vuetify
- Nel file `vite-config` viene escluso Vue dal pacchetto finale.

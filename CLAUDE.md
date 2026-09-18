# CLAUDE.md — carbon-save-buddy

App per il calcolo e il risparmio dell'impronta di carbonio: React + TypeScript +
Vite + Tailwind, componenti **shadcn/ui** (`components.json`). Generata
inizialmente con Lovable, poi proseguita a mano.

## Da non toccare

| Elemento | Regola | Perché |
|---|---|---|
| I **coefficienti di emissione** in `src/lib` / `src/data` | Non "arrotondare" né inventare | Sono il cuore dell'app: un numero sbagliato produce un risultato che sembra credibile ed è falso. Ogni coefficiente dovrebbe avere una fonte citata — se ne aggiungi uno, citala. |
| `src/components/ui` (shadcn) | Sono **copiati** nel progetto, non una dipendenza | Rigenerare un componente sovrascrive le modifiche fatte a mano. |
| Le variabili `VITE_*` | Solo valori **pubblici** | Vite le inlinea nel bundle. La repo è **pubblica**: una chiave lì è pubblica due volte. |

## ⚠️ Due lockfile in conflitto

Nella repo ci sono **sia `bun.lockb` sia `package-lock.json`**: eredità del
passaggio da Lovable (che usa Bun) a npm. Chi clona non sa quale usare, e i due
possono risolvere versioni diverse.

**Va scelto uno e cancellato l'altro.** Fino a quel momento: usare `npm`
(`package-lock.json` è quello aggiornato dai commit recenti) e non aggiornare
`bun.lockb`.

## Comandi

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Regole operative

- Commit in inglese o italiano nella storia; da qui in avanti **italiano**,
  indicativo presente, come il resto dell'ecosistema `lookover-labs`.
- Struttura: `src/pages`, `src/components`, `src/hooks`, `src/lib`.
- Non c'è configurazione di deploy in repo: non gira sul server.

## Cosa non fare

- **Non presentare stime come misurazioni.** L'app calcola stime basate su
  coefficienti medi: l'interfaccia deve dirlo. È la differenza tra uno strumento
  utile e greenwashing.
- **Non mettere niente di segreto in questa repo**: è pubblica.
- **Non aggiungere dipendenze Lovable-specifiche**: il progetto è uscito da quel
  flusso, rientrarci lo rende non modificabile a mano.

## Riferimenti

- `README.md`
- shadcn/ui: https://ui.shadcn.com

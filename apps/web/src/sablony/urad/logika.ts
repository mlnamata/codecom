// Logika šablony Úřad: životní situace s kroky online, na úřadě a samo (podle tpls.py).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV = { sit: 'stehovani' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

type Zpusob = 'online' | 'urad' | 'samo'

const SITUACE: { id: string; label: string; who: string; steps: { title: string; zpusob: Zpusob; text: string }[] }[] = [
  {
    "id": "stehovani",
    "label": "Stěhuji se do Javoří Lhoty",
    "who": "Poradí evidence obyvatel, kancelář č. 2, telefon [TELEFON].",
    "steps": [
      {
        "title": "Přihlaste se k trvalému pobytu",
        "zpusob": "urad",
        "text": "Přijďte s občanským průkazem a dokladem, že na adrese smíte bydlet, například nájemní smlouvou. Poplatek je 50 Kč, děti do 15 let ho neplatí."
      },
      {
        "title": "Přihlaste se k poplatku za odpad",
        "zpusob": "online",
        "text": "Formulář vyplníte na webu do 15 dnů. Poplatek je 900 Kč na osobu a rok, popelnici vydáme na úřadě."
      },
      {
        "title": "Máte psa? Přihlaste ho",
        "zpusob": "online",
        "text": "Poplatek ze psů je 200 Kč na rok. Známku vám pošleme poštou."
      },
      {
        "title": "Zapište děti do školy nebo školky",
        "zpusob": "urad",
        "text": "ZŠ a MŠ Javoří Lhota má 1. až 5. ročník. Zápis do první třídy je v dubnu, do školky v květnu."
      }
    ]
  },
  {
    "id": "narozeni",
    "label": "Narodilo se nám dítě",
    "who": "Poradí matrika, kancelář č. 1, telefon [TELEFON].",
    "steps": [
      {
        "title": "Porodnice ohlásí narození matrice",
        "zpusob": "samo",
        "text": "Rodný list vystaví matrika podle místa porodu."
      },
      {
        "title": "Dítě získá trvalý pobyt u matky",
        "zpusob": "samo",
        "text": "Nic nevyplňujete, údaj se propíše z registru obyvatel."
      },
      {
        "title": "Přihlaste dítě k poplatku za odpad",
        "zpusob": "online",
        "text": "Stačí doplnit jméno do vašeho přihlášení, do 15 dnů od narození."
      },
      {
        "title": "Přijďte na vítání občánků",
        "zpusob": "online",
        "text": "Pozvánku pošleme, když nám k tomu dáte souhlas. Souhlas můžete kdykoli odvolat."
      }
    ]
  },
  {
    "id": "stavba",
    "label": "Stavím nebo opravuji dům",
    "who": "Stavby povoluje stavební úřad v [ORP]. Na obci poradí místostarosta, telefon [TELEFON].",
    "steps": [
      {
        "title": "Podívejte se do územního plánu",
        "zpusob": "online",
        "text": "Mapa s územním plánem je na webu. Ukáže, co se na pozemku smí stavět."
      },
      {
        "title": "Podejte žádost přes Portál stavebníka",
        "zpusob": "online",
        "text": "Stavební řízení se vede digitálně. Žádost vyřizuje stavební úřad, ne obec."
      },
      {
        "title": "Domluvte připojení na vodovod a kanalizaci",
        "zpusob": "urad",
        "text": "Smlouvu uzavřete s obcí. Technik se nejdřív podívá na místo."
      },
      {
        "title": "Ohlaste lešení nebo kontejner na ulici",
        "zpusob": "online",
        "text": "Zábor obecního pozemku ohlaste předem. Platí se místní poplatek podle vyhlášky."
      }
    ]
  },
  {
    "id": "umrti",
    "label": "Zemřel nám blízký člověk",
    "who": "Poradí matrika, kancelář č. 1, telefon [TELEFON].",
    "steps": [
      {
        "title": "Lékař vystaví list o prohlídce zemřelého",
        "zpusob": "samo",
        "text": "List předá matrice a pohřební službě."
      },
      {
        "title": "Matrika vystaví úmrtní list",
        "zpusob": "urad",
        "text": "Vydává ho matrika podle místa úmrtí. Často ho vyřídí pohřební služba za vás."
      },
      {
        "title": "Domluvte hrobové místo",
        "zpusob": "urad",
        "text": "Nájem hrobu na hřbitově u kostela sv. Václava uzavřete s obcí."
      },
      {
        "title": "Poplatky se upraví",
        "zpusob": "samo",
        "text": "Obec údaje převezme z registru obyvatel. Nemusíte nic odhlašovat."
      }
    ]
  }
]

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const T: Record<Zpusob, { tag: string; bg: string; ink: string; line: string }> = {
    online: { tag: 'Online', bg: c.surface, ink: c.ink, line: c.accent },
    urad: { tag: 'Na úřadě', bg: c.bg, ink: c.ink, line: c.primary },
    samo: { tag: 'Proběhne samo', bg: c.bg, ink: c.muted, line: c.line },
  }
  const cur = SITUACE.find((x) => x.id === self.state.sit) ?? SITUACE[0]!
  return {
    situations: SITUACE.map((x) => ({
      label: x.label,
      pressed: x.id === cur.id,
      bg: x.id === cur.id ? c.bg : 'transparent',
      edge: x.id === cur.id ? c.primary : 'transparent',
      pick: () => self.setState({ sit: x.id }),
    })),
    cur: {
      label: cur.label,
      who: cur.who,
      steps: cur.steps.map((s, i) => ({
        n: String(i + 1),
        title: s.title,
        tag: T[s.zpusob].tag,
        tagBg: T[s.zpusob].bg,
        tagInk: T[s.zpusob].ink,
        tagLine: T[s.zpusob].line,
        text: s.text,
      })),
    },
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

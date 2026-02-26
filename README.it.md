<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.md">English</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

Un registro deterministico, con doppia verifica e storico riproducibile, dotato di attestazione esterna opzionale.

---

## Cos'è Registrum

Registrum è un **registro strutturale** per mantenere la leggibilità in sistemi in evoluzione.

Registra, convalida e ordina le transizioni di stato in base a vincoli espliciti, in modo che la struttura rimanga interpretabile man mano che aumenta l'entropia.

| Proprietà | Significato |
| ---------- | --------- |
| Strutturale | Opera sulla forma, non sul significato |
| Deterministico | Stessi input → stessi output, sempre |
| Fail-closed | Un input non valido causa un errore irreversibile, non un recupero parziale |
| Riproducibile | Le decisioni storiche possono essere rieseguite con risultati identici |
| Non-agente | Non agisce, non decide, non ottimizza |

**Registrum garantisce che il cambiamento rimanga leggibile.**

---

## Cos'è Registrum, in realtà

Registrum **non è esplicitamente**:

- Un ottimizzatore
- Un agente
- Un decisore
- Un controllore
- Un raccomandatore
- Un'intelligenza
- Adattivo o in grado di apprendere
- In grado di auto-ripararsi

Non risponde mai a *ciò che conta*.
Preserva solo le condizioni in cui quella domanda possa rimanere rispondibile.

---

## Principio fondamentale

> **L'entropia è consentita. L'illegibilità non lo è.**

Registrum non riduce l'entropia globalmente.
Limita i luoghi in cui l'entropia può esistere, in modo che l'identità, la genealogia e la struttura rimangano verificabili nel tempo.

---

## Come funziona Registrum

### Registro strutturale

Il registro è l'unica autorità costituzionale:

- Convalida tutte le transizioni di stato rispetto a 11 invarianti strutturali
- Applica vincoli di identità, genealogia e ordinamento
- Garantisce il determinismo e la tracciabilità
- Segnala le violazioni senza risolverle (fail-closed)

Tutto viene registrato attraverso di esso. Nulla lo bypassa.

### I 11 Invarianti

| Classe | Conteggio | Scopo |
| ------- | ------- | --------- |
| Identità | 3 | Unica, immutabile, indirizzata al contenuto |
| Genealogia | 4 | Parentela valida, aciclica, tracciabile |
| Ordinamento | 4 | Monotono, senza lacune, deterministico |

Questi invarianti sono costituzionali. Modificarli richiede una governance formale.

---

## Doppie Autorità Costituzionali

Registrum mantiene **due motori di invarianti indipendenti**:

| Autorità | Ruolo | Implementazione |
| --------- | ------ | ---------------- |
| Registro | Autorità primaria | DSL compilato (RPEG v1) |
| Legacy | Autorità secondaria | Predicati TypeScript |

A partire dalla Fase H, **il registro è il motore costituzionale predefinito**.
Legacy rimane come autorità secondaria indipendente.

### Perché due autorità?

- **È richiesto l'accordo** — Entrambe devono accettare affinché una transizione sia valida
- **La discrepanza interrompe** — La divergenza di parità interrompe il sistema (fail-closed)
- **L'indipendenza è intenzionale** — Nessuna può sovrascrivere l'altra

Questa è una caratteristica di sicurezza e leggibilità, non un debito tecnico.

La modalità duale è indefinita. Non ci sono piani per rimuovere nessuna delle due autorità.

### Prova di parità

274 test dimostrano l'equivalenza comportamentale:
- 58 test di parità su tutte le classi invarianti
- 12 test di parità di persistenza (stabilità temporale)
- Parità di replay: esecuzione in tempo reale ≡ esecuzione riprodotta

---

## Storia, replay e verificabilità

### Snapshot

Registrum può creare snapshot del suo stato completo:
- Schema versionato (`RegistrarSnapshotV1`)
- Hash basati sul contenuto
- Serializzazione deterministica

### Replay

Le decisioni storiche possono essere riprodotte:
- Esecuzione in sola lettura su un registro nuovo
- Dimostra il determinismo temporale
- Stesse transizioni → stessi risultati

### Verificabilità

Ogni giudizio strutturale è:
- Riproducibile a posteriori
- Indipendente dal contesto di esecuzione
- Verificabile da qualsiasi parte in possesso dello snapshot

---

## Attestazione esterna (opzionale)

Registrum può opzionalmente generare attestazioni crittografiche verso un registro immutabile esterno (come XRPL) per la verifica pubblica.

| Proprietà | Valore |
| ---------- | ------- |
| Predefinito | Disabilitato |
| Autorità | Non autoritativa (solo osservazione) |
| Effetto sul comportamento | Nessuno |

Le attestazioni registrano *il fatto* che Registrum abbia preso una decisione.
Registrum decide *cosa* è valido.

**L'autorità fluisce verso l'interno. L'osservazione fluisce verso l'esterno.**

Vedere:
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — Motivazioni
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — Specifiche

---

## Governance

Registrum è governato secondo un **modello costituzionale**.

| Principio | Significato |
| ----------- | --------- |
| Garanzie comportamentali > velocità di implementazione delle funzionalità | La correttezza ha la priorità |
| Solo modifiche basate su evidenze | Nessuna modifica senza prova |
| È richiesto un processo formale | Proposte, artefatti, decisioni |

### Stato attuale

- **Fase H**: Completata (registro predefinito, attestazione abilitata)
- **Governance**: Attiva e applicata
- **Tutte le modifiche**: Richiedono un processo di governance formale

Tutte le future modifiche sono decisioni di governance, non attività di sviluppo.

Vedere:
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — Perché esiste la governance
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — Cosa è governato
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — Transizione alla governance

---

## Stato del progetto

**Registrum ha raggiunto uno stato finale stabile.**

| Fase | Stato | Evidenza |
| ------- | -------- | ---------- |
| A–C | Completata | Registro principale, strumento di parità |
| E | Completata | Persistenza, replay, stabilità temporale |
| G | Completata | Framework di governance |
| H | Completata | Registro predefinito, attestazione abilitata |

**Copertura dei test**: 279 test superati su 14 suite di test

Lo sviluppo è passato alla gestione. Le future modifiche richiedono la governance.

Vedere: [`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## Come iniziare

### Installazione

```bash
npm install @mcp-tool-shop/registrum
```

### Utilizzo di base

```typescript
import { StructuralRegistrar } from "@mcp-tool-shop/registrum";
import { loadCompiledRegistry } from "@mcp-tool-shop/registrum/registry";

// Option 1: Legacy mode (TypeScript predicates, no compiled registry needed)
const registrar = new StructuralRegistrar({ mode: "legacy" });

// Option 2: Registry mode (default — requires compiled registry)
// const compiledRegistry = loadCompiledRegistry();
// const registrar = new StructuralRegistrar({ compiledRegistry });

// Register a root state
const result = registrar.register({
  from: null,
  to: { id: "state-1", structure: { version: 1 }, data: {} }
});

if (result.kind === "accepted") {
  console.log(`Registered at index ${result.orderIndex}`);
} else {
  console.log(`Rejected: ${result.violations.map(v => v.invariantId)}`);
}
```

### Esecuzione di esempi

Gli esempi nella directory `examples/` sono **dimostrazioni illustrative**, non API stabili.

Richiedono [`tsx`](https://github.com/esbuild-kit/tsx) per l'esecuzione:

```bash
# Run the refusal-as-success example
npm run example:refusal

# Or directly with npx
npx tsx examples/refusal-as-success.ts
```

**Nota:** Gli esempi si basano su `npx tsx` (o `npx ts-node` con supporto ESM). Questi non sono dipendenze per la produzione, ma strumenti di sviluppo/dimostrazione.

---

## Documentazione

| Documento | Scopo |
| ---------- | --------- |
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | Definizione dell'identità |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | Dichiarazioni formali con prove |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | Condizioni di errore irreversibile |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | Garanzie temporali |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | Comprensione dell'architettura a doppia testimonianza |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | Politica a doppia testimonianza |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | Formato dello snapshot (costituzionale) |

---

## Principi di progettazione

- Moderazione rispetto alla potenza
- Leggibilità rispetto alle prestazioni
- Vincoli rispetto alle euristiche
- Ispezione rispetto all'intervento
- Arresto rispetto a un'espansione infinita

Registrum ha successo quando diventa noioso, affidabile e prevedibile.

---

## Riassunto in una frase

Registrum è un registro strutturale che preserva l'interpretabilità man mano che i sistemi evolvono, garantendo che il cambiamento rimanga leggibile anche in presenza di entropia.

---

Creato da <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>

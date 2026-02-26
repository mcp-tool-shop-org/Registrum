<p align="center">
  <a href="README.md">English</a> | <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

Un registre sécurisé, avec double authentification, fonctionnant de manière déterministe, offrant un historique consultable et la possibilité d'une attestation externe optionnelle.

---

## Qu'est-ce que Registrum ?

Registrum est un **registre structuré** conçu pour garantir la lisibilité et la cohérence dans les systèmes en constante évolution.

Il enregistre, valide et ordonne les transitions d'état en respectant des contraintes précises, afin de garantir que la structure reste interprétable, même lorsque l'entropie augmente.

| Bien immobilier.
Propriété.
Patrimoine.
Possessions.
Biens.
Domaine.
Foncier.
Immobilier.
(Selon le contexte) | Signification. |
| Bien sûr, veuillez me fournir le texte que vous souhaitez que je traduise. | Veuillez fournir le texte à traduire. |
| Structurel. | Fonctionne sur la forme, et non sur le sens. |
| Déterministe. | Les mêmes entrées produisent toujours les mêmes sorties. |
| Arrêt en cas de défaillance.
Ou :
Mode de sécurité en cas de panne.
Ou :
Arrêt automatique en cas de défaut.
(The best option depends on the specific context.) | Une entrée incorrecte provoque une erreur irréversible, et non une récupération partielle. |
| Rejouable. | Les décisions historiques peuvent être reproduites avec des résultats identiques. |
| Non agentif. | Ne prend jamais de décisions, n'agit jamais et n'optimise rien. |

Registrum veille à ce que les modifications restent lisibles.

---

## Ce que Registrum n'est pas

Registrum n'est absolument pas :

- Un optimiseur
- Un agent
- Un décideur
- Un contrôleur
- Un système de recommandation
- Une intelligence
- Adaptatif ou apprenant
- Auto-réparateur

Elle ne répond jamais à ce qui compte vraiment.
Elle se contente de préserver les conditions dans lesquelles cette question peut encore être posée.

---

## Principe fondamental

L'entropie est tolérée. L'illisibilité ne l'est pas.

Registrum ne réduit pas l'entropie de manière globale.
Il limite les endroits où l'entropie peut se manifester, afin que l'identité, la lignée et la structure puissent être vérifiées au fil du temps.

---

## Comment fonctionne Registrum

### Responsable de la structure

Le greffier est l'unique autorité constitutionnelle :

- Valide toutes les transitions d'état par rapport à 11 invariants structurels.
- Applique les contraintes d'identité, de traçabilité et d'ordre.
- Garantit le déterminisme et la traçabilité.
- Signale les violations sans les corriger (approche "fail-closed").

Tout passe par elle. Rien ne lui échappe.

### Les 11 invariants

| Classe. | Compter. | Objectif. |
| Veuillez fournir le texte à traduire. | "Please provide the English text you would like me to translate." | Veuillez fournir le texte à traduire. |
| Identité. | 3 | Unique, immuable, basé sur le contenu. |
| Ascendance.
Généalogie.
Origine.
Lignée.
Descendance. | 4 | Ascendance valide, sans cycles, traçable. |
| Commande. | 4 | Monotone, sans lacunes, déterministe. |

Ces invariants sont constitutionnels. Leur modification nécessite une procédure formelle et une gouvernance établie.

---

## Témoins constitutionnels doubles

Registrum maintient **deux moteurs invariants indépendants** :

| Témoin. | Rôle. | Mise en œuvre. |
| Veuillez fournir le texte à traduire. | Veuillez fournir le texte à traduire. | "The quick brown fox jumps over the lazy dog."
----------------
"Le rapide renard brun saute par-dessus le chien paresseux." |
| Registre. | Autorité principale. | DSL compilée (RPEG version 1). |
| Héritage. | Témoin secondaire. | Prédicats TypeScript. |

À partir de la phase H, **le registre est le mécanisme constitutionnel par défaut**.
L'ancien système reste en place en tant que témoin secondaire indépendant.

### Pourquoi deux témoins ?

- **Un accord est nécessaire** : Les deux parties doivent donner leur consentement pour qu'une transition soit valide.
- **Le désaccord bloque le système** : Toute divergence entre les deux parties interrompt le fonctionnement du système (mécanisme de sécurité par défaut).
- **L'indépendance est délibérée** : Aucune des deux parties ne peut outrepasser l'autre.

Il s'agit d'une fonctionnalité de sécurité et de lisibilité, et non d'une dette technique.

Le mode double est indéterminé. Il n'y a aucun projet de supprimer l'un ou l'autre des témoins.

### Preuves d'égalité

274 tests prouvent l'équivalence comportementale :
- 58 tests de parité sur toutes les classes invariantes
- 12 tests de parité de persistance (stabilité temporelle)
- Parité de relecture : exécution en direct ≡ exécution relue

---

## Historique, relecture et auditabilité

### Instantanés

Registrum peut créer des instantanés de son état complet :
- Schéma versionné (`RegistrarSnapshotV1`)
- Hachages adressés par contenu
- Sérialisation déterministe

### Relecture

Les décisions passées peuvent être relues :
- Exécution en lecture seule sur un registre neuf
- Prouve le déterminisme temporel
- Les mêmes transitions → les mêmes résultats

### Auditabilité

Chaque jugement structurel est :
- Reproductible a posteriori
- Indépendant du contexte d'exécution
- Vérifiable par toute partie disposant de l'instantané

---

## Attestation externe (facultative)

Registrum peut facultativement générer des attestations cryptographiques vers un registre immuable externe (comme XRPL) pour une validation publique.

| Propriété | Valeur |
| ---------- | ------- |
| Par défaut | Désactivé |
| Autorité | Non autoritaire (témoin uniquement) |
| Effet sur le comportement | Aucun |

Les attestations enregistrent *ce que* Registrum a décidé.
Registrum décide *ce qui* est valide.

**L'autorité est interne. La validation est externe.**

Voir :
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — Justification
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — Spécification

---

## Gouvernance

Registrum est géré selon un **modèle constitutionnel**.

| Principe | Signification |
| ----------- | --------- |
| Garanties comportementales > vitesse de développement | La correction prime |
| Changements basés sur des preuves uniquement | Aucun changement sans preuve |
| Processus formel requis | Propositions, artefacts, décisions |

### Statut actuel

- **Phase H**: Complète (registre par défaut, attestation activée)
- **Gouvernance**: Active et appliquée
- **Tous les changements**: Nécessitent un processus de gouvernance formel

Tous les futurs changements sont des décisions de gouvernance, et non des tâches d'ingénierie.

Voir :
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — Pourquoi la gouvernance existe
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — Ce qui est géré
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — Transition vers la gouvernance

---

## Statut du projet

**Registrum a atteint un état final stable.**

| Phase | Statut | Preuves |
| ------- | -------- | ---------- |
| A–C | Complète | Registre principal, outil de parité |
| E | Complète | Persistance, relecture, stabilité temporelle |
| G | Complète | Cadre de gouvernance |
| H | Complète | Registre par défaut, attestation activée |

**Couverture des tests**: 279 tests réussis répartis sur 14 suites de tests

Le développement a été transféré à la gestion. Les futurs changements nécessitent une gouvernance.

Voir : [`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## Premiers pas

### Installation

```bash
npm install @mcp-tool-shop/registrum
```

### Utilisation de base

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

### Exemples

Les exemples du répertoire `examples/` sont des **démonstrations illustratives**, et non une API stable.

Ils nécessitent [`tsx`](https://github.com/esbuild-kit/tsx) pour fonctionner :

```bash
# Run the refusal-as-success example
npm run example:refusal

# Or directly with npx
npx tsx examples/refusal-as-success.ts
```

**Note :** Les exemples utilisent `npx tsx` (ou `npx ts-node` avec prise en charge d'ESM). Ce ne sont pas des dépendances de production, mais des outils de développement/démonstration.

---

## Documentation

| Document | Objectif |
| ---------- | --------- |
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | Définition de l'identité |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | Revendications formelles avec preuves |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | Conditions d'échec irréversible |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | Garanties temporelles |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | Comprendre l'architecture à double témoin |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | Politique à double témoin |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | Format de snapshot (constitutionnel) |

---

## Principes de conception

- Modération plutôt que puissance
- Lisibilité plutôt que performance
- Contraintes plutôt que heuristiques
- Inspection plutôt qu'intervention
- Arrêt plutôt que prolongation infinie

Registrum réussit lorsqu'il devient banal, fiable et prévisible.

---

## Résumé en une phrase

Registrum est un registre structuré qui préserve l'interprétabilité à mesure que les systèmes évoluent, garantissant que le changement reste lisible malgré l'entropie.

---

Créé par <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>

<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.md">English</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

<p align="center"><strong>管理された、二重検証による、決定論的なレジスタであり、再現可能な履歴を持ち、オプションで外部の認証機能も備えています。</strong></p>

---

## Qu'est-ce que Registrum ?

Registrumは、**構造化されたレジスタ**です。これは、明示的な制約の下で状態遷移を記録、検証、および順序付けるライブラリであり、エントロピーが増加しても、構造が解釈可能な状態を維持します。

| Propriété | Signification |
|----------|---------|
| **Structural** | Fonctionne sur la forme, et non sur le sens. |
| **Deterministic** | Les mêmes entrées produisent toujours les mêmes sorties. |
| **Fail-closed** | Une entrée incorrecte provoque une erreur irréversible, et non une récupération partielle. |
| **Replayable** | Les décisions historiques peuvent être reproduites avec des résultats identiques. |
| **Non-agentic** | Ne prend jamais de décisions, n'agit jamais et n'optimise rien. |

**Registrumは、変更が常に理解できる状態を維持します。**

---

## なぜRegistrumを使うのか？

システムは進化し、エントロピーが増加し、構造は劣化します。

多くのツールは、これに対応するために、インテリジェンス（最適化器、エージェント、自己修復機能など）を追加します。Registrumは、その逆のアプローチを取ります。**制約を追加します。**

- **ライブラリ開発者向け**：状態管理に構造的な保証を組み込み、ユーザーが手間なく可読性を実現できるようにします。
- **監査が重要なシステム向け**：すべての状態遷移は、決定論的であり、再現可能であり、独立して検証可能です。
- **複雑さを避けたいチーム向け**：Registrumは、無効な遷移を、構造化された結果とともに拒否し、静かに問題を隠蔽することはありません。

その結果、システム全体で、ID、履歴、および順序が、変更の回数に関わらず、常に確認できる状態が維持されます。

---

## Principe fondamental

> **エントロピーは許容されます。しかし、不可解さは許されません。**

Registrumは、全体としてエントロピーを減少させるものではありません。
Registrumは、エントロピーが存在できる場所を制限し、ID、履歴、および構造が時間とともに確認できる状態を維持します。

---

## Ce que Registrum n'est pas

Registrumは、明示的に以下の機能ではありません。

- 最適化器、エージェント、または意思決定機能
- コントローラー、レコメンダー、またはインテリジェンス
- 適応性、学習機能、または自己修復機能

Registrumは、*何が重要か*という問いに決して答えることはありません。
Registrumは、その問いが依然として答えられる状態を維持するだけです。

---

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────┐
│                  StructuralRegistrar                     │
│                                                         │
│  ┌───────────────┐         ┌──────────────────────┐     │
│  │  Registry      │  parity │  Legacy              │     │
│  │  (RPEG v1 DSL) │◄──────►│  (TS predicates)     │     │
│  │  [primary]     │         │  [secondary witness] │     │
│  └───────┬───────┘         └──────────┬───────────┘     │
│          │         agree?             │                  │
│          └────────────┬───────────────┘                  │
│                       ▼                                  │
│              11 Structural Invariants                    │
│         ┌──────────┬──────────┬──────────┐              │
│         │ Identity │ Lineage  │ Ordering │              │
│         │  (3)     │  (4)     │  (4)     │              │
│         └──────────┴──────────┴──────────┘              │
│                       │                                  │
│          ┌────────────┴────────────┐                     │
│          ▼                         ▼                     │
│     ✅ Accepted                ❌ Refused                │
│     (stateId, orderIndex)      (violations[])            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Persistence: Snapshot · Replay · Rehydrate      │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Attestation (optional): XRPL witness ledger     │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## Comment fonctionne Registrum

### Responsable de la structure

レジスタは、唯一の権限を持つコンポーネントです。

- すべての状態遷移を、**11の構造的な不変条件**に対して検証します。
- ID、履歴、および順序に関する制約を適用します。
- 決定論性と追跡可能性を保証します。
- 問題を解決せずに、違反を検出し、報告します（フェイルセーフ）。

すべてがこのレジスタを経由します。何もこのレジスタを迂回することはできません。

### Les 11 invariants

| Classe. | Compter. | Objectif |
|-------|-------|---------|
| **Identity** | 3 | Unique, immuable, basé sur le contenu. |
| **Lineage** | 4 | Ascendance valide, sans cycles, traçable. |
| **Ordering** | 4 | Monotone, sans lacunes, déterministe. |

これらの不変条件は、憲法のようなものです。これらを変更するには、正式な承認が必要です。

---

## Témoins constitutionnels doubles

Registrumは、**2つの独立した不変条件エンジン**を維持しています。

| Témoin. | Rôle. | Mise en œuvre. |
|---------|------|----------------|
| **Registry** | Autorité principale. | DSL compilée (RPEG version 1). |
| **Legacy** | Témoin secondaire. | Prédicats TypeScript. |

Phase H以降、**レジスタはデフォルトの不変条件エンジン**となっています。
従来のシステムは、独立した二次的な検証機能として残っています。

### Pourquoi deux témoins ?

- **合意が必要です**：遷移が有効であるためには、両方のエンジンが合意する必要があります。
- **意見の不一致は停止を引き起こします**：不一致が発生すると、システムは停止します（フェイルセーフ）。
- **独立性は意図的な設計です**：どちらのエンジンも、もう一方を上書きすることはできません。

これは、技術的な負債ではなく、安全と可読性を確保するための機能です。
二重検証モードは、恒久的なものです。どちらの検証機能も削除する予定はありません。

### Preuves d'égalité

274個のテストが、動作の同等性を証明しています。
- すべての不変条件クラスにわたる58個の整合性テスト
- 12個の永続性整合性テスト（時間的な安定性）
- 再生整合性：実行中の状態 ≡ 再生された状態

---

## Historique, relecture et auditabilité

| 機能 | 説明 |
|------------|-------------|
| **Snapshot** | バージョン管理されたスキーマ (`RegistrarSnapshotV1`)、コンテンツベースのハッシュ、決定論的なシリアライゼーション |
| **Replay** | 新しいレジスタに対して、読み取り専用で再実行を行うことで、時間的な決定論を証明します。 |
| **Audit** | すべての構造的な判断は、再現可能であり、コンテキストに依存せず、スナップショットを持つすべての関係者が検証可能です。 |

---

## Attestation externe (facultative)

Registrumは、オプションで、暗号化された認証情報を、外部の不変の台帳（XRPLなど）に送信し、公開検証を行うことができます。

| Propriété | Valeur |
|----------|-------|
| Par défaut | Désactivé |
| Autorité | Non autoritaire (témoin uniquement) |
| Effet sur le comportement | Aucun |

認証情報は、Registrumが*どのような判断をしたか*を記録します。
Registrumは、*何が有効であるか*を判断します。

**権限は内側から流れ、検証は外側へ流れます。**

詳細については、以下のドキュメントを参照してください。
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — 理由
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — 仕様

---

## Premiers pas

### Installation

```bash
npm install @mcp-tool-shop/registrum
```

### クイックスタート

```typescript
import { StructuralRegistrar } from "@mcp-tool-shop/registrum";

const registrar = new StructuralRegistrar({ mode: "legacy" });

// Register a root state
const result = registrar.register({
  from: null,
  to: { id: "state-1", structure: { version: 1 }, data: {} },
});

if (result.kind === "accepted") {
  console.log(`Registered at index ${result.orderIndex}`);
} else {
  // Structured refusal — the violations name which invariants failed
  console.log(`Refused: ${result.violations.map((v) => v.invariantId)}`);
}
```

### モード

| モード | エンジン | 使用場面 |
|------|--------|-------------|
| `"legacy"` | Prédicats TypeScript. | 迅速なプロトタイピング、外部依存関係なし |
| `"registry"` (デフォルト) | コンパイルされたRPEG v1 DSL | 完全なデュアルウィットネスによる本番環境での利用 |

```typescript
import { StructuralRegistrar } from "@mcp-tool-shop/registrum";
import { loadCompiledRegistry } from "@mcp-tool-shop/registrum/registry";

// Registry mode (default) — compiled DSL + legacy as dual witnesses
const compiledRegistry = loadCompiledRegistry();
const registrar = new StructuralRegistrar({ compiledRegistry });
```

### Exemples

[`examples/`](examples/) ディレクトリには、説明的なデモンストレーションが含まれています（安定版APIではありません）。
これらは [`tsx`](https://github.com/esbuild-kit/tsx) を必要とします。

```bash
npm run example:refusal        # Refusal-as-success demo
npx tsx examples/refusal-as-success.ts   # Or run directly
```

---

## APIクイックリファレンス

### コアの機能

```typescript
// Implementation
import { StructuralRegistrar } from "@mcp-tool-shop/registrum";

// Types
import type {
  State,          // { id, structure, data }
  Transition,     // { from, to, metadata? }
  RegistrationResult,   // { kind: "accepted" | "refused", ... }
  Invariant,      // { id, scope, check }
  InvariantViolation,   // { invariantId, classification, message }
} from "@mcp-tool-shop/registrum";

// Invariants
import {
  INITIAL_INVARIANTS,     // All 11 invariants
  getInvariantsByScope,   // Filter by "identity" | "lineage" | "ordering"
  getInvariantById,       // Lookup by invariant ID
} from "@mcp-tool-shop/registrum";

// Version
import { REGISTRUM_VERSION } from "@mcp-tool-shop/registrum";
```

### `StructuralRegistrar`

| メソッド | 戻り値 | 説明 |
|--------|---------|-------------|
| `register(transition)` | `RegistrationResult` | 状態遷移を検証し、記録します。 |
| `getState(id)` | `State \` | undefined` | 登録された状態をIDで取得します。 |
| `getHistory()` | `Transition[]` | 受け入れられた遷移の完全な順序付き履歴。 |
| `snapshot()` | `RegistrarSnapshotV1` | 決定論的で、コンテンツベースのスナップショット。 |

---

## Gouvernance

Registrum は、**憲法モデル**に基づいて運用されます。

| Principe | Signification |
|-----------|---------|
| Garanties comportementales > vitesse de développement | La correction prime |
| Changements basés sur des preuves uniquement | Aucun changement sans preuve |
| Processus formel requis | Propositions, artefacts, décisions |

### Statut actuel

- **フェーズH**: 完了 (registryのデフォルト、アテステーション有効)
- **ガバナンス**: 活発で、実施されています。
- **すべての変更**: 正式なガバナンスプロセスが必要です。

今後のすべての変更は、エンジニアリングタスクではなく、ガバナンスの決定事項です。

参照先:
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — ガバナンスの存在理由
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — ガバナンスの対象範囲
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — ガバナンスへの移行

---

## Statut du projet

**Registrum は、安定した最終状態に到達しました。**

| Phase | Statut | Preuves |
|-------|--------|----------|
| A–C | Complète | Registre principal, outil de parité |
| E | Complète | Persistance, relecture, stabilité temporelle |
| G | Complète | Cadre de gouvernance |
| H | Complète | Registre par défaut, attestation activée |

**テストカバレッジ**: 14のテストスイートで構成される279件のテストが合格しています。

開発は、管理体制への移行が完了しました。今後の変更には、ガバナンスが必要です。

参照先: [`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## Documentation

| Document | Objectif |
|----------|---------|
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | Définition de l'identité |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | Revendications formelles avec preuves |
| [`INVARIANTS.md`](docs/INVARIANTS.md) | 完全な不変の参照 |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | Conditions d'échec irréversible |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | Garanties temporelles |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | デュアルウィットネスアーキテクチャのチュートリアル |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | Format de snapshot (constitutionnel) |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | Politique à double témoin |

---

## Principes de conception

- **権力に対する抑制**
- **パフォーマンスよりも可読性**
- **ヒューリスティクスよりも制約**
- **介入よりも検査**
- **無限の拡張よりも停止**

Registrum が成功するのは、退屈で、信頼でき、予測可能になる時です。

---

## セキュリティとデータ範囲

| 側面 | 詳細 |
|--------|--------|
| **Data touched** | メモリ内での状態遷移、オプションでローカルファイルシステムへのJSONスナップショット |
| **Data NOT touched** | ネットワークリクエストなし、外部APIなし、データベースなし、ユーザー認証情報なし |
| **Permissions** | ユーザーが指定したスナップショットパスへのみ読み書き可能 (永続化を使用する場合) |
| **Network** | なし — 完全オフラインのライブラリ (XRPLアテステーションはデフォルトで無効) |
| **Telemetry** | 収集または送信されるデータはありません。 |

脆弱性報告については、[SECURITY.md](SECURITY.md) を参照してください。

---

## 貢献

Registrum は、ガバナンスを優先する貢献モデルを採用しています。すべての変更には、証拠に基づいた正式な提案が必要です。

詳細な貢献に関する哲学とプロセスについては、[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

---

## スコアカード

| カテゴリ | スコア |
|----------|-------|
| A. セキュリティ | 10 |
| B. エラー処理 | 10 |
| C. 運用者向けドキュメント | 10 |
| D. 導入時の衛生 | 10 |
| E. 識別 (ソフト) | 10 |
| **Overall** | **50/50** |

> 詳細な監査: [SHIP_GATE.md](SHIP_GATE.md) · [SCORECARD.md](SCORECARD.md)

---

## ライセンス

MIT

---

Créé par <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>

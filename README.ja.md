<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

管理対象であり、二重の検証機構を備え、決定論的なレジスタであり、履歴を再現可能で、オプションで外部からの検証も可能です。

---

## Registrumとは

Registrumは、進化するシステムにおいて可読性を維持するための**構造化されたレジスタ**です。

これは、明示的な制約の下で状態遷移を記録、検証、および順序付けし、構造が解釈可能な状態を維持します。

| 特性 | 意味 |
| ---------- | --------- |
| 構造的 | 意味ではなく、形式に基づいて動作します。 |
| 決定論的 | 同じ入力に対して、常に同じ出力になります。 |
| フェイルセーフ | 無効な入力は、部分的な復旧ではなく、完全なエラーを引き起こします。 |
| 再現可能 | 過去の決定は、同じ結果で再実行できます。 |
| 非自律的 | 決して、自律的に判断したり、最適化したりしません。 |

**Registrumは、変化が可読な状態を維持することを保証します。**

---

## Registrumではないもの

Registrumは、明示的に**以下のものではありません**:

- 最適化ツール
- エージェント
- 意思決定者
- コントローラー
- 推奨システム
- 知能
- 適応または学習機能
- 自己修復機能

これは、*何が重要か*という問いに決して答えることはありません。
これは、その問いが答えられる状態が維持されるための条件のみを保持します。

---

## 基本原則

> **エントロピーは許容されます。しかし、不可読性は許容されません。**

Registrumは、全体としてエントロピーを減少させることはありません。
これは、エントロピーが存在できる場所を制限し、時間経過とともに、同一性、系統、および構造が検査可能であることを保証します。

---

## Registrumの動作

### 構造化されたレジスタ

レジスタは、唯一の憲法上の権限です。

- すべての状態遷移を、11の構造的な不変条件に対して検証します。
- 同一性、系統、および順序付けの制約を適用します。
- 決定論性と追跡可能性を保証します。
- 違反を検出し、解決することなく報告します（フェイルセーフ）。

すべてがこのレジスタを経由します。何もこのレジスタを迂回することはできません。

### 11の不変条件

| クラス | カウント | 目的 |
| ------- | ------- | --------- |
| 同一性 | 3 | 一意、不変、コンテンツベースのアドレス |
| 系統 | 4 | 有効な親子関係、非循環、追跡可能 |
| 順序付け | 4 | 単調増加、ギャップなし、決定論的 |

これらの不変条件は、憲法上のものです。これらを変更するには、正式な承認が必要です。

---

## 二重の憲法上の検証機構

Registrumは、**2つの独立した不変条件検証エンジン**を維持します。

| 検証エンジン | 役割 | 実装 |
| --------- | ------ | ---------------- |
| レジストリ | 主要な権限 | コンパイルされたDSL (RPEG v1) |
| レガシー | 二次的な検証エンジン | TypeScriptの述語 |

Phase H以降、**レジストリはデフォルトの憲法上のエンジンです。**
レガシーは、独立した二次的な検証エンジンとして残っています。

### なぜ二重の検証機構が必要なのか？

- **合意が必要** - 状態遷移が有効であるためには、両方が合意する必要があります。
- **意見の不一致は停止** - 不一致が発生すると、システムは停止します（フェイルセーフ）。
- **独立性は意図的** - どちらも、もう一方を上書きすることはできません。

これは、技術的な負債ではなく、安全と可読性のための機能です。

二重モードは、恒久的なものです。どちらの検証エンジンも削除する計画はありません。

### 検証結果

274件のテストが、振る舞いの同等性を証明しています。
- 不変クラス全体にわたる58件のパリティテスト
- 12件の永続性パリティテスト（時間的な安定性）
- リプレイパリティ：ライブ実行 ≡ リプレイ実行

---

## 履歴、リプレイ、および監査可能性

### スナップショット

Registrumは、完全な状態をスナップショットとして保存できます。
- バージョン管理されたスキーマ (`RegistrarSnapshotV1`)
- コンテンツベースのハッシュ
- 決定論的なシリアライゼーション

### リプレイ

過去の決定は、リプレイ可能です。
- 新しいレジストラーに対する読み取り専用実行
- 時間的な決定論を証明
- 同じ遷移 → 同じ結果

### 監査可能性

すべての構造的な判断は、以下のようになります。
- 事後的に再現可能
- 実行コンテキストに依存しない
- スナップショットを持つすべての関係者によって検証可能

---

## 外部認証（オプション）

Registrumは、オプションで、公開可能な証拠として、外部の不変台帳（例えばXRPL）に暗号化された認証情報を送信することができます。

| プロパティ | 値 |
| ---------- | ------- |
| デフォルト | 無効 |
| 権限 | 権限なし（監視のみ） |
| 振る舞いへの影響 | なし |

認証情報は、Registrumが決定したことを記録します。
Registrumは、何が有効かを決定します。

**権限は内向きに、監視は外向きに流れます。**

参照：
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — 理由
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — 仕様

---

## ガバナンス

Registrumは、**憲法モデル**に基づいてガバナンスされます。

| 原則 | 意味 |
| ----------- | --------- |
| 振る舞いの保証 > 機能の速度 | 正確性が優先されます。 |
| 証拠に基づく変更のみ。 | 証拠なしでの変更は認められません。 |
| 正式なプロセスが必要です。 | 提案、成果物、決定 |

### 現在の状況

- **フェーズH**: 完了（レジストリのデフォルト設定、認証機能有効）
- **ガバナンス**: 実施中
- **すべての変更**: 正式なガバナンスプロセスが必要です

将来のすべての変更は、エンジニアリングタスクではなく、ガバナンスの決定事項です。

参照：
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — ガバナンスが存在する理由
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — ガバナンスの対象
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — ガバナンスへの移行

---

## プロジェクトの状況

**Registrumは、安定した最終状態に達しました。**

| フェーズ | 状況 | 証拠 |
| ------- | -------- | ---------- |
| A–C | 完了 | コアレジストラー、パリティハネス |
| E | 完了 | 永続性、リプレイ、時間的な安定性 |
| G | 完了 | ガバナンスフレームワーク |
| H | 完了 | レジストリのデフォルト設定、認証機能有効 |

**テストカバレッジ**: 14のテストスイート全体で279件のテストが合格

開発は、管理への移行が完了しました。将来の変更には、ガバナンスが必要です。

参照：[`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## 開始方法

### インストール

```bash
npm install @mcp-tool-shop/registrum
```

### 基本的な使い方

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

### 例の実行

`examples/`ディレクトリにある例は、**安定したAPIではない、説明的なデモンストレーション**です。

これらは、[`tsx`](https://github.com/esbuild-kit/tsx)を使用して実行する必要があります。

```bash
# Run the refusal-as-success example
npm run example:refusal

# Or directly with npx
npx tsx examples/refusal-as-success.ts
```

**注意:** 以下の例は `npx tsx` (または ESMサポート付きの `npx ts-node`) に依存しています。これらは本番環境での依存関係ではなく、開発/デモンストレーションツールです。

---

## ドキュメント

| ドキュメント | 目的 |
| ---------- | --------- |
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | ID定義 |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | 証拠に基づく正式な主張 |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | 致命的なエラー条件 |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | 時間的な保証 |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | デュアル・ウィットネスアーキテクチャの理解 |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | デュアル・ウィットネスポリシー |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | スナップショット形式（構成） |

---

## 設計思想

- 権力よりも抑制
- 性能よりも可読性
- ヒューリスティクスよりも制約
- 介入よりも検査
- 無限の拡張よりも停止

Registrumが成功するのは、退屈で、信頼でき、そして予測可能になる時です。

---

## 一文で要約

Registrumは、システムが進化するにつれて解釈可能性を維持する構造化されたレジスタであり、変化がエントロピーの影響下でも可読性を保つようにします。

---

<a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>によって開発されました。

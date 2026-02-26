<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.md">English</a> | <a href="README.es.md">Español</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

一个受控、双重验证、确定性的注册器，具有可重放的历史记录，并提供可选的外部验证。

---

## 什么是 Registrum

Registrum 是一种**结构化注册器**，用于在不断演进的系统中保持可读性。

它在明确的约束条件下记录、验证和排序状态转换，以确保结构在熵增加的过程中仍然可理解。

| 属性 | 含义 |
| ---------- | --------- |
| 结构化 | 作用于形式，而非含义 |
| 确定性 | 相同的输入始终产生相同的输出 |
| 安全失败 | 无效的输入会导致完全失败，而不是部分恢复 |
| 可重放 | 历史决策可以以完全相同的结果重新执行 |
| 非自主 | 从不采取行动、做出决策或进行优化 |

**Registrum 确保变化始终保持可读。**

---

## Registrum 不是什么

Registrum 明确**不是**：

- 优化器
- 代理
- 决策者
- 控制器
- 推荐者
- 智能系统
- 自适应或学习系统
- 自我修复系统

它永远不会回答“什么重要”。
它只保留使该问题仍然可以回答的条件。

---

## 核心原则

> **允许熵的存在，但不允许不可读性。**

Registrum 不会全局减少熵。
它限制了熵可能存在的范围，以确保身份、血缘和结构随着时间的推移保持可检查性。

---

## Registrum 的工作原理

### 结构化注册器

注册器是唯一的宪法权威：

- 验证所有状态转换，以符合 11 个结构性不变性
- 强制执行身份、血缘和排序约束
- 保证确定性和可追溯性
- 暴露违反情况，但不进行解决（安全失败）

所有内容都通过它进行注册。没有任何内容可以绕过它。

### 11 个不变性

| 类别 | 计数 | 目的 |
| ------- | ------- | --------- |
| 身份 | 3 | 唯一、不可变、基于内容 |
| 血缘 | 4 | 有效的父子关系、无循环、可追溯 |
| 排序 | 4 | 单调、无间隙、确定性 |

这些不变性是宪法的。更改它们需要正式的治理。

---

## 双重宪法验证器

Registrum 维护**两个独立的不变性引擎**：

| 验证器 | 角色 | 实现 |
| --------- | ------ | ---------------- |
| 注册器 | 主要权威 | 编译的 DSL (RPEG v1) |
| 遗留 | 次要验证器 | TypeScript 谓词 |

从 Phase H 开始，**注册器是默认的宪法引擎**。
遗留版本仍然作为独立的次要验证器存在。

### 为什么需要两个验证器？

- **需要达成一致** — 只有两个验证器都接受，状态转换才有效
- **不一致会导致停止** — 验证器之间的不一致会导致系统停止（安全失败）
- **独立性是故意的** — 任何一个验证器都不能覆盖另一个验证器

这是一个安全性和可读性功能，而不是技术债务。

双模式是永久的。没有计划移除任何一个验证器。

### 一致性证据

274 个测试证明了行为上的等价性：
- 58 个针对所有不变类的对齐测试
- 12 个持久性对齐测试（时间稳定性）
- 重放对齐：实时执行 ≡ 重放执行

---

## 历史、重放和可审计性

### 快照

Registrum 可以创建其完整状态的快照：
- 版本化的模式 (`RegistrarSnapshotV1`)
- 基于内容哈希
- 确定性序列化

### 重放

可以重放历史决策：
- 仅读模式，针对新的注册器
- 证明时间上的确定性
- 相同的转换 → 相同的结果

### 可审计性

每个结构性判断都是：
- 可以在事后重现
- 不依赖于执行环境
- 任何拥有快照的方都可以验证

---

## 外部证明（可选）

Registrum 可以选择性地向外部不可篡改的账本（例如 XRPL）发出加密证明，以便公开验证。

| 属性 | 值 |
| ---------- | ------- |
| 默认 | 禁用 |
| 权限 | 非权威（仅作为观察者） |
| 对行为的影响 | 无 |

证明记录了 Registrum 做出 *什么* 决定。
Registrum 决定 *什么* 是有效的。

**权限向内流动。 证明向外流动。**

参见：
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — 理由
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — 规范

---

## 治理

Registrum 遵循 **宪法模型** 进行治理。

| 原则 | 含义 |
| ----------- | --------- |
| 行为保证 > 功能迭代速度 | 正确性优先 |
| 仅基于证据的更改 | 没有证明，不允许更改 |
| 需要正式流程 | 提案、工件、决策 |

### 当前状态

- **阶段 H**: 完成（注册器默认配置，启用证明）
- **治理**: 活跃且执行
- **所有更改**: 需要正式的治理流程

所有未来的更改都是治理决策，而不是工程任务。

参见：
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — 治理存在的理由
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — 治理范围
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — 治理过渡

---

## 项目状态

**Registrum 已达到稳定的最终状态。**

| 阶段 | 状态 | 证据 |
| ------- | -------- | ---------- |
| A–C | 完成 | 核心注册器，对齐测试框架 |
| E | 完成 | 持久性、重放、时间稳定性 |
| G | 完成 | 治理框架 |
| H | 完成 | 注册器默认配置，启用证明 |

**测试覆盖率**: 14 个测试套件中通过了 279 个测试

开发已过渡到维护阶段。 未来的更改需要治理。

参见：[`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## 入门

### 安装

```bash
npm install @mcp-tool-shop/registrum
```

### 基本用法

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

### 运行示例

`examples/` 目录中的示例是 **演示示例**，而不是稳定的 API。

它们需要 [`tsx`](https://github.com/esbuild-kit/tsx) 才能运行：

```bash
# Run the refusal-as-success example
npm run example:refusal

# Or directly with npx
npx tsx examples/refusal-as-success.ts
```

**注意：** 示例依赖于 `npx tsx`（或支持 ESM 的 `npx ts-node`）。这些不是生产环境的依赖项，而是开发/演示工具。

---

## 文档

| 文档 | 目的 |
| ---------- | --------- |
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | 身份定义 |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | 带有证据的正式声明 |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | 严重故障条件 |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | 时间保证 |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | 理解双重验证架构 |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | 双重验证策略 |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | 快照格式（宪法） |

---

## 设计理念

- 强调约束而非强大
- 强调可读性而非性能
- 强调约束而非启发式方法
- 强调检查而非干预
- 强调停止而非无限扩展

当 Registrum 变得平淡、可靠且不出意外时，它就取得了成功。

---

## 一句话概括

Registrum 是一种结构化注册器，它在系统演进过程中保持可解释性，确保在熵的作用下，变更仍然是可理解的。

---

由 <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a> 构建。

<p align="center">
  <a href="README.md">English</a> | <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

Um registro determinístico, com dupla validação e histórico reproduzível, com opção de validação externa.

---

## O que é o Registrum

O Registrum é um **registro estrutural** para manter a legibilidade em sistemas em evolução.

Ele registra, valida e organiza as transições de estado sob restrições explícitas, para que a estrutura permaneça interpretável à medida que a entropia aumenta.

| Propriedade | Significado |
| ---------- | --------- |
| Estrutural | Opera na forma, não no significado |
| Determinístico | Mesmas entradas → mesmas saídas, sempre |
| Falha segura | Entrada inválida causa uma falha completa, não uma recuperação parcial |
| Reproduzível | Decisões históricas podem ser reexecutadas com resultados idênticos |
| Não é um agente | Nunca age, decide ou otimiza |

**O Registrum garante que a mudança permaneça legível.**

---

## O que o Registrum Não É

O Registrum **não é explicitamente**:

- Um otimizador
- Um agente
- Um tomador de decisões
- Um controlador
- Um recomendador
- Uma inteligência
- Adaptável ou com capacidade de aprendizado
- Autocurativo

Ele nunca responde *o que importa*.
Ele apenas preserva as condições sob as quais essa pergunta permanece respondível.

---

## Princípio Fundamental

> **A entropia é permitida. A ilegibilidade não.**

O Registrum não reduz a entropia globalmente.
Ele restringe onde a entropia pode existir, para que a identidade, a linhagem e a estrutura permaneçam inspecionáveis ao longo do tempo.

---

## Como o Registrum Funciona

### Registro Estrutural

O registro é a única autoridade constitucional:

- Valida todas as transições de estado contra 11 invariantes estruturais
- Impõe restrições de identidade, linhagem e ordenação
- Garante determinismo e rastreabilidade
- Apresenta violações sem resolvê-las (falha segura)

Tudo é registrado através dele. Nada o ignora.

### Os 11 Invariantes

| Classe | Contagem | Propósito |
| ------- | ------- | --------- |
| Identidade | 3 | Único, imutável, endereçado por conteúdo |
| Linhagem | 4 | Parentesco válido, acíclico, rastreável |
| Ordenação | 4 | Monotônica, sem lacunas, determinística |

Esses invariantes são constitucionais. Alterá-los requer governança formal.

---

## Duas Validações Constitucionais Independentes

O Registrum mantém **dois mecanismos de invariância independentes**:

| Validação | Papel | Implementação |
| --------- | ------ | ---------------- |
| Registro | Autoridade primária | DSL compilado (RPEG v1) |
| Legado | Validação secundária | Predicados TypeScript |

A partir da Fase H, **o registro é o mecanismo constitucional padrão**.
O legado permanece como uma validação secundária independente.

### Por que Duas Validações?

- **O acordo é necessário** — Ambos devem concordar para que uma transição seja válida
- **O desacordo interrompe** — A divergência de paridade interrompe o sistema (falha segura)
- **A independência é intencional** — Nenhum pode substituir o outro

Este é um recurso de segurança e legibilidade, não uma dívida técnica.

O modo dual é indefinido. Não há planos para remover nenhuma das validações.

### Evidência de Paridade

274 testes comprovam a equivalência comportamental:
- 58 testes de paridade em todas as classes invariantes
- 12 testes de paridade de persistência (estabilidade temporal)
- Paridade de repetição: execução em tempo real ≡ execução repetida

---

## Histórico, Repetição e Auditabilidade

### Snapshots (Instantâneos)

O Registrum pode criar snapshots do seu estado completo:
- Esquema versionado (`RegistrarSnapshotV1`)
- Hashes endereçados por conteúdo
- Serialização determinística

### Repetição

Decisões históricas podem ser repetidas:
- Execução somente leitura contra um registrador novo
- Comprova o determinismo temporal
- As mesmas transições → os mesmos resultados

### Auditabilidade

Cada julgamento estrutural é:
- Reprodutível após o fato
- Independente do contexto de execução
- Verificável por qualquer parte com o snapshot

---

## Atestado Externo (Opcional)

O Registrum pode, opcionalmente, emitir atestados criptográficos para um livro-razão externo imutável (como o XRPL) para fins de verificação pública.

| Propriedade | Valor |
| ---------- | ------- |
| Padrão | Desativado |
| Autoridade | Não autorizado (apenas observador) |
| Efeito no comportamento | Nenhum |

Os atestados registram *o que* o Registrum decidiu.
O Registrum decide *o que* é válido.

**A autoridade flui para dentro. A observação flui para fora.**

Veja:
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — Justificativa
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — Especificação

---

## Governança

O Registrum é governado por um **modelo constitucional**.

| Princípio | Significado |
| ----------- | --------- |
| Garantias comportamentais > velocidade de implementação de recursos | A correção tem precedência |
| Apenas mudanças baseadas em evidências | Nenhuma mudança sem prova |
| Processo formal obrigatório | Propostas, artefatos, decisões |

### Status Atual

- **Fase H**: Concluída (registro padrão, atestado habilitado)
- **Governança**: Ativa e aplicada
- **Todas as mudanças**: Requerem um processo de governança formal

Todas as futuras mudanças são decisões de governança, não tarefas de engenharia.

Veja:
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — Por que a governança existe
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — O que é governado
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — Transição para a governança

---

## Status do Projeto

**O Registrum atingiu um estado final estável.**

| Fase | Status | Evidência |
| ------- | -------- | ---------- |
| A–C | Concluído | Registrador principal, estrutura de testes de paridade |
| E | Concluído | Persistência, repetição, estabilidade temporal |
| G | Concluído | Estrutura de governança |
| H | Concluído | Registro padrão, atestado habilitado |

**Cobertura de testes**: 279 testes aprovados em 14 conjuntos de testes

O desenvolvimento foi transferido para a gestão. Futuras mudanças requerem governança.

Veja: [`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## Começando

### Instalação

```bash
npm install @mcp-tool-shop/registrum
```

### Uso Básico

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

### Executando Exemplos

Os exemplos no diretório `examples/` são **demonstrações ilustrativas**, e não uma API estável.

Eles requerem [`tsx`](https://github.com/esbuild-kit/tsx) para serem executados:

```bash
# Run the refusal-as-success example
npm run example:refusal

# Or directly with npx
npx tsx examples/refusal-as-success.ts
```

**Observação:** Os exemplos utilizam `npx tsx` (ou `npx ts-node` com suporte a ESM). Estes não são dependências para produção, mas sim ferramentas de desenvolvimento/demonstração.

---

## Documentação

| Documento | Propósito |
| ---------- | --------- |
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | Definição de identidade |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | Declarações formais com evidências |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | Condições de falha crítica |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | Garantias temporais |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | Compreendendo a arquitetura de dupla testemunha |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | Política de dupla testemunha |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | Formato de snapshot (constitucional) |

---

## Princípios de Design

- Restrição em vez de poder
- Legibilidade em vez de desempenho
- Restrições em vez de heurísticas
- Inspeção em vez de intervenção
- Parada em vez de extensão infinita

O Registrum é bem-sucedido quando se torna algo comum, confiável e previsível.

---

## Resumo em uma frase

O Registrum é um registrador estrutural que preserva a interpretabilidade à medida que os sistemas evoluem, garantindo que a mudança permaneça legível mesmo diante da entropia.

---

Criado por <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>

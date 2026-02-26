<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/Registrum/readme.png" width="400" alt="Registrum">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-tool-shop/registrum"><img src="https://img.shields.io/npm/v/@mcp-tool-shop/registrum" alt="npm version"></a>
  <a href="https://github.com/mcp-tool-shop-org/Registrum/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/Registrum/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

Un registro determinista con doble verificación, gobernado y con un historial reproducible y una atestación externa opcional.

---

## ¿Qué es Registrum?

Registrum es un **registro estructural** para mantener la legibilidad en sistemas en evolución.

Registra, valida y ordena las transiciones de estado bajo restricciones explícitas, de modo que la estructura permanezca interpretable a medida que aumenta la entropía.

| Propiedad | Significado |
| ---------- | --------- |
| Estructural | Opera sobre la forma, no sobre el significado |
| Determinista | Mismas entradas → mismos resultados, siempre |
| Falla de forma segura | Una entrada inválida causa una falla total, no una recuperación parcial |
| Reproducible | Las decisiones históricas se pueden reejecutar con resultados idénticos |
| No es un agente | Nunca actúa, decide ni optimiza |

**Registrum garantiza que el cambio siga siendo legible.**

---

## Lo que Registrum no es

Registrum **no es explícitamente**:

- Un optimizador
- Un agente
- Un tomador de decisiones
- Un controlador
- Un recomendador
- Una inteligencia
- Adaptativo o de aprendizaje
- Autocurativo

Nunca responde a *lo que importa*.
Solo preserva las condiciones bajo las cuales esa pregunta sigue siendo respondible.

---

## Principio fundamental

> **Se permite la entropía. La ilegibilidad no.**

Registrum no reduce la entropía globalmente.
Restringe dónde puede existir la entropía para que la identidad, el linaje y la estructura permanezcan inspectables con el tiempo.

---

## Cómo funciona Registrum

### Registro estructural

El registro es la única autoridad constitucional:

- Valida todas las transiciones de estado contra 11 invariantes estructurales
- Aplica restricciones de identidad, linaje y orden
- Garantiza el determinismo y la trazabilidad
- Detecta violaciones sin resolverlas (falla de forma segura)

Todo se registra a través de él. Nada lo evita.

### Los 11 invariantes

| Clase | Conteo | Propósito |
| ------- | ------- | --------- |
| Identidad | 3 | Único, inmutable, con dirección de contenido |
| Linaje | 4 | Parentesco válido, sin ciclos, trazable |
| Orden | 4 | Monotónico, sin lagunas, determinista |

Estos invariantes son constitucionales. Cambiarlos requiere una gobernanza formal.

---

## Doble autoridad constitucional

Registrum mantiene **dos motores de invariantes independientes**:

| Testigo | Rol | Implementación |
| --------- | ------ | ---------------- |
| Registro | Autoridad principal | DSL compilado (RPEG v1<unused2034>) |
| Legado | Testigo secundario | Predicados de TypeScript |

A partir de la Fase H, **el registro es el motor constitucional predeterminado**.
El legado permanece como un testigo secundario independiente.

### ¿Por qué dos testigos?

- **Se requiere acuerdo** — Ambos deben aceptar para que una transición sea válida
- **El desacuerdo detiene** — La divergencia de paridad detiene el sistema (falla de forma segura)
- **La independencia es intencional** — Ninguno puede anular al otro

Esta es una característica de seguridad y legibilidad, no deuda técnica.

El modo dual es indefinido. No hay planes para eliminar a ninguno de los testigos.

### Evidencia de paridad

274 pruebas demuestran la equivalencia en el comportamiento:
- 58 pruebas de paridad en todas las clases invariantes.
- 12 pruebas de paridad de persistencia (estabilidad temporal).
- Paridad de reproducción: ejecución en vivo ≡ ejecución reproducida.

---

## Historial, Reproducción y Auditabilidad

### Instantáneas

Registrum puede crear instantáneas de su estado completo:
- Esquema versionado (`RegistrarSnapshotV1`).
- Hashes con direccionamiento de contenido.
- Serialización determinista.

### Reproducción

Las decisiones históricas pueden ser reproducidas:
- Ejecución de solo lectura contra un registrador nuevo.
- Demuestra el determinismo temporal.
- Las mismas transiciones → los mismos resultados.

### Auditabilidad

Cada juicio estructural es:
- Reproducible a posteriori.
- Independiente del contexto de ejecución.
- Verificable por cualquier parte que tenga la instantánea.

---

## Atestación Externa (Opcional)

Opcionalmente, Registrum puede emitir atestaciones criptográficas a un registro inmutable externo (como XRPL) para su verificación pública.

| Propiedad | Valor |
| ---------- | ------- |
| Por defecto | Deshabilitado |
| Autoridad | No autorizado (solo testigo) |
| Efecto en el comportamiento | Ninguno |

Las atestaciones registran *qué* decidió Registrum.
Registrum decide *qué* es válido.

**La autoridad fluye hacia adentro. El testimonio fluye hacia afuera.**

Ver:
- [`docs/WHY_XRPL.md`](docs/WHY_XRPL.md) — Justificación
- [`docs/ATTESTATION_SPEC.md`](docs/ATTESTATION_SPEC.md) — Especificación

---

## Gobernanza

Registrum se rige bajo un **modelo constitucional**.

| Principio | Significado |
| ----------- | --------- |
| Garantías de comportamiento > Velocidad de las funciones | La corrección tiene prioridad. |
| Solo cambios basados en evidencia. | No hay cambios sin prueba. |
| Se requiere un proceso formal. | Propuestas, artefactos, decisiones. |

### Estado actual

- **Fase H**: Completada (registro por defecto, atestación habilitada).
- **Gobernanza**: Activa y aplicada.
- **Todos los cambios**: Requieren un proceso de gobernanza formal.

Todos los cambios futuros son decisiones de gobernanza, no tareas de ingeniería.

Ver:
- [`docs/governance/PHILOSOPHY.md`](docs/governance/PHILOSOPHY.md) — Por qué existe la gobernanza.
- [`docs/governance/SCOPE.md`](docs/governance/SCOPE.md) — Qué está sujeto a gobernanza.
- [`docs/GOVERNANCE_HANDOFF.md`](docs/GOVERNANCE_HANDOFF.md) — Transición a la gobernanza.

---

## Estado del proyecto

**Registrum ha alcanzado un estado final estable.**

| Fase | Estado | Evidencia |
| ------- | -------- | ---------- |
| A–C | Completado | Registrador central, sistema de pruebas de paridad. |
| E | Completado | Persistencia, reproducción, estabilidad temporal. |
| G | Completado | Marco de gobernanza. |
| H | Completado | Registro por defecto, atestación habilitada. |

**Cobertura de pruebas**: 279 pruebas superadas en 14 conjuntos de pruebas.

El desarrollo ha pasado a la administración. Los cambios futuros requieren gobernanza.

Ver: [`docs/STEWARD_CLOSING_NOTE.md`](docs/STEWARD_CLOSING_NOTE.md)

---

## Cómo empezar

### Instalación

```bash
npm install @mcp-tool-shop/registrum
```

### Uso básico

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

### Ejecución de ejemplos

Los ejemplos del directorio `examples/` son **demostraciones ilustrativas**, no una API estable.

Requieren [`tsx`](https://github.com/esbuild-kit/tsx) para ejecutarse:

```bash
# Run the refusal-as-success example
npm run example:refusal

# Or directly with npx
npx tsx examples/refusal-as-success.ts
```

**Nota:** Los ejemplos se basan en `npx tsx` (o `npx ts-node` con soporte ESM). Estos no son dependencias de producción, sino herramientas de desarrollo/demostración.

---

## Documentación

| Documento | Propósito |
| ---------- | --------- |
| [`WHAT_REGISTRUM_IS.md`](docs/WHAT_REGISTRUM_IS.md) | Definición de identidad |
| [`PROVABLE_GUARANTEES.md`](docs/PROVABLE_GUARANTEES.md) | Afirmaciones formales con evidencia |
| [`FAILURE_BOUNDARIES.md`](docs/FAILURE_BOUNDARIES.md) | Condiciones de fallo crítico |
| [`HISTORY_AND_REPLAY.md`](docs/HISTORY_AND_REPLAY.md) | Garantías temporales |
| [`TUTORIAL_DUAL_WITNESS.md`](docs/TUTORIAL_DUAL_WITNESS.md) | Comprensión de la arquitectura de doble testigo |
| [`governance/DUAL_WITNESS_POLICY.md`](docs/governance/DUAL_WITNESS_POLICY.md) | Política de doble testigo |
| [`CANONICAL_SERIALIZATION.md`](docs/CANONICAL_SERIALIZATION.md) | Formato de instantánea (constitucional) |

---

## Principios de diseño

- Restricción sobre poder
- Legibilidad sobre rendimiento
- Restricciones sobre heurísticas
- Inspección sobre intervención
- Detención sobre extensión infinita

Registrum tiene éxito cuando se vuelve aburrido, confiable e inesperado.

---

## Resumen en una frase

Registrum es un registrador estructural que preserva la interpretabilidad a medida que los sistemas evolucionan, asegurando que el cambio siga siendo legible incluso en condiciones de entropía.

---

Creado por <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>

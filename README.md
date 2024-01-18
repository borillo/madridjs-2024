# Happy patterns en TypeScript

## ✅ Intro

- 💡 Refactoring con equipos: MOB programming.
- 🧠 Estudiando programación funcional.

**References:**

- 🎥 [Programación funcional: Próximamente en un lenguaje de programación cerca de usted](https://www.youtube.com/watch?v=y0GwxCDTJvA)
  
## ✅ Estructura del proyecto

![Hexagonal](./images/hexagonal.png)

- 💡 Estructura técnica vs estructura funcional:
  - Un primer nivel por cada dominio.
  - Misma abstracción en varios dominios.
- 🧠 Domain-Driven Design:
  - **Strategic Design**: Ubiquitous Language, Context Mapping, Event Storming, etc.
  - **Tactical Design**: OOP + Aggregates.

**References:**

- 🎥 [Functional architecture - The pits of success](https://www.youtube.com/watch?v=US8QG9I1XW0)
- 📖 [Domain modeling made functional by Scott Wlaschin](https://www.goodreads.com/book/show/39021550-domain-modeling-made-functional)

## ✅ Foco en los “value objects”

- 🧠 Tell, don't ask. Ley de Demeter.
- 💩 Código duplicado + Falta de niveles de abstracción.
- 💡 Previo al refactoring de diseño. Primero semántica y naming.
- 💡 Foco atractor de código.
- 💩 utils & helpers.
- 🧠 Bola extra. Encapsulación de colecciones:
  - 💩 Código duplicado.
  - 💩 Acoplamiento.

## ✅ Decoración

- 💩 Separación de responsabilidades: audit, logging, caching.
- 💡 Permiten componerse.
- 💡 Métodos factoría para generar las decoraciones.
- 💡 Configurable en test para evitar por ejemplo el caching.

## ✅ State

- 💩 TBD.
- 💡 TBD.
- 🧠 TBD.

## ✅ Manejo de la opcionalidad

- 💡 Computación que puede fallar.
- 💩 Programación defensiva (`Optional chaining` or `Nullish coalescing operator`).
- 💡 NullObject pattern.
- 🧠 Functional programming: `fp-ts`.
- 🧠 Bola extra. Manejo de excepciones:
  - 💩 Paso de mensajes.
  - 💩 Ruptura del flujo + exception handler global.
  - 💩 Falta de contexto.
  - 💩 No accionables. Excepciones ignoradas/silenciadas.
  - 💡 Lo convertimos en un `value`.
  - 🧠 Functional programming: `fp-ts`.

# ❔ Q&A

> Ricardo Borillo Domenech | <borillo@gmail.com> |  [@borillo](https://twitter.com/borillo)
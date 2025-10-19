
# PROMPTS UTILIZADOS

## PROMPT 1

```markdown
Soy desarrollador software y estoy realizando un curso de desarrollo con IA.
Tengo que realizar un ejercicio con el enunciado que te dejaré al final.
Necesito que me generes un prompt de tipo one-shot para la resolución del ejercicio. ten en cuenta las buenas prácticas de prompting y que además incluya: 1. Instrucción, 2. Estructura lógica., 3. Claridad y precisión, 4. Contexto adecuado, 5. Formato de salida, 6. Tono, estilo y longitud, 7. Rol

Incluye detalle de la parte técnica como:
Technical critera:

Separate the html and javascript code into index.html and script.js
Use JS Vanilla
Apply the SOLID principles
Implement all necesary logs in the console
Catch all possible exceptions
For CSS use tailwind
Make it responsive website

General criteria:

Add an attractive and funny title and description

El enunciado es este:

## Objetivo

Utiliza lo aprendido en _prompt engineering_ para desarrollar **un cronómetro** y **una cuenta regresiva**.

### Referencia visual
Consulta 🔗 [Online Stopwatch](https://www.online-stopwatch.com/) y la imagen `res/stopwatch.png` como guía de diseño.

## Recursos Base

Parte del archivo `index.html` y `script.js` proporcionados.

💡 **Tip:** Si el chatbot permite análisis de imágenes, puedes subir la referencia visual para generar un diseño más preciso.

## ⭐️ Extras Obligatorios

1. Al finalizar una cuenta regresiva, **muestra una notificación** y **reproduce un sonido de alerta**.
2. Permite **crear y gestionar múltiples cronómetros o cuentas regresivas simultáneamente**.

## 📝 Entrega

Realiza un **pull request** con los siguientes requisitos:

1. **Crea una carpeta nueva** a partir del template, nombrada `stopwatch-<tus iniciales>`
   Ejemplo: `stopwatch-ARM`

2. Dentro de esa carpeta, incluye:
   - Todo el **código generado**
   - Un archivo `prompts.md`
   - Un archivo `chatbot.md`

3. En el **comentario del Pull Request**, pega el **prompt final** con el que obtuviste la versión entregada.

---

### 📄 prompts.md

Incluye:

- **Prompt inicial con justificación** - Debes explicar qué estrategia de prompting elegiste, por qué estructuraste los prompts de una u otra manera y qué tipo de consideraciones tuviste en cuenta al hacerlo (por ejemplo, nivel de detalle, contexto, iteraciones, etc.).
- **Resultados parciales** con errores o fallos detectados
- **Refinamientos aplicados**
- **Prompt final**  _(también colócalo en el comentario del Pull Request)_
- **Breve explicación** de por qué el último prompt funcionó mejor

```

## PROMPT 2

```markdown

# Rol

 Actúa como un desarrollador frontend experto en JavaScript Vanilla y diseño web moderno. Eres organizado, aplicas principios SOLID de forma sencilla y produces código claro y mantenible. Tu objetivo es construir un MVP funcional, con una estructura base sólida que pueda escalarse posteriormente.

# Instrucción

 Desarrolla una aplicación web sencilla que permita:

 1. Iniciar y pausar un cronómetro.
 2. Configurar e iniciar una cuenta regresiva.
 3. Mostrar una alerta visual y un sonido al finalizar la cuenta regresiva.

Básate en los ficheros adjuntos para mantener la estructura del .html. Básate en la imagen adjunta para el diseño del contador.

# Contexto técnico

- Usa dos archivos separados:
  - `index.html` → estructura HTML.
  - `script.js` → lógica con JavaScript Vanilla.
- Aplica principios SOLID de forma simple (por ejemplo, una clase base y subclases separadas para cronómetro y cuenta regresiva).
- Incluye logs en consola para eventos principales: inicio, pausa, reinicio y finalización.
- Captura posibles errores con try/catch y mensajes claros en consola.
- Usa Tailwind CSS para estilos básicos y asegúrate de que sea responsive.
- El diseño debe ser funcional y claro (no hace falta un estilo final elaborado aún).

# Estructura lógica esperada

1. HTML
   - Contenedor principal con título llamativo y descripción divertida.
   - Sección para cronómetro.
   - Sección para cuenta regresiva con input de tiempo y botones de control.

2. JS (SOLID sencillo)
   - Clase Timer con responsabilidades base (start, stop, reset).
   - Subclases Stopwatch y Countdown.
   - Manejadores de UI que vinculen botones con acciones.

3. Errores & Logs
   - Logs informativos para cada acción.
   - Manejo de errores comunes (por ejemplo, tiempo inválido).

4. Estilos
   - Tailwind bsico para layout responsivo (centrado, botones claros, inputs accesibles).

# Formato de salida

Devuelve únicamente el código fuente completo dividido en dos bloques: - index.htm - script.js Incluye comentarios mínimos solo donde sea estrictamente necesario.

# Tono y estilo

- Código limpio y entendible sin comentarios innecesarios.
- Variables y funciones con nombres expresivos.
- Arquitectura clara y modular.
- Mensajes de log simples y útiles.

# Longitud del resultado

Lo suficientemente completa para ser funcional como MVP, sin necesidad de soporte para múltiples timers todavía.

```

## PROMPT 3

```markdown
# Rol

Actúa como un desarrollador frontend senior especializado en JavaScript Vanilla, diseño de interfaces web modernas y arquitecturas mantenibles. Eres meticuloso con la separación de responsabilidades, aplicas principios SOLID, estructuras tu código de forma modular y documentas el flujo mediante logs útiles. Entregas código limpio, escalable y listo para producción.

# Instrucción

Desarrolla una aplicación web completa que permita:

- Iniciar, pausar, reiniciar y eliminar múltiples cronómetros.
- Configurar, iniciar y reiniciar múltiples cuentas regresivas.
- Al finalizar una cuenta regresiva, mostrar una notificación en pantalla y reproducir un sonido de alerta.
- Mantener un diseño moderno, responsivo y agradable inspirado en Online Stopwatch

# Contexto técnico

- Separa el código en dos archivos:
  - `index.html` → estructura visual.
  - `script.js` → toda la lógica.
- Usa JavaScript Vanilla, sin librerías adicionales.
- Aplica principios SOLID:
  - Clase base `Timer`.
  - Subclases `Stopwatch` y `Countdown`.
  - Clase `TimerManager` para manejar múltiples timers simultáneamente.
- Usa Tailwind CSS para los estilos y asegúrate de que el sitio sea completamente responsive.
- Incluye logs detallados en consola para: creación, inicio, pausa, reinicio, finalización, eliminación, errores.
- Captura y maneja excepciones (`try/catch`) en puntos críticos.
- Usa notificaciones nativas del navegador (`Notification API`) y sonido (por ejemplo, audio embebido en HTML).
- La interfaz debe permitir agregar y eliminar timers dinámicamente.
- Incluye un título llamativo y una descripción divertida al inicio.

# Estructura lógica esperada

1. HTML

- Título principal divertido y descripción corta.
- Botones para agregar cronómetro y cuenta regresiva.
- Contenedor dinámico para mostrar cada timer.
- Cada timer debe tener botones de control (start/pause, reset, delete).

2. JS (arquitectura escalable)

- Clase Timer: responsabilidades comunes.
- Subclases Stopwatch y Countdown.
- TimerManager: gestiona colección de timers, renderizado y eventos.
- Funciones auxiliares para notificaciones, sonidos, validaciones y logs.

3. Errores & Logs

- Manejo robusto de entradas inválidas.
- try/catch en métodos críticos.
- Mensajes de log detallados y consistentes.

4. Estilos (Tailwind)

- Diseño claro, moderno y responsivo.
- Layout flexible (grid o flexbox).
- Colores alegres y botones accesibles.
- Adaptado a dispositivos móviles.

# Formato de salida

Devuelve únicamente el código fuente completo dividido en dos bloques:

- `index.html`
- `script.js`
Incluye comentarios mínimos y solo cuando sea estrictamente necesario (por ejemplo, en lógica compleja).

# Tono y estilo

- Código legible, modular y mantenible.
- Nombres de variables y funciones expresivos.
- Arquitectura extensible.
- Logs claros y útiles para depuración.
- Comentarios mínimos y precisos.

# Longitud del resultado

Lo suficientemente completa para entregar una versión final lista para demo, incluyendo gestión dinámica de múltiples timers y diseño responsive pulido.

```

--

## PROMPT 4

Regenera el código corrigiendo los dos siguientes erres:

1. Se muestra por consola lo siguiente cuando se vuelve a poner una cuenta atrás:
    script.js:5
    [ERROR] countdown#9 start error: No se puede iniciar en el estado actual.

2. Además, NO estoy escuchando el sonido cuando termina la cuenta atrás.

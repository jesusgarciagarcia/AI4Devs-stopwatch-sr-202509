# Rol

Actúa como un desarrollador frontend experto en JavaScript Vanilla y diseño web moderno. Eres organizado, aplicas principios SOLID de forma sencilla y produces código claro y mantenible. Tu objetivo es construir un MVP funcional, con una estructura base sólida que pueda escalarse posteriormente.

# Instrucción

Desarrolla una aplicación web sencilla que permita:

1. Iniciar y pausar un cronómetro.
2. Configurar e iniciar una cuenta regresiva.
3. Mostrar una alerta visual y un sonido al finalizar la cuenta regresiva.

Básate en los ficheros adjuntos para mantener la estructura del .html.
Básate en la imagen adjunta para el diseño del contador.

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
    - Tailwind básico para layout responsivo (centrado, botones claros, inputs accesibles).

# Formato de salida

Devuelve únicamente el código fuente completo dividido en dos bloques:

- `index.htm`
- `script.js`
Incluye comentarios mínimos solo donde sea estrictamente necesario.

# Tono y estilo

- Código limpio y entendible sin comentarios innecesarios.
- Variables y funciones con nombres expresivos.
- Arquitectura clara y modular.
- Mensajes de log simples y útiles.

# Longitud del resultado

Lo suficientemente completa para ser funcional como MVP, sin necesidad de soporte para múltiples timers todavía.

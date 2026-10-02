# Guía de Instalación · EduTicTac Outlook Simple

## Requisitos previos

* **Navegador web compatible:**
  * Google Chrome (v110 o superior)
  * Microsoft Edge (v110 o superior)
  * Brave, Chromium o cualquier navegador basado en Chromium.
* **Node.js (si compilas desde el código fuente):** Node.js v18+ y npm.

---

## Opción 1: Instalación desde el código fuente (Desarrollo / Centro educativo)

### 1. Clonar el repositorio y compilar

```bash
git clone https://github.com/Edutictac/edutictac-outlook-simple.git
cd edutictac-outlook-simple
npm install
npm run build
```

El proceso generará la carpeta compilada lista para usar en `dist/`.

---

### 2. Cargar la extensión en Google Chrome / Microsoft Edge

1. Abre tu navegador y accede a la sección de extensiones:
   * **En Google Chrome:** ve a `chrome://extensions/`
   * **En Microsoft Edge:** ve a `edge://extensions/`
2. Activa el **Modo de desarrollador** (en la esquina superior derecha o en la barra lateral).
3. Haz clic en el botón **Cargar extensión sin empaquetar** (*Load unpacked*).
4. Selecciona la carpeta **`dist/`** dentro del proyecto `edutictac-outlook-simple`.
5. La extensión quedará instalada y visible en la barra de extensiones de tu navegador.

---

### 3. Uso en el aula de formación

1. Abre [https://outlook.office.com](https://outlook.office.com) o [https://outlook.live.com](https://outlook.live.com) e inicia sesión normalmente con tu cuenta de correo educativo.
2. Haz clic en el icono de **EduTicTac Outlook Simple** en la barra superior del navegador.
3. Elige el **Nivel de simplificación** deseado (*Básico*, *Organización*, *Avanzado* o *Original*).
4. Opcionalmente activa el **Tema de la sesión** (ej. *Para, CC y CCO*) o el **Modo presentación** si estás proyectando en clase.
5. Los cambios se aplicarán instantáneamente sobre la pantalla de Outlook.
6. Si necesitas volver al Outlook completo en cualquier momento, pulsa **Restaurar Outlook original** en el menú o en la barra flotante inferior.

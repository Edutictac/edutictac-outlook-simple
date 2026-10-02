# Arquitectura Técnica · EduTicTac Outlook Simple

## 📐 Principios de Diseño

1. **Capa visual no invasiva (*Zero-API Layer*):** No sustituye a Outlook ni interactúa mediante APIs del buzón; aplica transformaciones CSS y anotaciones DOM sobre la interfaz activa.
2. **Resiliencia ante actualizaciones (*Fail-Safe*):** Si Microsoft altera algún selector DOM, la extensión no debe romper la aplicación; ignora selectores no coincidentes de forma silenciosa dejando la interfaz nativa intacta.
3. **Selectores con tolerancia semántica y multiidioma:** Priorización de atributos de accesibilidad estándar (`aria-label`, `role`, `title`), IDs de automatización y textos multiidioma (Valencià/Català, Castellano, English).
4. **Namespace CSS aislado:** Todas las clases inyectadas o modificadas emplean el prefijo `edutictac-os-*` para evitar colisiones con los estilos dinámicos de Fluent UI / Office.
5. **Observación DOM optimizada:** MutationObserver throttled (350ms) que ignora mutaciones provocadas por la propia extensión para prevenir bucles de renderizado o sobrecarga de CPU.

---

## 📂 Estructura de Directorios

```
edutictac-outlook-simple/
├── src/
│   ├── content/          # Content script inyectado en Outlook
│   │   └── index.ts      # Coordinador principal, observer y ciclo de vida
│   ├── selectors/        # Capa centralizada de selectores DOM
│   │   ├── outlook/
│   │   │   └── v1.ts     # Definiciones de selectores versión 1 (M365 2024-2026)
│   │   └── index.ts      # Registro y resolución tolerante a fallos
│   ├── modes/            # Reglas de simplificación (original, básico, organización, avanzado)
│   │   └── index.ts
│   ├── tutorials/        # Temas didácticos y pasos explicativos
│   │   └── index.ts
│   ├── ui/               # Componentes visuales y panel de control
│   │   ├── highlighter.ts# Sistema de resaltado, halos, badges y modo foco
│   │   ├── banner.ts     # Barra de estado flotante con botón de restauración
│   │   ├── popup.html    # Panel de control de la extensión
│   │   ├── popup.ts      # Lógica interactiva del popup
│   │   └── popup.css     # Estilos del panel de control
│   ├── storage/          # Almacenamiento local seguro con chrome.storage
│   │   └── index.ts
│   ├── styles/           # Hojas de estilo inyectadas en Outlook
│   │   ├── content.css   # Clases namespace edutictac-os-*
│   │   └── popup.css
│   ├── types/            # Tipos e interfaces TypeScript
│   │   └── index.ts
│   └── utils/            # Utilidades DOM, normalización de cadenas e i18n
│       └── dom.ts
├── public/
│   ├── manifest.json     # Manifest V3 de la extensión
│   └── icons/            # Iconos PNG de la extensión (16, 32, 48, 128)
├── tests/                # Tests unitarios automatizados (Vitest)
├── build.mjs             # Script de empaquetado rápido con esbuild
├── package.json
└── tsconfig.json
```

---

## 🔍 Estrategia de Selectores Versionados

Los selectores se definen en `src/selectors/outlook/v1.ts`. Cada elemento dispone de un array ordenado de estrategias alternativas:

```typescript
export interface SelectorStrategy {
  description: string;
  query: (root: Document | HTMLElement) => HTMLElement | null;
}
```

Si Microsoft actualiza la estructura de Outlook en el futuro, es posible crear `v2.ts` y añadirla a la cadena de resolución sin modificar la lógica didáctica ni los controladores de la extensión.

---

## ⚡ Rendimiento y Ciclo de Vida

* El script se carga únicamente en dominios `outlook.live.com`, `outlook.office.com` y `outlook.office365.com`.
* El `MutationObserver` escucha inserciones en el árbol DOM para adaptarse a la carga asíncrona de Outlook (por ejemplo, al abrir el panel de redacción o al cargar la lista de mensajes tras el login).
* Todas las acciones de limpieza eliminan limpiamente clases, badges y tooltips sin dejar rastro en el DOM al cambiar al modo *Original*.

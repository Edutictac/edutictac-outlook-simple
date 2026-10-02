import { SimplificationMode } from '../types';

const SECONDARY_CONTROLS: Record<SimplificationMode, string[]> = {
  original: [],
  basic: [
    'calendar', 'calendario', 'calendari', 'people', 'personas', 'contactos', 'contactes',
    'to do', 'tasks', 'tareas', 'tasques', 'my day', 'mi día', 'el meu dia',
    'settings', 'configuración', 'configuració', 'help', 'ayuda', 'ajuda',
    'copilot', 'meet now', 'reunirse ahora', 'reunió ara', 'feed', 'notes', 'notas',
    'archive', 'archivar', 'arxivar', 'delete', 'eliminar', 'suprimir', 'junk', 'correo no deseado',
    'mark as read', 'mark as unread', 'marcar como leído', 'marcar como no leído',
    'report', 'informar', 'sweep', 'limpiar', 'move to', 'mover a', 'moure a',
    'categorize', 'categorizar', 'categoritzar', 'flag', 'marcar con marca', 'seguimiento',
    'snooze', 'posponer', 'ajornar', 'print', 'imprimir', 'schedule', 'programar envío',
    'rules', 'reglas', 'regles', 'apps', 'application launcher', 'iniciador de aplicaciones',
    'feedback', 'comentarios', 'comentaris', 'whats new', 'novedades', 'novetats',
    'zoom', 'filter', 'filtrar', 'filtro', 'view', 'vista', 'density', 'densidad', 'densitat',
    'undo', 'deshacer', 'desfer', 'redo', 'rehacer', 'refer', 'reportar'
  ],
  organization: [
    'copilot', 'meet now', 'reunirse ahora', 'reunió ara', 'feed', 'notes', 'notas',
    'settings', 'configuración', 'configuració', 'help', 'ayuda', 'ajuda',
    'apps', 'application launcher', 'iniciador de aplicaciones', 'feedback', 'comentarios',
    'whats new', 'novedades', 'novetats', 'zoom', 'density', 'densidad', 'densitat'
  ],
  advanced: []
};

const ESSENTIAL_LABELS = [
  'new mail', 'nuevo correo', 'missatge nou', 'compose', 'redactar', 'crear mensaje',
  'search', 'buscar', 'cercar', 'inbox', 'bandeja de entrada', "safata d'entrada",
  'sent', 'enviados', 'elements enviats', 'drafts', 'borradores', 'esborranys',
  'deleted items', 'elementos eliminados', 'elements suprimits', 'trash', 'papelera', 'paperera',
  'reply', 'responder', 'respondre', 'reply all', 'responder a todos', 'respondre a tots',
  'forward', 'reenviar', 'attach', 'adjuntar', 'enviar', 'send', 'cc', 'cco', 'bcc', 'para'
];

const ORGANIZATION_LABELS = [
  'archive', 'archivar', 'arxivar', 'move to', 'mover a', 'moure a', 'mark as read',
  'mark as unread', 'marcar como leído', 'marcar como no leído', 'marcar com a llegit',
  'flag', 'follow up', 'seguimiento', 'categorize', 'categorizar', 'categoritzar',
  'filter', 'filtrar', 'create folder', 'new folder', 'nueva carpeta', 'nova carpeta',
  'calendar', 'calendario', 'calendari', 'contacts', 'contactos', 'contactes'
];

const CONTROL_SELECTOR = [
  'button[aria-label]', 'button[title]', 'button[data-automation-id]',
  '[role="button"][aria-label]', '[role="button"][title]',
  'a[aria-label]', 'a[title]', '[role="tab"][aria-label]'
].join(',');

function normalizedControlText(element: HTMLElement): string {
  return [
    element.getAttribute('aria-label'),
    element.getAttribute('title'),
    element.getAttribute('data-automation-id'),
    element.innerText,
    element.textContent
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function isEssentialControl(label: string): boolean {
  // Short labels must match as whole words: substring matching "cc" would
  // accidentally classify labels such as "Account" as essential.
  const shortTokens = new Set(['cc', 'cco', 'bcc']);
  return ESSENTIAL_LABELS.some(term => {
    if (shortTokens.has(term)) {
      return new RegExp(`(?:^|[^a-z])${term}(?:$|[^a-z])`, 'i').test(label);
    }
    return label.includes(term);
  });
}

function isAllowedToolbarControl(mode: SimplificationMode, label: string): boolean {
  if (isEssentialControl(label)) return true;
  return mode === 'organization' && ORGANIZATION_LABELS.some(term => label.includes(term));
}

/**
 * Hides only individually identified controls, never broad Outlook containers.
 * This gives Basic mode a visible effect while leaving unknown controls untouched.
 */
export function findSecondaryControls(
  mode: SimplificationMode,
  root: Document | HTMLElement = document
): HTMLElement[] {
  const terms = SECONDARY_CONTROLS[mode];
  if (!terms.length) return [];

  const matches = new Set<HTMLElement>();
  for (const candidate of root.querySelectorAll<HTMLElement>(CONTROL_SELECTOR)) {
    if (candidate.closest('.edutictac-os-toolbar, .edutictac-os-mini-activator, .edutictac-os-tooltip-card')) continue;

    const label = normalizedControlText(candidate);
    if (!label || isEssentialControl(label)) continue;
    if (terms.some(term => label.includes(term))) matches.add(candidate);
  }
  return [...matches];
}

/**
 * In Basic mode, keep only essential labelled actions inside Outlook's
 * semantic command bars. In Organization mode, also keep organization tools.
 * Unknown controls outside a recognized toolbar are never affected.
 */
export function findNonEssentialToolbarControls(
  mode: SimplificationMode,
  root: Document | HTMLElement = document
): HTMLElement[] {
  if (mode !== 'basic' && mode !== 'organization') return [];

  const hidden = new Set<HTMLElement>();
  for (const toolbar of root.querySelectorAll<HTMLElement>('[role="toolbar"], [role="menubar"]')) {
    if (toolbar.closest('.edutictac-os-toolbar, .edutictac-os-mini-activator')) continue;

    const controls = [...toolbar.querySelectorAll<HTMLElement>(CONTROL_SELECTOR)];
    const labelledControls = controls.filter(control => normalizedControlText(control));
    // Only act on real command bars with several labelled actions. This avoids
    // treating small recipient controls or unrelated one-button groups as bars.
    if (labelledControls.length < 3) continue;

    for (const control of labelledControls) {
      const label = normalizedControlText(control);
      if (!isAllowedToolbarControl(mode, label)) hidden.add(control);
    }
  }
  return [...hidden];
}

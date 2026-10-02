import { OutlookElementKey, SimplificationMode } from '../types';
import { findOutlookElement } from '../selectors';
import { findNonEssentialToolbarControls, findSecondaryControls } from './visibility';

export interface ModeRules {
  mode: SimplificationMode;
  name: {
    es: string;
    ca: string;
    en: string;
  };
  visibleKeys: OutlookElementKey[];
  hiddenKeys: OutlookElementKey[];
}

export const MODE_RULES: Record<SimplificationMode, ModeRules> = {
  original: {
    mode: 'original',
    name: {
      es: 'Outlook original',
      ca: 'Outlook original',
      en: 'Original Outlook'
    },
    visibleKeys: [],
    hiddenKeys: []
  },

  basic: {
    mode: 'basic',
    name: {
      es: 'Modo Básico',
      ca: 'Mode Bàsic',
      en: 'Basic Mode'
    },
    visibleKeys: [
      'newMail',
      'inbox',
      'sent',
      'drafts',
      'trash',
      'search',
      'messageList',
      'readingPane',
      'reply',
      'replyAll',
      'forward',
      'attach',
      'recipientTo',
      'recipientCc',
      'recipientBcc',
      'send'
    ],
    hiddenKeys: [
      'copilot',
      'meetNow',
      'adsOrPromos',
      'myDay',
      'ribbonSecondary'
    ]
  },

  organization: {
    mode: 'organization',
    name: {
      es: 'Modo Organización',
      ca: 'Mode Organització',
      en: 'Organization Mode'
    },
    visibleKeys: [
      'newMail',
      'inbox',
      'sent',
      'drafts',
      'trash',
      'archiveFolder',
      'createFolder',
      'moveTo',
      'markRead',
      'flag',
      'filter',
      'categories',
      'calendar',
      'contacts',
      'search',
      'messageList',
      'readingPane',
      'reply',
      'replyAll',
      'forward',
      'attach',
      'recipientTo',
      'recipientCc',
      'recipientBcc',
      'send'
    ],
    hiddenKeys: [
      'copilot',
      'meetNow',
      'adsOrPromos'
    ]
  },

  advanced: {
    mode: 'advanced',
    name: {
      es: 'Modo Avanzado',
      ca: 'Mode Avançat',
      en: 'Advanced Mode'
    },
    visibleKeys: [],
    hiddenKeys: [
      'adsOrPromos'
    ]
  }
};

export class ModeEngine {
  private currentMode: SimplificationMode = 'original';
  private modifiedElements: Set<HTMLElement> = new Set();

  public applyMode(mode: SimplificationMode): void {
    this.restoreOriginal();
    this.currentMode = mode;

    if (mode === 'original') {
      document.body.classList.remove('edutictac-os-active');
      document.body.classList.remove('edutictac-os-mode-basic', 'edutictac-os-mode-organization', 'edutictac-os-mode-advanced');
      return;
    }

    document.body.classList.add('edutictac-os-active');
    document.body.classList.remove('edutictac-os-mode-basic', 'edutictac-os-mode-organization', 'edutictac-os-mode-advanced');
    document.body.classList.add(`edutictac-os-mode-${mode}`);

    const rules = MODE_RULES[mode];
    if (!rules) return;

    // Apply safe hiding to designated noisy elements
    for (const key of rules.hiddenKeys) {
      const el = findOutlookElement(key);
      if (el) {
        // Safe check: do not hide if it contains critical elements like new mail or search
        if (!el.querySelector('button[aria-label*="Nuevo correo" i], button[aria-label*="Missatge nou" i], input#topSearchInput')) {
          el.classList.add('edutictac-os-hidden');
          this.modifiedElements.add(el);
        }
      }
    }

    // Broader but conservative simplification: hide individually labelled
    // secondary commands, never whole Outlook regions or unknown controls.
    for (const element of findSecondaryControls(mode)) {
      element.classList.add('edutictac-os-hidden');
      this.modifiedElements.add(element);
    }

    for (const element of findNonEssentialToolbarControls(mode)) {
      element.classList.add('edutictac-os-hidden');
      this.modifiedElements.add(element);
    }
  }

  public restoreOriginal(): void {
    for (const el of this.modifiedElements) {
      if (el && el.classList) {
        el.classList.remove('edutictac-os-hidden', 'edutictac-os-soft-hidden', 'edutictac-os-highlight', 'edutictac-os-highlight-presentation', 'edutictac-os-focus-target');
      }
    }
    this.modifiedElements.clear();

    document.body.classList.remove(
      'edutictac-os-active',
      'edutictac-os-mode-basic',
      'edutictac-os-mode-organization',
      'edutictac-os-mode-advanced',
      'edutictac-os-presentation'
    );
  }

  public getCurrentMode(): SimplificationMode {
    return this.currentMode;
  }
}

export const modeEngine = new ModeEngine();

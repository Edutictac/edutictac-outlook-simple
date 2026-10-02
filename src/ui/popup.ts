import { ExtensionConfig, SimplificationMode, SupportedLanguage, TutorialTopicId } from '../types';
import { loadConfig, saveConfig } from '../storage';

const UI_TRANSLATIONS = {
  es: {
    title: 'EduTicTac',
    subtitle: 'Outlook Simple · Formación',
    lblMode: 'Nivel de simplificación',
    modeBasicTitle: '🟢 Básico',
    modeBasicDesc: 'Solo lectura, nuevo correo y envío',
    modeOrgTitle: '📁 Organización',
    modeOrgDesc: 'Carpetas, filtros, categorías y archivo',
    modeAdvTitle: '⚡ Avanzado',
    modeAdvDesc: 'Todo visible con ayudas didácticas',
    modeOrigTitle: '⚪ Original',
    modeOrigDesc: 'Sin modificaciones (Outlook 100% nativo)',
    lblAids: 'Ayudas pedagógicas',
    chkHighlight: 'Destacar botones importantes',
    chkTooltips: 'Mostrar explicaciones y ayudas',
    chkPresentation: '📽️ Modo presentación (proyector)',
    lblTopic: 'Tema de la sesión',
    btnApply: 'Aplicar cambios',
    btnRestore: '↺ Restaurar Outlook original',
    debugBtn: '⚙️ Diagnóstico de selectores'
  },
  ca: {
    title: 'EduTicTac',
    subtitle: 'Outlook Simple · Formació',
    lblMode: 'Nivell de simplificació',
    modeBasicTitle: '🟢 Bàsic',
    modeBasicDesc: 'Només lectura, missatge nou i enviament',
    modeOrgTitle: '📁 Organització',
    modeOrgDesc: 'Carpetes, filtres, categories i arxiu',
    modeAdvTitle: '⚡ Avançat',
    modeAdvDesc: 'Tot visible amb ajudes didàctiques',
    modeOrigTitle: '⚪ Original',
    modeOrigDesc: 'Sense modificacions (Outlook 100% natiu)',
    lblAids: 'Ajudes pedagògiques',
    chkHighlight: 'Destacar botons importants',
    chkTooltips: 'Mostrar explicacions i ajudes',
    chkPresentation: '📽️ Mode presentació (projector)',
    lblTopic: 'Tema de la sessió',
    btnApply: 'Aplicar canvis',
    btnRestore: '↺ Restaurar Outlook original',
    debugBtn: '⚙️ Diagnòstic de selectors'
  },
  en: {
    title: 'EduTicTac',
    subtitle: 'Outlook Simple · Training',
    lblMode: 'Simplification level',
    modeBasicTitle: '🟢 Basic',
    modeBasicDesc: 'Reading, new mail, and sending only',
    modeOrgTitle: '📁 Organization',
    modeOrgDesc: 'Folders, filters, categories, and archive',
    modeAdvTitle: '⚡ Advanced',
    modeAdvDesc: 'Full UI with didactic annotations',
    modeOrigTitle: '⚪ Original',
    modeOrigDesc: 'Unmodified (100% native Outlook)',
    lblAids: 'Didactic aids',
    chkHighlight: 'Highlight important buttons',
    chkTooltips: 'Show explanatory cards',
    chkPresentation: '📽️ Presentation mode (projector)',
    lblTopic: 'Session topic',
    btnApply: 'Apply changes',
    btnRestore: '↺ Restore original Outlook',
    debugBtn: '⚙️ Selector diagnostics'
  }
};

class PopupController {
  private config: ExtensionConfig = {} as ExtensionConfig;

  public async init(): Promise<void> {
    this.config = await loadConfig();
    this.populateForm();
    this.bindEvents();
    this.updateLanguageUI(this.config.language === 'auto' ? 'es' : this.config.language);
  }

  private populateForm(): void {
    // Mode radio
    const radio = document.querySelector<HTMLInputElement>(`input[name="mode"][value="${this.config.mode}"]`);
    if (radio) {
      radio.checked = true;
    }

    // Checkboxes
    const chkHighlight = document.getElementById('chkHighlight') as HTMLInputElement;
    if (chkHighlight) chkHighlight.checked = this.config.highlightControls;

    const chkTooltips = document.getElementById('chkTooltips') as HTMLInputElement;
    if (chkTooltips) chkTooltips.checked = this.config.showTooltips;

    const chkPresentation = document.getElementById('chkPresentation') as HTMLInputElement;
    if (chkPresentation) chkPresentation.checked = this.config.presentationMode;

    // Topic select
    const selectTopic = document.getElementById('selectTopic') as HTMLSelectElement;
    if (selectTopic) selectTopic.value = this.config.activeTopic || '';

    // Language select
    const langSelect = document.getElementById('langSelect') as HTMLSelectElement;
    if (langSelect) langSelect.value = this.config.language || 'auto';
  }

  private bindEvents(): void {
    const btnApply = document.getElementById('btnApply');
    if (btnApply) {
      btnApply.onclick = () => this.handleSave();
    }

    const btnRestore = document.getElementById('btnRestore');
    if (btnRestore) {
      btnRestore.onclick = () => this.handleRestore();
    }

    const langSelect = document.getElementById('langSelect') as HTMLSelectElement;
    if (langSelect) {
      langSelect.onchange = () => {
        const selected = langSelect.value as 'auto' | SupportedLanguage;
        this.config.language = selected;
        this.updateLanguageUI(selected === 'auto' ? 'es' : selected);
        this.handleSave();
      };
    }

    // Realtime apply on mode card click
    const modeCards = document.querySelectorAll<HTMLInputElement>('input[name="mode"]');
    modeCards.forEach(input => {
      input.onchange = () => this.handleSave();
    });

    // Realtime apply on checkboxes
    const toggles = ['chkHighlight', 'chkTooltips', 'chkPresentation', 'selectTopic'];
    toggles.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.onchange = () => this.handleSave();
      }
    });

    // Debug toggle
    const btnToggleDebug = document.getElementById('btnToggleDebug');
    const debugContent = document.getElementById('debugContent');
    if (btnToggleDebug && debugContent) {
      btnToggleDebug.onclick = async () => {
        const isHidden = debugContent.style.display === 'none';
        debugContent.style.display = isHidden ? 'block' : 'none';
        if (isHidden) {
          await this.loadDiagnostics();
        }
      };
    }
  }

  private async handleSave(): Promise<void> {
    const selectedMode = (document.querySelector('input[name="mode"]:checked') as HTMLInputElement)?.value as SimplificationMode || 'basic';
    const chkHighlight = (document.getElementById('chkHighlight') as HTMLInputElement)?.checked ?? true;
    const chkTooltips = (document.getElementById('chkTooltips') as HTMLInputElement)?.checked ?? true;
    const chkPresentation = (document.getElementById('chkPresentation') as HTMLInputElement)?.checked ?? false;
    const selectTopic = (document.getElementById('selectTopic') as HTMLSelectElement)?.value as TutorialTopicId || null;
    const langSelect = (document.getElementById('langSelect') as HTMLSelectElement)?.value as 'auto' | SupportedLanguage || 'auto';

    await saveConfig({
      enabled: true,
      mode: selectedMode,
      highlightControls: chkHighlight,
      showTooltips: chkTooltips,
      presentationMode: chkPresentation,
      activeTopic: selectTopic || null,
      language: langSelect
    });
  }

  private async handleRestore(): Promise<void> {
    const radioOrig = document.querySelector<HTMLInputElement>('input[name="mode"][value="original"]');
    if (radioOrig) radioOrig.checked = true;

    const selectTopic = document.getElementById('selectTopic') as HTMLSelectElement;
    if (selectTopic) selectTopic.value = '';

    await saveConfig({
      mode: 'original',
      activeTopic: null
    });
  }

  private updateLanguageUI(lang: SupportedLanguage): void {
    const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.es;

    const lblMode = document.getElementById('lblMode');
    if (lblMode) lblMode.textContent = t.lblMode;

    const lblAids = document.getElementById('lblAids');
    if (lblAids) lblAids.textContent = t.lblAids;

    const lblTopic = document.getElementById('lblTopic');
    if (lblTopic) lblTopic.textContent = t.lblTopic;

    const btnApply = document.getElementById('btnApply');
    if (btnApply) btnApply.textContent = t.btnApply;

    const btnRestore = document.getElementById('btnRestore');
    if (btnRestore) btnRestore.textContent = t.btnRestore;

    const btnToggleDebug = document.getElementById('btnToggleDebug');
    if (btnToggleDebug) btnToggleDebug.textContent = t.debugBtn;
  }

  private async loadDiagnostics(): Promise<void> {
    const debugOutput = document.getElementById('debugOutput');
    if (!debugOutput) return;

    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (!activeTab || !activeTab.id) {
          debugOutput.textContent = 'No se encontró pestaña activa de Outlook.';
          return;
        }

        chrome.tabs.sendMessage(activeTab.id, { action: 'GET_DEBUG_INFO' }, (response) => {
          if (chrome.runtime?.lastError || !response) {
            debugOutput.textContent = 'Outlook no detectado en esta pestaña o extensión no recargada.\nAbre https://outlook.office.com y recarga.';
          } else {
            debugOutput.textContent = JSON.stringify(response, null, 2);
          }
        });
      });
    } else {
      debugOutput.textContent = 'Entorno de desarrollo local (Mock).';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const popup = new PopupController();
  popup.init();
});

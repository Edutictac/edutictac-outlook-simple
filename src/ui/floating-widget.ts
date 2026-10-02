import { ExtensionConfig, SimplificationMode, SupportedLanguage, TutorialTopicId } from '../types';
import { MODE_RULES } from '../modes';
import { DIDACTIC_TOPICS } from '../tutorials';
import { saveConfig } from '../storage';

export class FloatingTeacherToolbar {
  private container: HTMLElement | null = null;
  private isExpanded = false;
  private config: ExtensionConfig | null = null;
  private lang: SupportedLanguage = 'es';

  public render(config: ExtensionConfig, lang: SupportedLanguage): void {
    this.config = config;
    this.lang = lang;

    this.remove();

    if (!config.enabled || config.mode === 'original') {
      // In original mode, show only a tiny non-intrusive floating trigger icon to reactivate
      this.renderMiniActivator();
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = `edutictac-os-toolbar ${this.isExpanded ? 'edutictac-os-toolbar-expanded' : 'edutictac-os-toolbar-collapsed'}`;
    wrapper.id = 'edutictac-teacher-toolbar';

    if (!this.isExpanded) {
      this.renderCollapsedContent(wrapper);
    } else {
      this.renderExpandedContent(wrapper);
    }

    document.body.appendChild(wrapper);
    this.container = wrapper;
  }

  private renderMiniActivator(): void {
    const trigger = document.createElement('button');
    trigger.className = 'edutictac-os-mini-activator';
    trigger.title = 'Activar EduTicTac Outlook Simple';
    trigger.innerHTML = '✉️ EduTicTac';
    trigger.onclick = () => {
      saveConfig({ mode: 'basic', enabled: true });
    };
    document.body.appendChild(trigger);
    this.container = trigger;
  }

  private renderCollapsedContent(wrapper: HTMLElement): void {
    if (!this.config) return;

    const modeName = MODE_RULES[this.config.mode]?.name[this.lang] || this.config.mode;

    const pill = document.createElement('div');
    pill.className = 'edutictac-os-toolbar-pill';

    const dot = document.createElement('span');
    dot.className = 'edutictac-os-status-dot';

    const label = document.createElement('span');
    label.className = 'edutictac-os-pill-label';
    label.innerHTML = `EduTicTac · <strong>${modeName}</strong>`;

    // If active topic exists, show step counter
    if (this.config.activeTopic && DIDACTIC_TOPICS[this.config.activeTopic]) {
      const topic = DIDACTIC_TOPICS[this.config.activeTopic];
      const stepIdx = Math.min(Math.max(0, this.config.activeStepIndex || 0), topic.steps.length - 1);
      const stepCount = document.createElement('span');
      stepCount.className = 'edutictac-os-pill-step';
      stepCount.textContent = `[${stepIdx + 1}/${topic.steps.length}]`;
      label.appendChild(stepCount);
    }

    const btnExpand = document.createElement('button');
    btnExpand.className = 'edutictac-os-pill-btn';
    btnExpand.innerHTML = '⚙️ Panel ▾';
    btnExpand.onclick = (e) => {
      e.stopPropagation();
      this.isExpanded = true;
      if (this.config) this.render(this.config, this.lang);
    };

    const btnRestore = document.createElement('button');
    btnRestore.className = 'edutictac-os-btn-restore';
    btnRestore.textContent = this.lang === 'ca' ? 'Restaurar' : this.lang === 'en' ? 'Restore' : 'Restaurar';
    btnRestore.onclick = (e) => {
      e.stopPropagation();
      saveConfig({ mode: 'original', activeTopic: null });
    };

    pill.appendChild(dot);
    pill.appendChild(label);
    pill.appendChild(btnExpand);
    pill.appendChild(btnRestore);

    pill.onclick = () => {
      this.isExpanded = true;
      if (this.config) this.render(this.config, this.lang);
    };

    wrapper.appendChild(pill);
  }

  private renderExpandedContent(wrapper: HTMLElement): void {
    if (!this.config) return;

    const panel = document.createElement('div');
    panel.className = 'edutictac-os-panel-card';

    // Header
    const header = document.createElement('div');
    header.className = 'edutictac-os-panel-header';
    header.innerHTML = `
      <div class="edutictac-os-panel-title">
        <span>✉️ EduTicTac · Panel Docente</span>
      </div>
    `;

    const btnClose = document.createElement('button');
    btnClose.className = 'edutictac-os-panel-close';
    btnClose.innerHTML = '✕';
    btnClose.onclick = () => {
      this.isExpanded = false;
      if (this.config) this.render(this.config, this.lang);
    };
    header.appendChild(btnClose);

    // Modes row
    const modesRow = document.createElement('div');
    modesRow.className = 'edutictac-os-panel-row';
    modesRow.innerHTML = `<span class="edutictac-os-panel-label">Modo:</span>`;

    const modesButtonGroup = document.createElement('div');
    modesButtonGroup.className = 'edutictac-os-btn-group';

    const modes: SimplificationMode[] = ['basic', 'organization', 'advanced', 'original'];
    const modeLabels: Record<SimplificationMode, Record<SupportedLanguage, string>> = {
      basic: { es: '🟢 Básico', ca: '🟢 Bàsic', en: '🟢 Basic' },
      organization: { es: '📁 Organización', ca: '📁 Organització', en: '📁 Org' },
      advanced: { es: '⚡ Avanzado', ca: '⚡ Avançat', en: '⚡ Advanced' },
      original: { es: '⚪ Original', ca: '⚪ Original', en: '⚪ Original' }
    };

    for (const m of modes) {
      const btn = document.createElement('button');
      btn.className = `edutictac-os-mode-btn ${this.config.mode === m ? 'active' : ''}`;
      btn.textContent = modeLabels[m][this.lang] || modeLabels[m].es;
      btn.onclick = () => {
        saveConfig({ mode: m });
      };
      modesButtonGroup.appendChild(btn);
    }
    modesRow.appendChild(modesButtonGroup);

    // Presentation Mode & Aids row
    const aidsRow = document.createElement('div');
    aidsRow.className = 'edutictac-os-panel-row';

    const btnPresentation = document.createElement('button');
    btnPresentation.className = `edutictac-os-tool-btn ${this.config.presentationMode ? 'active-presentation' : ''}`;
    btnPresentation.innerHTML = this.config.presentationMode
      ? '📽️ <strong>Proyector ACTIVO (Alt+P)</strong>'
      : '📽️ Modo Proyector (Alt+P)';
    btnPresentation.onclick = () => {
      saveConfig({ presentationMode: !this.config?.presentationMode });
    };

    aidsRow.appendChild(btnPresentation);

    // Topic selector & Step Navigator
    const topicRow = document.createElement('div');
    topicRow.className = 'edutictac-os-panel-section';

    const topicLabel = document.createElement('div');
    topicLabel.className = 'edutictac-os-panel-label';
    topicLabel.textContent = this.lang === 'ca' ? 'Tema pedagògic de la sessió:' : this.lang === 'en' ? 'Session topic:' : 'Tema pedagógico de la sesión:';

    const topicSelect = document.createElement('select');
    topicSelect.className = 'edutictac-os-panel-select';

    const noneOpt = document.createElement('option');
    noneOpt.value = '';
    noneOpt.textContent = '(Sin tema / Libre)';
    topicSelect.appendChild(noneOpt);

    for (const [id, topic] of Object.entries(DIDACTIC_TOPICS)) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = topic.title[this.lang] || topic.title.es;
      if (this.config.activeTopic === id) {
        opt.selected = true;
      }
      topicSelect.appendChild(opt);
    }

    topicSelect.onchange = () => {
      const val = topicSelect.value as TutorialTopicId || null;
      saveConfig({ activeTopic: val, activeStepIndex: 0 });
    };

    topicRow.appendChild(topicLabel);
    topicRow.appendChild(topicSelect);

    // Step navigation if topic is active
    if (this.config.activeTopic && DIDACTIC_TOPICS[this.config.activeTopic]) {
      const currentTopic = DIDACTIC_TOPICS[this.config.activeTopic];
      const stepIdx = Math.min(Math.max(0, this.config.activeStepIndex || 0), currentTopic.steps.length - 1);
      const currentStep = currentTopic.steps[stepIdx];

      const stepNav = document.createElement('div');
      stepNav.className = 'edutictac-os-step-nav';

      const btnPrev = document.createElement('button');
      btnPrev.className = 'edutictac-os-step-btn';
      btnPrev.innerHTML = '◀ Anterior';
      btnPrev.disabled = stepIdx <= 0;
      btnPrev.onclick = () => {
        saveConfig({ activeStepIndex: Math.max(0, stepIdx - 1) });
      };

      const stepInfo = document.createElement('div');
      stepInfo.className = 'edutictac-os-step-info';
      stepInfo.innerHTML = `<strong>Paso ${stepIdx + 1}/${currentTopic.steps.length}:</strong> ${currentStep.title[this.lang] || currentStep.title.es}`;

      const btnNext = document.createElement('button');
      btnNext.className = 'edutictac-os-step-btn';
      btnNext.innerHTML = 'Siguiente ▶';
      btnNext.disabled = stepIdx >= currentTopic.steps.length - 1;
      btnNext.onclick = () => {
        saveConfig({ activeStepIndex: Math.min(currentTopic.steps.length - 1, stepIdx + 1) });
      };

      stepNav.appendChild(btnPrev);
      stepNav.appendChild(stepInfo);
      stepNav.appendChild(btnNext);

      topicRow.appendChild(stepNav);
    }

    // Footer actions
    const footer = document.createElement('div');
    footer.className = 'edutictac-os-panel-footer';

    const shortcutHint = document.createElement('span');
    shortcutHint.className = 'edutictac-os-shortcut-hint';
    shortcutHint.textContent = 'Atajos: Alt+P (Proyector) · Alt+O (Restaurar) · Alt+←/→ (Pasos)';

    const btnRestore = document.createElement('button');
    btnRestore.className = 'edutictac-os-btn-restore-full';
    btnRestore.innerHTML = '↺ Restaurar Outlook original';
    btnRestore.onclick = () => {
      saveConfig({ mode: 'original', activeTopic: null });
    };

    footer.appendChild(shortcutHint);
    footer.appendChild(btnRestore);

    panel.appendChild(header);
    panel.appendChild(modesRow);
    panel.appendChild(aidsRow);
    panel.appendChild(topicRow);
    panel.appendChild(footer);

    wrapper.appendChild(panel);
  }

  public remove(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}

export const floatingToolbar = new FloatingTeacherToolbar();

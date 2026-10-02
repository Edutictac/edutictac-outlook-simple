import { SimplificationMode, SupportedLanguage } from '../types';
import { MODE_RULES } from '../modes';

export class StatusBar {
  private element: HTMLElement | null = null;
  private onRestoreCallback: (() => void) | null = null;

  public show(mode: SimplificationMode, lang: SupportedLanguage, onRestore: () => void): void {
    this.onRestoreCallback = onRestore;
    this.remove();

    if (mode === 'original') return;

    const bar = document.createElement('div');
    bar.className = 'edutictac-os-status-bar';

    const dot = document.createElement('span');
    dot.className = 'edutictac-os-status-dot';

    const modeName = MODE_RULES[mode]?.name[lang] || MODE_RULES[mode]?.name.es || mode;

    const label = document.createElement('span');
    label.innerHTML = `EduTicTac · <span class="edutictac-os-status-mode">${modeName}</span>`;

    const btn = document.createElement('button');
    btn.className = 'edutictac-os-btn-restore';
    btn.textContent = lang === 'ca' ? 'Restaurar' : lang === 'en' ? 'Restore' : 'Restaurar';
    btn.onclick = () => {
      if (this.onRestoreCallback) {
        this.onRestoreCallback();
      }
    };

    bar.appendChild(dot);
    bar.appendChild(label);
    bar.appendChild(btn);

    document.body.appendChild(bar);
    this.element = bar;
  }

  public remove(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

export const statusBar = new StatusBar();

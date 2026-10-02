import { OutlookElementKey, SupportedLanguage } from '../types';
import { findOutlookElement, selectorRegistry } from '../selectors';

export interface HighlightOptions {
  label?: string;
  isPresentation?: boolean;
  tooltipText?: string;
  lang?: SupportedLanguage;
}

export class Highlighter {
  private activeHighlights: Map<OutlookElementKey, HTMLElement> = new Map();
  private activeBadges: HTMLElement[] = [];
  private activeTooltips: HTMLElement[] = [];
  private focusBackdrop: HTMLElement | null = null;
  private focusTargetElement: HTMLElement | null = null;

  public highlight(
    key: OutlookElementKey,
    options: HighlightOptions = {}
  ): boolean {
    const el = findOutlookElement(key);
    if (!el) return false;

    // Remove existing if any
    this.removeHighlight(key);

    const isPresentation = options.isPresentation ?? false;
    const lang = options.lang ?? 'es';

    el.classList.add(isPresentation ? 'edutictac-os-highlight-presentation' : 'edutictac-os-highlight');
    this.activeHighlights.set(key, el);

    // Optional label badge
    const labelText = options.label || selectorRegistry.getLabel(key, lang);
    if (labelText) {
      const badge = document.createElement('div');
      badge.className = 'edutictac-os-badge';
      badge.textContent = labelText;
      badge.setAttribute('data-edutictac-for', key);

      // We attach the badge to the element or its parent
      if (window.getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      el.appendChild(badge);
      this.activeBadges.push(badge);
    }

    // Optional tooltip card
    const tooltipContent = options.tooltipText || selectorRegistry.getTooltip(key, lang);
    if (tooltipContent) {
      this.showTooltipCard(el, labelText, tooltipContent);
    }

    return true;
  }

  public removeHighlight(key: OutlookElementKey): void {
    const el = this.activeHighlights.get(key);
    if (el) {
      el.classList.remove('edutictac-os-highlight', 'edutictac-os-highlight-presentation');
      this.activeHighlights.delete(key);
    }

    // Remove matching badges
    const remainingBadges: HTMLElement[] = [];
    for (const badge of this.activeBadges) {
      if (badge.getAttribute('data-edutictac-for') === key) {
        badge.remove();
      } else {
        remainingBadges.push(badge);
      }
    }
    this.activeBadges = remainingBadges;
  }

  public removeAll(): void {
    for (const [key, el] of this.activeHighlights) {
      if (el && el.classList) {
        el.classList.remove('edutictac-os-highlight', 'edutictac-os-highlight-presentation');
      }
    }
    this.activeHighlights.clear();

    for (const badge of this.activeBadges) {
      badge.remove();
    }
    this.activeBadges = [];

    this.removeAllTooltips();
    this.exitFocus();
  }

  public showTooltipCard(targetEl: HTMLElement, title: string, text: string): HTMLElement {
    const rect = targetEl.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = 'edutictac-os-tooltip-card';

    const titleEl = document.createElement('div');
    titleEl.className = 'edutictac-os-tooltip-title';
    titleEl.textContent = title;

    const bodyEl = document.createElement('div');
    bodyEl.className = 'edutictac-os-tooltip-body';
    bodyEl.textContent = text;

    tooltip.appendChild(titleEl);
    tooltip.appendChild(bodyEl);

    // Calculate position
    const top = Math.max(10, rect.bottom + window.scrollY + 8);
    const left = Math.min(window.innerWidth - 300, Math.max(10, rect.left + window.scrollX));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    document.body.appendChild(tooltip);
    this.activeTooltips.push(tooltip);
    return tooltip;
  }

  public removeAllTooltips(): void {
    for (const t of this.activeTooltips) {
      t.remove();
    }
    this.activeTooltips = [];
  }

  public focusOn(key: OutlookElementKey, title?: string, description?: string): boolean {
    const el = findOutlookElement(key);
    if (!el) return false;

    this.exitFocus();

    // Create backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.className = 'edutictac-os-focus-backdrop';

    const exitBtn = document.createElement('button');
    exitBtn.className = 'edutictac-os-focus-exit-btn';
    exitBtn.innerHTML = '✕ Salir del modo foco';
    exitBtn.onclick = () => this.exitFocus();

    backdrop.appendChild(exitBtn);
    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        this.exitFocus();
      }
    };

    document.body.appendChild(backdrop);
    this.focusBackdrop = backdrop;

    el.classList.add('edutictac-os-focus-target');
    this.focusTargetElement = el;

    if (title || description) {
      this.showTooltipCard(el, title || 'Enfoque', description || '');
    }

    return true;
  }

  public exitFocus(): void {
    if (this.focusBackdrop) {
      this.focusBackdrop.remove();
      this.focusBackdrop = null;
    }
    if (this.focusTargetElement) {
      this.focusTargetElement.classList.remove('edutictac-os-focus-target');
      this.focusTargetElement = null;
    }
  }
}

export const highlighter = new Highlighter();

import { ExtensionConfig, SupportedLanguage } from '../types';
import { loadConfig, subscribeToConfigChanges } from '../storage';
import { modeEngine } from '../modes';
import { highlighter } from '../ui/highlighter';
import { floatingToolbar } from '../ui/floating-widget';
import { DIDACTIC_TOPICS } from '../tutorials';
import { detectLanguage } from '../utils/dom';
import { selectorRegistry } from '../selectors';
import { setupKeyboardShortcuts } from '../utils/shortcuts';

class OutlookSimpleApp {
  private config: ExtensionConfig | null = null;
  private observer: MutationObserver | null = null;
  private debounceTimer: number | null = null;
  private lang: SupportedLanguage = 'es';

  public async init(): Promise<void> {
    this.config = await loadConfig();
    this.lang = this.config.language === 'auto' ? detectLanguage() : this.config.language;

    console.log('[EduTicTac Outlook Simple] Initializing...', {
      mode: this.config.mode,
      lang: this.lang
    });

    // Setup global keyboard shortcuts for presenters (Alt+P, Alt+O, Alt+B, Alt+Arrows)
    setupKeyboardShortcuts();

    this.applyAll();

    // Subscribe to config changes in real-time
    subscribeToConfigChanges((newConfig) => {
      this.config = newConfig;
      this.lang = this.config.language === 'auto' ? detectLanguage() : this.config.language;
      this.applyAll();
    });

    // Listen to direct messages from popup
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        if (message.action === 'PING') {
          sendResponse({ status: 'OK', mode: this.config?.mode });
        } else if (message.action === 'GET_DEBUG_INFO') {
          sendResponse(this.getDebugInfo());
        } else if (message.action === 'FOCUS_ON') {
          if (message.key) {
            highlighter.focusOn(message.key, message.title, message.description);
            sendResponse({ success: true });
          }
        }
      });
    }

    // Set up throttled MutationObserver
    this.setupObserver();
  }

  public applyAll(): void {
    if (!this.config || !this.config.enabled || this.config.mode === 'original') {
      this.restore();
      return;
    }

    // 1. Mode classes and hiding
    modeEngine.applyMode(this.config.mode);

    // 2. Presentation mode class
    if (this.config.presentationMode) {
      document.body.classList.add('edutictac-os-presentation');
    } else {
      document.body.classList.remove('edutictac-os-presentation');
    }

    // 3. Clear existing highlights/tooltips
    highlighter.removeAll();

    // 4. Highlight topic or controls if enabled
    if (this.config.activeTopic && DIDACTIC_TOPICS[this.config.activeTopic]) {
      const topic = DIDACTIC_TOPICS[this.config.activeTopic];
      const stepIdx = Math.min(Math.max(0, this.config.activeStepIndex || 0), topic.steps.length - 1);
      const activeStep = topic.steps[stepIdx];

      // Highlight active step prominently with card
      if (activeStep) {
        highlighter.highlight(activeStep.elementKey, {
          label: `${stepIdx + 1}. ${activeStep.title[this.lang] || activeStep.title.es}`,
          tooltipText: this.config.showTooltips ? (activeStep.description[this.lang] || activeStep.description.es) : undefined,
          isPresentation: this.config.presentationMode,
          lang: this.lang
        });
      }

      // Highlight other steps in topic lightly if enabled
      if (this.config.highlightControls) {
        topic.steps.forEach((step, idx) => {
          if (idx !== stepIdx) {
            highlighter.highlight(step.elementKey, {
              label: `${idx + 1}. ${step.title[this.lang] || step.title.es}`,
              isPresentation: false,
              lang: this.lang
            });
          }
        });
      }
    } else if (this.config.highlightControls) {
      // Highlight standard mail actions
      const standardKeys: Array<import('../types').OutlookElementKey> = ['newMail', 'search', 'inbox'];
      for (const key of standardKeys) {
        highlighter.highlight(key, {
          isPresentation: this.config.presentationMode,
          lang: this.lang
        });
      }
    }

    // 5. Floating interactive teacher toolbar
    floatingToolbar.render(this.config, this.lang);
  }

  public restore(): void {
    modeEngine.restoreOriginal();
    highlighter.removeAll();
    if (this.config) {
      floatingToolbar.render(this.config, this.lang);
    }
    document.body.classList.remove('edutictac-os-presentation');
  }

  private setupObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new MutationObserver((mutations) => {
      // Check if changes are from our own injected elements
      const isOurModification = mutations.some(m => {
        const target = m.target as HTMLElement;
        return target && target.className && typeof target.className === 'string' && target.className.includes('edutictac-os');
      });

      if (isOurModification) {
        return;
      }

      // Debounce updates to minimize DOM overhead
      if (this.debounceTimer !== null) {
        window.clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = window.setTimeout(() => {
        if (this.config && this.config.enabled && this.config.mode !== 'original') {
          this.applyAll();
        }
      }, 350);
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }

  public getDebugInfo() {
    const definitions = selectorRegistry.getAllDefinitions();
    const foundElements = [];
    const missingElements = [];

    for (const def of definitions) {
      const res = selectorRegistry.findElement(def.elementKey);
      if (res.element) {
        foundElements.push({
          key: def.elementKey,
          strategyUsed: res.strategyUsed || 'direct',
          tagName: res.element.tagName
        });
      } else {
        missingElements.push(def.elementKey);
      }
    }

    return {
      timestamp: new Date().toISOString(),
      outlookDetected: true,
      detectedLanguage: this.lang,
      url: window.location.href,
      foundElements,
      missingElements,
      activeMode: this.config?.mode || 'original',
      observerActive: this.observer !== null
    };
  }
}

// Start application when DOM is ready
const app = new OutlookSimpleApp();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

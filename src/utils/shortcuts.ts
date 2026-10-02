import { loadConfig, saveConfig } from '../storage';
import { DIDACTIC_TOPICS } from '../tutorials';
import { highlighter } from '../ui/highlighter';

export function setupKeyboardShortcuts(): () => void {
  const handler = async (e: KeyboardEvent) => {
    // Only trigger if Alt key is pressed (or Escape) and not currently typing inside an input/textarea/editable field
    const activeEl = document.activeElement;
    const isTyping = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.getAttribute('contenteditable') === 'true'
    );

    if (e.key === 'Escape') {
      highlighter.exitFocus();
      return;
    }

    if (!e.altKey || isTyping) {
      return;
    }

    const key = e.key.toLowerCase();
    const config = await loadConfig();

    if (key === 'p') {
      e.preventDefault();
      await saveConfig({ presentationMode: !config.presentationMode });
    } else if (key === 'o') {
      e.preventDefault();
      await saveConfig({ mode: 'original', activeTopic: null });
    } else if (key === 'b') {
      e.preventDefault();
      await saveConfig({ mode: 'basic', enabled: true });
    } else if (e.key === 'ArrowRight') {
      if (config.activeTopic && DIDACTIC_TOPICS[config.activeTopic]) {
        e.preventDefault();
        const topic = DIDACTIC_TOPICS[config.activeTopic];
        const nextIdx = Math.min(topic.steps.length - 1, (config.activeStepIndex || 0) + 1);
        await saveConfig({ activeStepIndex: nextIdx });
      }
    } else if (e.key === 'ArrowLeft') {
      if (config.activeTopic && DIDACTIC_TOPICS[config.activeTopic]) {
        e.preventDefault();
        const prevIdx = Math.max(0, (config.activeStepIndex || 0) - 1);
        await saveConfig({ activeStepIndex: prevIdx });
      }
    }
  };

  window.addEventListener('keydown', handler, true);
  return () => {
    window.removeEventListener('keydown', handler, true);
  };
}

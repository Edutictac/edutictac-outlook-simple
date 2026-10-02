import { OutlookElementKey, SelectorDefinition, SupportedLanguage } from '../types';
import { outlookSelectorsV1 } from './outlook/v1';

export interface SelectorResolution {
  element: HTMLElement | null;
  strategyUsed: string | null;
  key: OutlookElementKey;
}

class SelectorRegistry {
  private versionMap: Record<string, Record<OutlookElementKey, SelectorDefinition>> = {
    v1: outlookSelectorsV1
  };
  private currentVersion = 'v1';

  public getDefinition(key: OutlookElementKey): SelectorDefinition | undefined {
    return this.versionMap[this.currentVersion]?.[key];
  }

  public getAllDefinitions(): SelectorDefinition[] {
    return Object.values(this.versionMap[this.currentVersion] || {});
  }

  public findElement(
    key: OutlookElementKey,
    root: Document | HTMLElement = document
  ): SelectorResolution {
    const definition = this.getDefinition(key);
    if (!definition) {
      return { element: null, strategyUsed: null, key };
    }

    for (const strategy of definition.strategies) {
      try {
        const el = strategy.query(root);
        if (el && el.isConnected) {
          return {
            element: el,
            strategyUsed: strategy.description,
            key
          };
        }
      } catch (err) {
        // Fail-safe: ignore failed individual selector queries without throwing
      }
    }

    return { element: null, strategyUsed: null, key };
  }

  public getLabel(key: OutlookElementKey, lang: SupportedLanguage): string {
    const def = this.getDefinition(key);
    if (!def) return key;
    return def.labels[lang] || def.labels.es || def.name;
  }

  public getTooltip(key: OutlookElementKey, lang: SupportedLanguage): string | undefined {
    const def = this.getDefinition(key);
    if (!def || !def.tooltip) return undefined;
    return def.tooltip[lang] || def.tooltip.es;
  }
}

export const selectorRegistry = new SelectorRegistry();

export function findOutlookElement(
  key: OutlookElementKey,
  root: Document | HTMLElement = document
): HTMLElement | null {
  return selectorRegistry.findElement(key, root).element;
}

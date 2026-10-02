import { SupportedLanguage } from '../types';

/**
 * Normalizes string for tolerant matching (lowercase, trim, collapse whitespace).
 */
export function normalizeText(str: string | null | undefined): string {
  if (!str) return '';
  return str.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Checks if target attribute contains any of the search phrases.
 */
export function matchesAny(val: string | null | undefined, phrases: string[]): boolean {
  if (!val) return false;
  const norm = normalizeText(val);
  return phrases.some(p => norm.includes(normalizeText(p)));
}

/**
 * Detects current interface language from HTML or page context.
 */
export function detectLanguage(): SupportedLanguage {
  const htmlLang = document.documentElement.lang?.toLowerCase() || '';
  if (htmlLang.startsWith('ca') || htmlLang.startsWith('val')) {
    return 'ca';
  }
  if (htmlLang.startsWith('en')) {
    return 'en';
  }
  return 'es'; // default fallback for regional schools
}

/**
 * Helper to query by aria-label with multiple variants.
 */
export function queryByAriaLabel(root: Document | HTMLElement, labels: string[]): HTMLElement | null {
  for (const label of labels) {
    const el = root.querySelector<HTMLElement>(`[aria-label*="${label}" i], [title*="${label}" i]`);
    if (el) return el;
  }
  return null;
}

/**
 * Helper to query button or interactive element by text content.
 */
export function queryByText(
  root: Document | HTMLElement,
  selector: string,
  texts: string[]
): HTMLElement | null {
  const elements = root.querySelectorAll<HTMLElement>(selector);
  for (const el of elements) {
    const content = normalizeText(el.textContent);
    for (const text of texts) {
      if (content.includes(normalizeText(text))) {
        return el;
      }
    }
  }
  return null;
}

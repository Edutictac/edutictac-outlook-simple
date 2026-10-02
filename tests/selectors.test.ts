import { describe, it, expect, beforeEach } from 'vitest';
import { selectorRegistry, findOutlookElement } from '../src/selectors';
import { normalizeText, matchesAny, detectLanguage } from '../src/utils/dom';

describe('Selectors and DOM Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('normalizes strings properly', () => {
    expect(normalizeText('  Nuevo  Correo  ')).toBe('nuevo correo');
    expect(normalizeText(null)).toBe('');
  });

  it('detects language from HTML lang attribute', () => {
    document.documentElement.lang = 'ca-ES';
    expect(detectLanguage()).toBe('ca');

    document.documentElement.lang = 'en-US';
    expect(detectLanguage()).toBe('en');

    document.documentElement.lang = 'es-ES';
    expect(detectLanguage()).toBe('es');
  });

  it('finds New Mail button across different languages and attributes', () => {
    // Test Spanish aria-label
    const btnEs = document.createElement('button');
    btnEs.setAttribute('aria-label', 'Nuevo correo');
    document.body.appendChild(btnEs);

    let found = findOutlookElement('newMail', document);
    expect(found).toBe(btnEs);

    // Test Catalan/Valencian aria-label
    document.body.innerHTML = '';
    const btnCa = document.createElement('button');
    btnCa.setAttribute('aria-label', 'Missatge nou');
    document.body.appendChild(btnCa);

    found = findOutlookElement('newMail', document);
    expect(found).toBe(btnCa);

    // Test English aria-label
    document.body.innerHTML = '';
    const btnEn = document.createElement('button');
    btnEn.setAttribute('aria-label', 'New mail');
    document.body.appendChild(btnEn);

    found = findOutlookElement('newMail', document);
    expect(found).toBe(btnEn);
  });

  it('finds Search input box', () => {
    const input = document.createElement('input');
    input.id = 'topSearchInput';
    document.body.appendChild(input);

    const found = findOutlookElement('search', document);
    expect(found).toBe(input);
  });

  it('handles missing elements gracefully (fail-safe)', () => {
    document.body.innerHTML = '<div>Random HTML</div>';
    const res = selectorRegistry.findElement('nonExistentKey' as any);
    expect(res.element).toBeNull();

    const newMailRes = selectorRegistry.findElement('newMail');
    expect(newMailRes.element).toBeNull();
  });

  it('resolves labels and tooltips in selected languages', () => {
    const labelEs = selectorRegistry.getLabel('newMail', 'es');
    const labelCa = selectorRegistry.getLabel('newMail', 'ca');
    const labelEn = selectorRegistry.getLabel('newMail', 'en');

    expect(labelEs).toBe('Nuevo correo');
    expect(labelCa).toBe('Missatge nou');
    expect(labelEn).toBe('New mail');
  });
});

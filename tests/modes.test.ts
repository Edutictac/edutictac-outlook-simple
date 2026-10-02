import { describe, it, expect, beforeEach } from 'vitest';
import { modeEngine, MODE_RULES } from '../src/modes';
import { DIDACTIC_TOPICS } from '../src/tutorials';

describe('Mode Engine and Didactic Topics', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    modeEngine.restoreOriginal();
  });

  it('contains valid configurations for all 4 modes', () => {
    expect(MODE_RULES.original).toBeDefined();
    expect(MODE_RULES.basic).toBeDefined();
    expect(MODE_RULES.organization).toBeDefined();
    expect(MODE_RULES.advanced).toBeDefined();
  });

  it('applies basic mode and adds CSS class to body', () => {
    const copilotBtn = document.createElement('button');
    copilotBtn.setAttribute('aria-label', 'Microsoft Copilot');
    document.body.appendChild(copilotBtn);

    modeEngine.applyMode('basic');

    expect(document.body.classList.contains('edutictac-os-active')).toBe(true);
    expect(document.body.classList.contains('edutictac-os-mode-basic')).toBe(true);
    expect(copilotBtn.classList.contains('edutictac-os-hidden')).toBe(true);
  });

  it('restores original cleanly', () => {
    const copilotBtn = document.createElement('button');
    copilotBtn.setAttribute('aria-label', 'Microsoft Copilot');
    document.body.appendChild(copilotBtn);

    modeEngine.applyMode('basic');
    expect(copilotBtn.classList.contains('edutictac-os-hidden')).toBe(true);

    modeEngine.restoreOriginal();
    expect(document.body.classList.contains('edutictac-os-active')).toBe(false);
    expect(copilotBtn.classList.contains('edutictac-os-hidden')).toBe(false);
  });

  it('hides labelled secondary controls in basic mode but keeps essential mail actions', () => {
    const settings = document.createElement('button');
    settings.setAttribute('aria-label', 'Settings');
    const calendar = document.createElement('button');
    calendar.setAttribute('aria-label', 'Calendar');
    const compose = document.createElement('button');
    compose.setAttribute('aria-label', 'New mail');
    const search = document.createElement('input');
    search.setAttribute('aria-label', 'Search');
    document.body.append(settings, calendar, compose, search);

    modeEngine.applyMode('basic');

    expect(settings.classList.contains('edutictac-os-hidden')).toBe(true);
    expect(calendar.classList.contains('edutictac-os-hidden')).toBe(true);
    expect(compose.classList.contains('edutictac-os-hidden')).toBe(false);
    expect(search.classList.contains('edutictac-os-hidden')).toBe(false);

    modeEngine.restoreOriginal();
    expect(settings.classList.contains('edutictac-os-hidden')).toBe(false);
    expect(calendar.classList.contains('edutictac-os-hidden')).toBe(false);
  });

  it('keeps only essential actions in a semantic command toolbar in basic mode', () => {
    const toolbar = document.createElement('div');
    toolbar.setAttribute('role', 'toolbar');
    const labels = ['New mail', 'Search', 'Delete', 'Archive', 'Print', 'Move to folder', 'Account'];
    const controls = labels.map(label => {
      const button = document.createElement('button');
      button.setAttribute('aria-label', label);
      toolbar.appendChild(button);
      return button;
    });
    document.body.appendChild(toolbar);

    modeEngine.applyMode('basic');

    expect(controls[0].classList.contains('edutictac-os-hidden')).toBe(false);
    expect(controls[1].classList.contains('edutictac-os-hidden')).toBe(false);
    expect(controls[2].classList.contains('edutictac-os-hidden')).toBe(true);
    expect(controls[3].classList.contains('edutictac-os-hidden')).toBe(true);
    expect(controls[4].classList.contains('edutictac-os-hidden')).toBe(true);
    expect(controls[5].classList.contains('edutictac-os-hidden')).toBe(true);
    expect(controls[6].classList.contains('edutictac-os-hidden')).toBe(true);
  });

  it('defines all required 15 didactic topics with valid steps', () => {
    const requiredTopics = [
      'basic-mail',
      'compose',
      'cc-bcc',
      'attachments',
      'reply',
      'reply-all',
      'forward',
      'search',
      'folders',
      'archive',
      'filters',
      'categories',
      'rules',
      'signature',
      'calendar'
    ];

    for (const topicId of requiredTopics) {
      const topic = DIDACTIC_TOPICS[topicId as keyof typeof DIDACTIC_TOPICS];
      expect(topic, `Topic ${topicId} should exist`).toBeDefined();
      expect(topic.steps.length).toBeGreaterThan(0);
      expect(topic.title.es).toBeTruthy();
      expect(topic.title.ca).toBeTruthy();
      expect(topic.title.en).toBeTruthy();
    }
  });
});

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

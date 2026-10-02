import { ExtensionConfig } from '../types';

export const DEFAULT_CONFIG: ExtensionConfig = {
  enabled: true,
  mode: 'basic',
  highlightControls: true,
  showTooltips: true,
  presentationMode: false,
  activeTopic: 'basic-mail',
  activeStepIndex: 0,
  focusTarget: null,
  debugMode: false,
  language: 'auto'
};

const STORAGE_KEY = 'edutictac_outlook_simple_config';

export async function loadConfig(): Promise<ExtensionConfig> {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        if (chrome.runtime?.lastError) {
          console.warn('[EduTicTac] Error loading config:', chrome.runtime.lastError);
          resolve({ ...DEFAULT_CONFIG });
          return;
        }
        if (result && result[STORAGE_KEY]) {
          resolve({ ...DEFAULT_CONFIG, ...result[STORAGE_KEY] });
        } else {
          resolve({ ...DEFAULT_CONFIG });
        }
      });
    } else {
      // Local fallback for dev/testing environment
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          resolve({ ...DEFAULT_CONFIG, ...JSON.parse(stored) });
          return;
        }
      } catch (e) {
        // ignore
      }
      resolve({ ...DEFAULT_CONFIG });
    }
  });
}

export async function saveConfig(partial: Partial<ExtensionConfig>): Promise<ExtensionConfig> {
  const current = await loadConfig();
  const updated: ExtensionConfig = { ...current, ...partial };

  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ [STORAGE_KEY]: updated }, () => {
        resolve(updated);
      });
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      resolve(updated);
    }
  });
}

export function subscribeToConfigChanges(callback: (config: ExtensionConfig) => void): () => void {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
      if (areaName === 'local' && changes[STORAGE_KEY]) {
        callback({ ...DEFAULT_CONFIG, ...changes[STORAGE_KEY].newValue });
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }
  return () => {};
}

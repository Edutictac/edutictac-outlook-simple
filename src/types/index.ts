export type SimplificationMode = 'original' | 'basic' | 'organization' | 'advanced';

export type TutorialTopicId =
  | 'basic-mail'
  | 'compose'
  | 'cc-bcc'
  | 'attachments'
  | 'reply'
  | 'reply-all'
  | 'forward'
  | 'search'
  | 'folders'
  | 'archive'
  | 'filters'
  | 'categories'
  | 'rules'
  | 'signature'
  | 'calendar';

export type SupportedLanguage = 'es' | 'ca' | 'en';

export interface ExtensionConfig {
  enabled: boolean;
  mode: SimplificationMode;
  highlightControls: boolean;
  showTooltips: boolean;
  presentationMode: boolean;
  activeTopic: TutorialTopicId | null;
  focusTarget: string | null;
  debugMode: boolean;
  language: 'auto' | SupportedLanguage;
}

export type OutlookElementKey =
  | 'newMail'
  | 'inbox'
  | 'sent'
  | 'drafts'
  | 'trash'
  | 'archiveFolder'
  | 'search'
  | 'foldersPane'
  | 'messageList'
  | 'readingPane'
  | 'reply'
  | 'replyAll'
  | 'forward'
  | 'attach'
  | 'send'
  | 'recipientTo'
  | 'recipientCc'
  | 'recipientBcc'
  | 'createFolder'
  | 'moveTo'
  | 'markRead'
  | 'flag'
  | 'filter'
  | 'categories'
  | 'settings'
  | 'calendar'
  | 'contacts'
  | 'appNav'
  | 'meetNow'
  | 'copilot'
  | 'adsOrPromos'
  | 'helpButton'
  | 'myDay'
  | 'ribbonSecondary';

export interface SelectorStrategy {
  description: string;
  query: (root: Document | HTMLElement) => HTMLElement | null;
}

export interface SelectorDefinition {
  name: string;
  elementKey: OutlookElementKey;
  labels: {
    es: string;
    ca: string;
    en: string;
  };
  tooltip?: {
    es: string;
    ca: string;
    en: string;
  };
  strategies: SelectorStrategy[];
}

export interface DidacticStep {
  elementKey: OutlookElementKey;
  title: {
    es: string;
    ca: string;
    en: string;
  };
  description: {
    es: string;
    ca: string;
    en: string;
  };
  focus?: boolean;
}

export interface DidacticTopic {
  id: TutorialTopicId;
  title: {
    es: string;
    ca: string;
    en: string;
  };
  summary: {
    es: string;
    ca: string;
    en: string;
  };
  steps: DidacticStep[];
}

export interface DebugReport {
  timestamp: string;
  outlookDetected: boolean;
  detectedLanguage: SupportedLanguage;
  url: string;
  foundElements: {
    key: OutlookElementKey;
    strategyUsed: string;
    tagName: string;
  }[];
  missingElements: OutlookElementKey[];
  activeMode: SimplificationMode;
  observerActive: boolean;
}

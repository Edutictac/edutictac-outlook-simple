import { OutlookElementKey, SelectorDefinition } from '../../types';
import { queryByAriaLabel, queryByText, matchesAny } from '../../utils/dom';

export const outlookSelectorsV1: Record<OutlookElementKey, SelectorDefinition> = {
  newMail: {
    name: 'Nuevo correo',
    elementKey: 'newMail',
    labels: {
      es: 'Nuevo correo',
      ca: 'Missatge nou',
      en: 'New mail'
    },
    tooltip: {
      es: 'Crea y redacta un nuevo mensaje de correo electrónico.',
      ca: 'Crea i redacta un nou missatge de correu electrònic.',
      en: 'Create and write a new email message.'
    },
    strategies: [
      {
        description: 'Boton primario por aria-label',
        query: root => queryByAriaLabel(root, ['Nuevo correo', 'Missatge nou', 'New mail'])
      },
      {
        description: 'Automation ID splitbuttonprimary con icono mail',
        query: root => root.querySelector<HTMLElement>('button[data-automation-id="splitbuttonprimary"]')
      },
      {
        description: 'Boton por texto visible',
        query: root => queryByText(root, 'button', ['Nuevo correo', 'Missatge nou', 'New mail'])
      }
    ]
  },

  search: {
    name: 'Búsqueda',
    elementKey: 'search',
    labels: {
      es: 'Buscar correo',
      ca: 'Cercar correu',
      en: 'Search mail'
    },
    tooltip: {
      es: 'Busca mensajes por remitente, asunto o palabras clave.',
      ca: 'Cerca missatges per remitent, assumpte o paraules clau.',
      en: 'Search emails by sender, subject, or keywords.'
    },
    strategies: [
      {
        description: 'Input topSearchInput ID',
        query: root => root.querySelector<HTMLElement>('input#topSearchInput')
      },
      {
        description: 'Input por aria-label de busqueda',
        query: root => queryByAriaLabel(root, ['Buscar', 'Cerca', 'Cercar', 'Search'])
      },
      {
        description: 'Region role="search"',
        query: root => root.querySelector<HTMLElement>('div[role="search"], div#searchBoxId, div[data-automation-id="searchBox"]')
      }
    ]
  },

  foldersPane: {
    name: 'Panel de carpetas',
    elementKey: 'foldersPane',
    labels: {
      es: 'Panel de carpetas',
      ca: 'Panell de carpetes',
      en: 'Folders pane'
    },
    tooltip: {
      es: 'Muestra las carpetas de tu buzón para organizar tus mensajes.',
      ca: 'Mostra les carpetes de la teua bústia per organitzar els missatges.',
      en: 'Shows your mailbox folders to organize your messages.'
    },
    strategies: [
      {
        description: 'Tree navigation por aria-label',
        query: root => queryByAriaLabel(root, ['Carpetas', 'Carpetes', 'Folders', 'Panel de carpetas'])
      },
      {
        description: 'Role tree navigation',
        query: root => root.querySelector<HTMLElement>('div[role="tree"], div#folderPane, div[data-automation-id="folderPane"]')
      }
    ]
  },

  inbox: {
    name: 'Bandeja de entrada',
    elementKey: 'inbox',
    labels: {
      es: 'Bandeja de entrada',
      ca: "Safata d'entrada",
      en: 'Inbox'
    },
    tooltip: {
      es: 'Aquí llegan todos los correos recibidos.',
      ca: 'Ací arriben tots els correus rebuts.',
      en: 'Where all incoming emails arrive.'
    },
    strategies: [
      {
        description: 'Tree item por aria-label',
        query: root => queryByAriaLabel(root, ['Bandeja de entrada', "Safata d'entrada", 'Inbox'])
      },
      {
        description: 'Data-folder-name inbox',
        query: root => root.querySelector<HTMLElement>('[data-folder-name="Inbox"], [data-folder-name="inbox"]')
      }
    ]
  },

  sent: {
    name: 'Elementos enviados',
    elementKey: 'sent',
    labels: {
      es: 'Elementos enviados',
      ca: 'Elements enviats',
      en: 'Sent Items'
    },
    tooltip: {
      es: 'Contiene copias de todos los correos que has enviado.',
      ca: 'Conté còpies de tots els correus que has enviat.',
      en: 'Contains copies of all emails you have sent.'
    },
    strategies: [
      {
        description: 'Tree item por aria-label',
        query: root => queryByAriaLabel(root, ['Elementos enviados', 'Elements enviats', 'Sent Items', 'Sent'])
      },
      {
        description: 'Data-folder-name sentitems',
        query: root => root.querySelector<HTMLElement>('[data-folder-name="SentItems"], [data-folder-name="sentitems"]')
      }
    ]
  },

  drafts: {
    name: 'Borradores',
    elementKey: 'drafts',
    labels: {
      es: 'Borradores',
      ca: 'Esborranys',
      en: 'Drafts'
    },
    tooltip: {
      es: 'Mensajes que has empezado a escribir pero aún no has enviado.',
      ca: 'Missatges que has començat a escriure però encara no has enviat.',
      en: 'Messages you started writing but have not sent yet.'
    },
    strategies: [
      {
        description: 'Tree item por aria-label',
        query: root => queryByAriaLabel(root, ['Borradores', 'Esborranys', 'Drafts'])
      },
      {
        description: 'Data-folder-name drafts',
        query: root => root.querySelector<HTMLElement>('[data-folder-name="Drafts"], [data-folder-name="drafts"]')
      }
    ]
  },

  trash: {
    name: 'Elementos eliminados',
    elementKey: 'trash',
    labels: {
      es: 'Papelera / Eliminados',
      ca: 'Paperera / Suprimits',
      en: 'Deleted Items / Trash'
    },
    tooltip: {
      es: 'Papelera temporal donde van los correos borrados.',
      ca: 'Paperera temporal on van els correus esborrats.',
      en: 'Temporary trash where deleted emails go.'
    },
    strategies: [
      {
        description: 'Tree item por aria-label',
        query: root => queryByAriaLabel(root, ['Elementos eliminados', 'Elements suprimits', 'Deleted Items', 'Papelera', 'Paperera'])
      },
      {
        description: 'Data-folder-name deleteditems',
        query: root => root.querySelector<HTMLElement>('[data-folder-name="DeletedItems"]')
      }
    ]
  },

  archiveFolder: {
    name: 'Archivo',
    elementKey: 'archiveFolder',
    labels: {
      es: 'Archivo',
      ca: 'Arxiu',
      en: 'Archive'
    },
    tooltip: {
      es: 'Guarda mensajes importantes sin saturar la bandeja de entrada.',
      ca: 'Guarda missatges importants sense saturar la safata d’entrada.',
      en: 'Keep important messages without cluttering your inbox.'
    },
    strategies: [
      {
        description: 'Tree item por aria-label',
        query: root => queryByAriaLabel(root, ['Archivo', 'Arxiu', 'Archive'])
      },
      {
        description: 'Data-folder-name archive',
        query: root => root.querySelector<HTMLElement>('[data-folder-name="Archive"]')
      }
    ]
  },

  messageList: {
    name: 'Lista de mensajes',
    elementKey: 'messageList',
    labels: {
      es: 'Lista de mensajes',
      ca: 'Llista de missatges',
      en: 'Message list'
    },
    tooltip: {
      es: 'Listado con los correos de la carpeta seleccionada.',
      ca: 'Llistat amb els correus de la carpeta seleccionada.',
      en: 'List of emails in the selected folder.'
    },
    strategies: [
      {
        description: 'Region role con aria-label',
        query: root => queryByAriaLabel(root, ['Lista de mensajes', 'Llista de missatges', 'Message list', 'Mensajes', 'Missatges'])
      },
      {
        description: 'Role listbox o contenedor messageList',
        query: root => root.querySelector<HTMLElement>('div#MessageList, div[data-automation-id="messageListContainer"], div[role="listbox"]')
      }
    ]
  },

  readingPane: {
    name: 'Panel de lectura',
    elementKey: 'readingPane',
    labels: {
      es: 'Panel de lectura',
      ca: 'Panell de lectura',
      en: 'Reading pane'
    },
    tooltip: {
      es: 'Muestra el contenido completo del correo seleccionado.',
      ca: 'Mostra el contingut complet del correu seleccionat.',
      en: 'Shows the full content of the selected email.'
    },
    strategies: [
      {
        description: 'Region role con aria-label',
        query: root => queryByAriaLabel(root, ['Panel de lectura', 'Panell de lectura', 'Reading pane'])
      },
      {
        description: 'ReadingPaneContainerId',
        query: root => root.querySelector<HTMLElement>('div#ReadingPaneContainerId, div[data-automation-id="readingPaneContainer"]')
      }
    ]
  },

  reply: {
    name: 'Responder',
    elementKey: 'reply',
    labels: {
      es: 'Responder',
      ca: 'Respondre',
      en: 'Reply'
    },
    tooltip: {
      es: 'Responde únicamente a la persona que te ha enviado el correo.',
      ca: 'Respon únicament a la persona que t’ha enviat el correu.',
      en: 'Replies only to the person who sent the email.'
    },
    strategies: [
      {
        description: 'Boton responder exacto aria-label',
        query: root => {
          const btns = root.querySelectorAll<HTMLElement>('button[aria-label*="Responder" i], button[aria-label*="Respon" i], button[aria-label*="Reply" i]');
          for (const btn of btns) {
            const label = btn.getAttribute('aria-label') || '';
            if (!matchesAny(label, ['todos', 'tots', 'all'])) {
              return btn;
            }
          }
          return null;
        }
      },
      {
        description: 'Boton automation-id reply',
        query: root => root.querySelector<HTMLElement>('button[data-automation-id="reply"]')
      }
    ]
  },

  replyAll: {
    name: 'Responder a todos',
    elementKey: 'replyAll',
    labels: {
      es: 'Responder a todos',
      ca: 'Respondre a tots',
      en: 'Reply all'
    },
    tooltip: {
      es: 'Envía tu respuesta a la persona remitente y a todas las personas en copia (CC).',
      ca: 'Envia la resposta a la persona remitent i a totes les persones en còpia (CC).',
      en: 'Sends your reply to the sender and everyone in copy (CC).'
    },
    strategies: [
      {
        description: 'Boton responder a todos aria-label',
        query: root => queryByAriaLabel(root, ['Responder a todos', 'Respon a tots', 'Reply all'])
      },
      {
        description: 'Boton automation-id replyAll',
        query: root => root.querySelector<HTMLElement>('button[data-automation-id="replyAll"]')
      }
    ]
  },

  forward: {
    name: 'Reenviar',
    elementKey: 'forward',
    labels: {
      es: 'Reenviar',
      ca: 'Reenviar',
      en: 'Forward'
    },
    tooltip: {
      es: 'Envía una copia de este correo a una persona que no formaba parte del hilo original.',
      ca: 'Envia una còpia d’aquest correu a una persona que no formava part del fil original.',
      en: 'Forwards a copy of this email to someone not in the original thread.'
    },
    strategies: [
      {
        description: 'Boton reenviar aria-label',
        query: root => queryByAriaLabel(root, ['Reenviar', 'Reenvia', 'Forward'])
      },
      {
        description: 'Boton automation-id forward',
        query: root => root.querySelector<HTMLElement>('button[data-automation-id="forward"]')
      }
    ]
  },

  attach: {
    name: 'Adjuntar archivo',
    elementKey: 'attach',
    labels: {
      es: 'Adjuntar archivo',
      ca: 'Adjuntar fitxer',
      en: 'Attach file'
    },
    tooltip: {
      es: 'Añade documentos, fotos o archivos PDF a tu mensaje.',
      ca: 'Afegeix documents, fotos o fitxers PDF al teu missatge.',
      en: 'Add documents, photos, or PDF files to your email.'
    },
    strategies: [
      {
        description: 'Boton adjuntar aria-label',
        query: root => queryByAriaLabel(root, ['Adjuntar', 'Adjunta', 'Attach'])
      },
      {
        description: 'Icono Attach / Clip',
        query: root => root.querySelector<HTMLElement>('button [data-icon-name="Attach"], button [data-icon-name="Paperclip"]')?.closest('button') || null
      }
    ]
  },

  send: {
    name: 'Enviar',
    elementKey: 'send',
    labels: {
      es: 'Enviar',
      ca: 'Enviar',
      en: 'Send'
    },
    tooltip: {
      es: 'Envía el mensaje ahora a todos los destinatarios indicados.',
      ca: 'Envia el missatge ara a tots els destinataris indicats.',
      en: 'Sends the email right now to all listed recipients.'
    },
    strategies: [
      {
        description: 'Boton Enviar aria-label',
        query: root => queryByAriaLabel(root, ['Enviar', 'Envia', 'Send'])
      },
      {
        description: 'Boton automation-id splitbuttonprimary con send',
        query: root => {
          const btn = root.querySelector<HTMLElement>('button[aria-label*="Enviar" i], button[title*="Enviar" i], button[data-automation-id="splitbuttonprimary"]');
          return btn;
        }
      }
    ]
  },

  recipientTo: {
    name: 'Destinatario (Para)',
    elementKey: 'recipientTo',
    labels: {
      es: 'Para (destinatarios principales)',
      ca: 'Per a (destinataris principals)',
      en: 'To (primary recipients)'
    },
    tooltip: {
      es: 'Personas directamente responsables o interesadas a las que va dirigido el correo.',
      ca: 'Persones directament responsables o interessades a qui va adreçat el correu.',
      en: 'Primary persons responsible or addressed in the message.'
    },
    strategies: [
      {
        description: 'Combobox Para por aria-label',
        query: root => queryByAriaLabel(root, ['Para', 'Per a', 'To'])
      },
      {
        description: 'Label Para en compose form',
        query: root => queryByText(root, 'button, span, label', ['Para:', 'Per a:', 'To:'])
      }
    ]
  },

  recipientCc: {
    name: 'En copia (CC)',
    elementKey: 'recipientCc',
    labels: {
      es: 'CC (Copia visible)',
      ca: 'CC (Còpia visible)',
      en: 'Cc (Carbon Copy)'
    },
    tooltip: {
      es: 'Envía una copia informativa. Todos los destinatarios ven esta dirección.',
      ca: 'Envia una còpia informativa. Tots els destinataris veuen aquesta adreça.',
      en: 'Informative copy. All recipients can see this address.'
    },
    strategies: [
      {
        description: 'Boton CC por aria-label exacto',
        query: root => queryByAriaLabel(root, ['Agregar CC', 'Afegir CC', 'Add Cc', 'CC', 'A/c', 'Cc'])
      },
      {
        description: 'Boton o span por texto CC / A/c',
        query: root => queryByText(root, 'button, span[role="button"], label', ['CC', 'A/c', 'Cc'])
      },
      {
        description: 'Campo combobox CC expandido',
        query: root => root.querySelector<HTMLElement>('div[role="combobox"][aria-label*="CC" i], div[role="combobox"][aria-label*="A/c" i], input[aria-label*="CC" i]')
      }
    ]
  },

  recipientBcc: {
    name: 'Copia oculta (CCO)',
    elementKey: 'recipientBcc',
    labels: {
      es: 'CCO (Copia oculta)',
      ca: 'CCO (Còpia oculta)',
      en: 'Bcc (Blind Carbon Copy)'
    },
    tooltip: {
      es: 'Copia de cortesía protegida: ningún otro destinatario verá esta dirección (clave para protección de datos).',
      ca: 'Còpia de cortesia protegida: cap altre destinatari veurà aquesta adreça (clau per a protecció de dades).',
      en: 'Protected copy: no other recipient will see this address (essential for data privacy).'
    },
    strategies: [
      {
        description: 'Boton CCO por aria-label exacto',
        query: root => queryByAriaLabel(root, ['Agregar CCO', 'Afegir CCO', 'Add Bcc', 'CCO', 'C/o', 'Bcc', 'BCC'])
      },
      {
        description: 'Boton o span por texto CCO / C/o / Bcc',
        query: root => queryByText(root, 'button, span[role="button"], label', ['CCO', 'C/o', 'Bcc', 'BCC'])
      },
      {
        description: 'Campo combobox CCO expandido',
        query: root => root.querySelector<HTMLElement>('div[role="combobox"][aria-label*="CCO" i], div[role="combobox"][aria-label*="C/o" i], div[role="combobox"][aria-label*="Bcc" i], input[aria-label*="CCO" i]')
      }
    ]
  },

  createFolder: {
    name: 'Crear carpeta',
    elementKey: 'createFolder',
    labels: {
      es: 'Crear carpeta nueva',
      ca: 'Crear carpeta nova',
      en: 'Create new folder'
    },
    tooltip: {
      es: 'Crea una carpeta nueva para clasificar proyectos, cursos o asuntos.',
      ca: 'Crea una carpeta nova per classificar projectes, cursos o assumptes.',
      en: 'Create a new folder to categorize projects, courses, or subjects.'
    },
    strategies: [
      {
        description: 'Boton nueva carpeta por aria-label',
        query: root => queryByAriaLabel(root, ['Nueva carpeta', 'Nova carpeta', 'New folder', 'Crear carpeta'])
      },
      {
        description: 'Texto Crear nueva carpeta',
        query: root => queryByText(root, 'button, span', ['Nueva carpeta', 'Nova carpeta', 'New folder'])
      }
    ]
  },

  moveTo: {
    name: 'Mover a carpeta',
    elementKey: 'moveTo',
    labels: {
      es: 'Mover a carpeta',
      ca: 'Moure a carpeta',
      en: 'Move to folder'
    },
    tooltip: {
      es: 'Mueve el mensaje seleccionado a la carpeta que elijas.',
      ca: 'Mou el missatge seleccionat a la carpeta que tries.',
      en: 'Move the selected message to your chosen folder.'
    },
    strategies: [
      {
        description: 'Boton mover aria-label',
        query: root => queryByAriaLabel(root, ['Mover a', 'Mou a', 'Move to', 'Mover', 'Mou'])
      }
    ]
  },

  markRead: {
    name: 'Marcar leído/no leído',
    elementKey: 'markRead',
    labels: {
      es: 'Marcar como leído / no leído',
      ca: 'Marcar com a llegit / no llegit',
      en: 'Mark as read / unread'
    },
    tooltip: {
      es: 'Cambia el estado de lectura del correo para recordar revisarlo más tarde.',
      ca: 'Canvia l’estat de lectura del correu per recordar revisar-lo més tard.',
      en: 'Toggle read state to remember to check it later.'
    },
    strategies: [
      {
        description: 'Boton marcar como leido aria-label',
        query: root => queryByAriaLabel(root, ['Marcar como leído', 'Marcar como no leído', 'Marca com a llegit', 'Mark as read', 'Mark as unread'])
      }
    ]
  },

  flag: {
    name: 'Marcar con marca de seguimiento',
    elementKey: 'flag',
    labels: {
      es: 'Marcar con bandera / Seguimiento',
      ca: 'Marcar amb bandera / Seguiment',
      en: 'Flag / Follow up'
    },
    tooltip: {
      es: 'Destaca este correo como pendiente de seguimiento o tarea prioritaria.',
      ca: 'Destaca aquest correu com a pendent de seguiment o tasca prioritària.',
      en: 'Highlights this email as an urgent task or item to follow up.'
    },
    strategies: [
      {
        description: 'Boton marcar seguimiento aria-label',
        query: root => queryByAriaLabel(root, ['Marcar con marca de seguimiento', 'Marca de seguiment', 'Flag', 'Marcar'])
      }
    ]
  },

  filter: {
    name: 'Filtrar mensajes',
    elementKey: 'filter',
    labels: {
      es: 'Filtros de mensajes',
      ca: 'Filtres de missatges',
      en: 'Message filters'
    },
    tooltip: {
      es: 'Filtra rápidamente por no leídos, marcados, menciones o archivos adjuntos.',
      ca: 'Filtra ràpidament per no llegits, marcats, mencions o fitxers adjunts.',
      en: 'Quickly filter by unread, flagged, mentions, or attachments.'
    },
    strategies: [
      {
        description: 'Boton filtrar aria-label',
        query: root => queryByAriaLabel(root, ['Filtrar', 'Filtre', 'Filter', 'Filtros'])
      }
    ]
  },

  categories: {
    name: 'Categorías',
    elementKey: 'categories',
    labels: {
      es: 'Categorías de colores',
      ca: 'Categories de colors',
      en: 'Categories'
    },
    tooltip: {
      es: 'Asigna etiquetas de color para agrupar mensajes por temas o proyectos.',
      ca: 'Assigna etiquetes de color per agrupar missatges per temes o projectes.',
      en: 'Assign color tags to group messages by topic or project.'
    },
    strategies: [
      {
        description: 'Boton categorizar aria-label',
        query: root => queryByAriaLabel(root, ['Categorizar', 'Categoritzar', 'Categorize', 'Categorías', 'Categories'])
      }
    ]
  },

  settings: {
    name: 'Configuración',
    elementKey: 'settings',
    labels: {
      es: 'Configuración de Outlook',
      ca: 'Configuració d’Outlook',
      en: 'Outlook Settings'
    },
    tooltip: {
      es: 'Ajustes de cuenta, firmas, reglas automáticas y temas visuales.',
      ca: 'Ajustos de compte, signatures, regles automàtiques i temes visuals.',
      en: 'Account settings, signatures, automatic rules, and visual themes.'
    },
    strategies: [
      {
        description: 'Boton settings ID O365',
        query: root => root.querySelector<HTMLElement>('button#O365_MainLink_Settings, button#settingsButton')
      },
      {
        description: 'Boton settings aria-label',
        query: root => queryByAriaLabel(root, ['Configuración', 'Configuració', 'Settings'])
      }
    ]
  },

  calendar: {
    name: 'Calendario',
    elementKey: 'calendar',
    labels: {
      es: 'Calendario',
      ca: 'Calendari',
      en: 'Calendar'
    },
    tooltip: {
      es: 'Acceso directo a tu agenda escolar y eventos.',
      ca: 'Accés directe a la teua agenda escolar i esdeveniments.',
      en: 'Direct access to your school calendar and events.'
    },
    strategies: [
      {
        description: 'Boton o enlace calendario en app bar',
        query: root => queryByAriaLabel(root, ['Calendario', 'Calendari', 'Calendar'])
      }
    ]
  },

  contacts: {
    name: 'Contactos / Personas',
    elementKey: 'contacts',
    labels: {
      es: 'Contactos / Personas',
      ca: 'Contactes / Persones',
      en: 'Contacts / People'
    },
    tooltip: {
      es: 'Directorio de docentes, alumnado y listas de contactos.',
      ca: 'Directori de docents, alumnat i llistes de contactes.',
      en: 'Directory of teachers, students, and contact lists.'
    },
    strategies: [
      {
        description: 'Boton o enlace contactos en app bar',
        query: root => queryByAriaLabel(root, ['Contactos', 'Contactes', 'Personas', 'Persones', 'People'])
      }
    ]
  },

  appNav: {
    name: 'Barra lateral de aplicaciones',
    elementKey: 'appNav',
    labels: {
      es: 'Barra lateral de apps M365',
      ca: 'Barra lateral d’aplicacions M365',
      en: 'M365 Apps navigation bar'
    },
    strategies: [
      {
        description: 'Left rail container',
        query: root => root.querySelector<HTMLElement>('div#LeftRail, div[data-automation-id="leftRail"], nav[aria-label*="Aplicaciones" i], nav[aria-label*="Apps" i]')
      }
    ]
  },

  meetNow: {
    name: 'Reunirse ahora (Meet Now)',
    elementKey: 'meetNow',
    labels: {
      es: 'Reunirse ahora',
      ca: 'Reunió ara',
      en: 'Meet now'
    },
    strategies: [
      {
        description: 'Boton Meet now aria-label',
        query: root => queryByAriaLabel(root, ['Reunirse ahora', 'Reunió ara', 'Meet now', 'Meet'])
      }
    ]
  },

  copilot: {
    name: 'Copilot',
    elementKey: 'copilot',
    labels: {
      es: 'Copilot',
      ca: 'Copilot',
      en: 'Copilot'
    },
    strategies: [
      {
        description: 'Boton o panel Copilot',
        query: root => queryByAriaLabel(root, ['Copilot', 'Microsoft Copilot'])
      }
    ]
  },

  adsOrPromos: {
    name: 'Banners o publicidad',
    elementKey: 'adsOrPromos',
    labels: {
      es: 'Banners promocionales',
      ca: 'Bàners promocionals',
      en: 'Promotional banners'
    },
    strategies: [
      {
        description: 'Contenedor publicidad',
        query: root => root.querySelector<HTMLElement>('div[data-automation-id="advertisementContainer"], div[id*="adContainer"], div[aria-label*="Publicidad" i], div[aria-label*="Publicitat" i]')
      }
    ]
  },

  helpButton: {
    name: 'Botón de ayuda',
    elementKey: 'helpButton',
    labels: {
      es: 'Ayuda',
      ca: 'Ajuda',
      en: 'Help'
    },
    strategies: [
      {
        description: 'Boton ayuda top header',
        query: root => queryByAriaLabel(root, ['Ayuda', 'Ajuda', 'Help'])
      }
    ]
  },

  myDay: {
    name: 'Mi día',
    elementKey: 'myDay',
    labels: {
      es: 'Mi día',
      ca: 'El meu dia',
      en: 'My Day'
    },
    strategies: [
      {
        description: 'Boton Mi dia aria-label',
        query: root => queryByAriaLabel(root, ['Mi día', 'El meu dia', 'My Day'])
      }
    ]
  },

  ribbonSecondary: {
    name: 'Acciones secundarias de cinta',
    elementKey: 'ribbonSecondary',
    labels: {
      es: 'Comandos secundarios',
      ca: 'Comandaments secundaris',
      en: 'Secondary ribbon actions'
    },
    strategies: [
      {
        description: 'Grupo secundario de la cinta',
        query: root => root.querySelector<HTMLElement>('div[data-automation-id="ribbonOverflowButton"]')
      }
    ]
  }
};

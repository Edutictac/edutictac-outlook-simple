import { DidacticTopic, TutorialTopicId } from '../types';

export const DIDACTIC_TOPICS: Record<TutorialTopicId, DidacticTopic> = {
  'basic-mail': {
    id: 'basic-mail',
    title: {
      es: 'Correo básico',
      ca: 'Correu bàsic',
      en: 'Basic Email'
    },
    summary: {
      es: 'Conoce los elementos principales: bandeja de entrada, lectura y nuevo correo.',
      ca: 'Coneix els elements principals: safata d’entrada, lectura i missatge nou.',
      en: 'Learn core elements: inbox, reading pane, and new mail button.'
    },
    steps: [
      {
        elementKey: 'inbox',
        title: {
          es: 'Bandeja de entrada',
          ca: "Safata d'entrada",
          en: 'Inbox'
        },
        description: {
          es: 'Aquí recibes todos tus mensajes diarios.',
          ca: 'Ací reps tots els teus missatges diaris.',
          en: 'All incoming daily messages arrive here.'
        }
      },
      {
        elementKey: 'newMail',
        title: {
          es: 'Nuevo correo',
          ca: 'Missatge nou',
          en: 'New mail'
        },
        description: {
          es: 'Pulsa aquí para empezar a redactar un correo.',
          ca: 'Prem ací per començar a redactar un correu.',
          en: 'Click here to compose an email.'
        }
      },
      {
        elementKey: 'search',
        title: {
          es: 'Búsqueda rápida',
          ca: 'Cerca ràpida',
          en: 'Quick search'
        },
        description: {
          es: 'Encuentra cualquier correo por nombre o palabra clave.',
          ca: 'Troba qualsevol correu per nom o paraula clau.',
          en: 'Find any email by sender or keyword.'
        }
      }
    ]
  },

  'compose': {
    id: 'compose',
    title: {
      es: 'Redactar un mensaje',
      ca: 'Redactar un missatge',
      en: 'Compose a message'
    },
    summary: {
      es: 'Cómo iniciar la redacción y los campos esenciales.',
      ca: 'Com iniciar la redacció i els camps essencials.',
      en: 'How to start composing and use essential fields.'
    },
    steps: [
      {
        elementKey: 'newMail',
        title: {
          es: 'Botón Nuevo correo',
          ca: 'Botó Missatge nou',
          en: 'New mail button'
        },
        description: {
          es: 'Abre la ventana de redacción.',
          ca: 'Obri la finestra de redacció.',
          en: 'Opens the compose window.'
        },
        focus: true
      },
      {
        elementKey: 'recipientTo',
        title: {
          es: 'Campo Para',
          ca: 'Camp Per a',
          en: 'To field'
        },
        description: {
          es: 'Escribe la dirección de la persona destinataria.',
          ca: 'Escriu l’adreça de la persona destinatària.',
          en: 'Enter the recipient’s email address.'
        }
      },
      {
        elementKey: 'send',
        title: {
          es: 'Botón Enviar',
          ca: 'Botó Enviar',
          en: 'Send button'
        },
        description: {
          es: 'Envía el correo redactado.',
          ca: 'Envia el correu redactat.',
          en: 'Sends the composed message.'
        }
      }
    ]
  },

  'cc-bcc': {
    id: 'cc-bcc',
    title: {
      es: 'Para, CC y CCO (Copia y Copia Oculta)',
      ca: 'Per a, CC i CCO (Còpia i Còpia Oculta)',
      en: 'To, Cc and Bcc'
    },
    summary: {
      es: 'Diferencia el envío normal, informativo y protegido para protección de datos.',
      ca: 'Diferencia l’enviament normal, informatiu i protegit per a protecció de dades.',
      en: 'Understand normal, informative, and private recipients.'
    },
    steps: [
      {
        elementKey: 'recipientTo',
        title: {
          es: 'Para: Destinatarios directos',
          ca: 'Per a: Destinataris directes',
          en: 'To: Direct recipients'
        },
        description: {
          es: 'Personas que deben responder o actuar respecto al contenido.',
          ca: 'Persones que han de respondre o actuar respecte al contingut.',
          en: 'People who must act or reply to the email.'
        }
      },
      {
        elementKey: 'recipientCc',
        title: {
          es: 'CC: En copia (visible)',
          ca: 'CC: En còpia (visible)',
          en: 'Cc: Carbon copy (visible)'
        },
        description: {
          es: 'Envía una copia informativa. Todos los destinatarios ven esta dirección.',
          ca: 'Envia una còpia informativa. Tots els destinataris veuen aquesta adreça.',
          en: 'Informative copy. All recipients can see this email.'
        }
      },
      {
        elementKey: 'recipientBcc',
        title: {
          es: 'CCO: Copia oculta (privada)',
          ca: 'CCO: Còpia oculta (privada)',
          en: 'Bcc: Blind carbon copy'
        },
        description: {
          es: '¡Obligatorio para envíos a múltiples familias o alumnos! Nadie más ve estas direcciones.',
          ca: 'Obligatori per a enviaments a múltiples famílies o alumnat! Ningú més veu aquestes adreces.',
          en: 'Essential for privacy: no other recipient can see these addresses.'
        },
        focus: true
      }
    ]
  },

  'attachments': {
    id: 'attachments',
    title: {
      es: 'Adjuntar archivos',
      ca: 'Adjuntar fitxers',
      en: 'Attach files'
    },
    summary: {
      es: 'Cómo añadir documentos PDF, imágenes o enlaces de OneDrive al correo.',
      ca: 'Com afegir documents PDF, imatges o enllaços de OneDrive al correu.',
      en: 'How to attach PDF documents, images, or OneDrive links.'
    },
    steps: [
      {
        elementKey: 'attach',
        title: {
          es: 'Icono del clip / Adjuntar',
          ca: 'Icona del clip / Adjuntar',
          en: 'Paperclip icon / Attach'
        },
        description: {
          es: 'Selecciona archivos desde tu equipo o desde tu nube educativa.',
          ca: 'Tria fitxers des del teu equip o des del núvol educatiu.',
          en: 'Choose files from your computer or cloud drive.'
        },
        focus: true
      }
    ]
  },

  'reply': {
    id: 'reply',
    title: {
      es: 'Responder a un mensaje',
      ca: 'Respondre a un missatge',
      en: 'Reply to message'
    },
    summary: {
      es: 'Responder únicamente a la persona que te escribió.',
      ca: 'Respondre únicament a la persona que et va escriure.',
      en: 'Reply only to the original sender.'
    },
    steps: [
      {
        elementKey: 'reply',
        title: {
          es: 'Responder',
          ca: 'Respondre',
          en: 'Reply'
        },
        description: {
          es: 'Escribe tu respuesta solo al remitente original.',
          ca: 'Escriu la resposta només al remitent original.',
          en: 'Write your response only to the original sender.'
        }
      }
    ]
  },

  'reply-all': {
    id: 'reply-all',
    title: {
      es: 'Responder a todos',
      ca: 'Respondre a tots',
      en: 'Reply all'
    },
    summary: {
      es: 'Cuándo y cómo enviar la respuesta a todo el grupo o claustro.',
      ca: 'Quan i com enviar la resposta a tot el grup o claustre.',
      en: 'When and how to reply to everyone in the thread.'
    },
    steps: [
      {
        elementKey: 'replyAll',
        title: {
          es: 'Responder a todos',
          ca: 'Respondre a tots',
          en: 'Reply all'
        },
        description: {
          es: '¡Úsalo con precaución! Tu mensaje llegará a todas las personas en copia.',
          ca: 'Fes-lo servir amb precaució! El teu missatge arribarà a tothom en còpia.',
          en: 'Use carefully: sends your reply to everyone copied.'
        },
        focus: true
      }
    ]
  },

  'forward': {
    id: 'forward',
    title: {
      es: 'Reenviar',
      ca: 'Reenviar',
      en: 'Forward'
    },
    summary: {
      es: 'Pasar una copia del correo a otra persona no incluida originalmente.',
      ca: 'Passar una còpia del correu a una altra persona no inclosa originalment.',
      en: 'Pass an email copy to a new person.'
    },
    steps: [
      {
        elementKey: 'forward',
        title: {
          es: 'Reenviar',
          ca: 'Reenviar',
          en: 'Forward'
        },
        description: {
          es: 'Reenvía el mensaje completo con sus adjuntos.',
          ca: 'Reenvia el missatge complet amb els seus adjunts.',
          en: 'Forwards the entire message with attachments.'
        }
      }
    ]
  },

  'search': {
    id: 'search',
    title: {
      es: 'Buscar mensajes',
      ca: 'Cercar missatges',
      en: 'Search messages'
    },
    summary: {
      es: 'Encontrar correos antiguos rápidamente con filtros y términos.',
      ca: 'Trobar correus antics ràpidament amb filtres i termes.',
      en: 'Find old emails quickly with keywords and filters.'
    },
    steps: [
      {
        elementKey: 'search',
        title: {
          es: 'Caja de búsqueda superior',
          ca: 'Caixa de cerca superior',
          en: 'Top search bar'
        },
        description: {
          es: 'Escribe un nombre, apellido o asunto para localizar correos al instante.',
          ca: 'Escriu un nom, cognom o assumpte per localitzar correus a l’instant.',
          en: 'Type a name, surname, or subject to find emails instantly.'
        },
        focus: true
      }
    ]
  },

  'folders': {
    id: 'folders',
    title: {
      es: 'Organizar con carpetas',
      ca: 'Organitzar amb carpetes',
      en: 'Organize with folders'
    },
    summary: {
      es: 'Crear y gestionar carpetas por curso, materia o departamento.',
      ca: 'Crear i gestionar carpetes per curs, matèria o departament.',
      en: 'Create and manage folders by course, subject, or department.'
    },
    steps: [
      {
        elementKey: 'createFolder',
        title: {
          es: 'Nueva carpeta',
          ca: 'Nova carpeta',
          en: 'New folder'
        },
        description: {
          es: 'Crea una carpeta con el nombre de tu grupo o proyecto.',
          ca: 'Crea una carpeta amb el nom del teu grup o projecte.',
          en: 'Create a folder with your group or project name.'
        }
      },
      {
        elementKey: 'moveTo',
        title: {
          es: 'Mover a carpeta',
          ca: 'Moure a carpeta',
          en: 'Move to folder'
        },
        description: {
          es: 'Arrastra el mensaje o usa el botón Mover.',
          ca: 'Arrossega el missatge o fes servir el botó Moure.',
          en: 'Drag the message or use the Move button.'
        }
      }
    ]
  },

  'archive': {
    id: 'archive',
    title: {
      es: 'Archivar correos',
      ca: 'Arxivar correus',
      en: 'Archive emails'
    },
    summary: {
      es: 'Despejar la bandeja de entrada sin borrar mensajes importantes.',
      ca: 'Aclarir la safata d’entrada sense esborrar missatges importants.',
      en: 'Clear your inbox without deleting important emails.'
    },
    steps: [
      {
        elementKey: 'archiveFolder',
        title: {
          es: 'Carpeta de Archivo',
          ca: 'Carpeta d’Arxiu',
          en: 'Archive folder'
        },
        description: {
          es: 'Mueve aquí los correos ya tramitados que quieras conservar.',
          ca: 'Mou ací els correus ja tramitats que vulgues conservar.',
          en: 'Move processed emails you want to keep here.'
        }
      }
    ]
  },

  'filters': {
    id: 'filters',
    title: {
      es: 'Filtros rápidos',
      ca: 'Filtres ràpids',
      en: 'Quick filters'
    },
    summary: {
      es: 'Ver solo mensajes no leídos, con archivos o marcados.',
      ca: 'Veure només missatges no llegits, amb fitxers o marcats.',
      en: 'View only unread, attachment, or flagged emails.'
    },
    steps: [
      {
        elementKey: 'filter',
        title: {
          es: 'Menú de filtros',
          ca: 'Menú de filtres',
          en: 'Filters menu'
        },
        description: {
          es: 'Filtra la lista con un solo clic.',
          ca: 'Filtra la llista amb un sol clic.',
          en: 'Filter the list with a single click.'
        }
      }
    ]
  },

  'categories': {
    id: 'categories',
    title: {
      es: 'Categorías de colores',
      ca: 'Categories de colors',
      en: 'Color categories'
    },
    summary: {
      es: 'Etiquetar correos visualmente por departamentos o prioridades.',
      ca: 'Etiquetar correus visualment per departaments o prioritats.',
      en: 'Tag emails visually by department or priority.'
    },
    steps: [
      {
        elementKey: 'categories',
        title: {
          es: 'Categorías',
          ca: 'Categories',
          en: 'Categories'
        },
        description: {
          es: 'Asigna colores a tus mensajes para identificarlos de un vistazo.',
          ca: 'Assigna colors als teus missatges per identificar-los d’una ullada.',
          en: 'Assign colors to your emails to identify them at a glance.'
        }
      }
    ]
  },

  'rules': {
    id: 'rules',
    title: {
      es: 'Reglas de correo',
      ca: 'Regles de correu',
      en: 'Mail rules'
    },
    summary: {
      es: 'Automatizar el movimiento de correos entrantes a sus carpetas.',
      ca: 'Automatitzar el moviment de correus entrants a les seues carpetes.',
      en: 'Automate moving incoming emails to specific folders.'
    },
    steps: [
      {
        elementKey: 'settings',
        title: {
          es: 'Configuración > Reglas',
          ca: 'Configuració > Regles',
          en: 'Settings > Rules'
        },
        description: {
          es: 'Crea reglas automáticas para correos de secretaría, Aules o avisos del centro.',
          ca: 'Crea regles automàtiques per a correus de secretaria, Aules o avisos del centre.',
          en: 'Create automatic rules for notices, admin, or learning platforms.'
        }
      }
    ]
  },

  'signature': {
    id: 'signature',
    title: {
      es: 'Firma de correo',
      ca: 'Signatura de correu',
      en: 'Email signature'
    },
    summary: {
      es: 'Configurar tu firma institucional docente.',
      ca: 'Configurar la teua signatura institucional docent.',
      en: 'Set up your educational institutional signature.'
    },
    steps: [
      {
        elementKey: 'settings',
        title: {
          es: 'Configuración de firmas',
          ca: 'Configuració de signatures',
          en: 'Signatures setting'
        },
        description: {
          es: 'Añade tu nombre, cargo y centro educativo a todos tus envíos.',
          ca: 'Afegeix el teu nom, càrrec i centre educatiu a tots els teus enviaments.',
          en: 'Add your name, role, and school name to outgoing emails.'
        }
      }
    ]
  },

  'calendar': {
    id: 'calendar',
    title: {
      es: 'Calendario escolar',
      ca: 'Calendari escolar',
      en: 'School calendar'
    },
    summary: {
      es: 'Ver reuniones, claustros y sesiones de evaluación.',
      ca: 'Veure reunions, claustres i sessions d’avaluació.',
      en: 'View staff meetings, sessions, and school events.'
    },
    steps: [
      {
        elementKey: 'calendar',
        title: {
          es: 'Acceso a Calendario',
          ca: 'Accés a Calendari',
          en: 'Calendar access'
        },
        description: {
          es: 'Cambia entre tu correo y la vista de calendario.',
          ca: 'Canvia entre el teu correu i la vista de calendari.',
          en: 'Switch between email and calendar views.'
        }
      }
    ]
  }
};

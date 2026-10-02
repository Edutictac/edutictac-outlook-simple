# EduTicTac Outlook Simple

> **Capa visual i didàctica per simplificar la interfície real d'Outlook a la web durant sessions de formació docent.**

`EduTicTac Outlook Simple` és una extensió de navegador (Manifest V3) dissenyada específicament per a la formació del professorat i personal de centres educatius en l'ús del correu institucional de Microsoft 365.

El seu objectiu és reduir dràsticament la sobrecàrrega visual d'Outlook web, destacar els elements clau de cada sessió i acompanyar l'alumnat i docents amb explicacions didàctiques contextuals, **sense substituir Outlook, sense intermediar credencials i sense accedir a les bústies mitjançant APIs**.

---

## 🎯 Què fa?

* **Simplifica visualment la interfície nativa:** Permet commutar entre diferents nivells de complexitat (*Bàsic*, *Organització*, *Avançat* i *Original*).
* **Destaca controls essencials:** Aplica un halo visual i etiquetes als botons pertinents segons el tema de la sessió (per exemple: botó *Missatge nou*, *Per a*, *CC*, *CCO*, *Adjuntar* o *Cerca*).
* **Ajudes didàctiques contextuals:** Mostra targetes explicatives clares directament al costat de cada control rellevant (per exemple, explicant la diferència clau entre *CC* i *CCO* per a la protecció de dades).
* **Mode presentació (Projector):** Augmenta el contrast i ressalta visualment els elements amb un pols cridaner, visible amb claredat des del fons de l'aula de formació.
* **Barra docent flotant i navegació pas a pas:** Permet avançar de manera guiada (`[◀ Anterior]` i `[Següent ▶]`) pels controls de cada lliçó directament des de la pantalla.
* **Mode focus:** Permet atenuar la resta de la interfície per centrar tota l'atenció en un únic component.
* **Restauració instantània:** Permet tornar al 100% de la interfície d'Outlook original amb un sol clic o amb la drecera `Alt + O`.

---

## 🛡️ Què NO fa? (Privacitat i Seguretat)

* ❌ **NO intercepta contrasenyes ni credencials.**
* ❌ **NO emmagatzema ni llig el contingut dels teus correus electrònics.**
* ❌ **NO realitza crides a Microsoft Graph ni a servidors externs.**
* ❌ **NO inclou analítica, rastrejadors (*trackers*) ni telemetria.**
* ❌ **NO modifica el funcionament de la bústia:** l'enviament, recepció i autenticació els gestiona exclusivament Microsoft Outlook de manera oficial.

---

## 🚀 Nivells d'Interfície

1. **⚪ Outlook Original:** Restaura la interfície nativa de Microsoft al 100% d'immediat.
2. **🟢 Bàsic:** Deixa visibles només els controls imprescindibles per a una primera sessió (*Missatge nou*, *Safata d'entrada*, *Elements enviats*, *Esborranys*, *Elements suprimits*, *Cerca*, *Llista de missatges*, *Panell de lectura*, *Respondre*, *Reenviar*, *Adjuntar*, *Per a*, *CC*, *CCO* i *Enviar*).
3. **📁 Organització:** Afig la gestió de carpetes, moure, arxivar, marcar com a llegit/no llegit, marques de seguiment, filtres ràpids, categories de colors, calendari i contactes.
4. **⚡ Avançat:** Manté tota la interfície d'Outlook visible per treballar amb regles, signatures i ajustos, mantenint el sistema d'ajudes i ressaltat didàctic.

---

## 📚 Temes didàctics inclosos

1. **Correu bàsic** (Safata d'entrada i lectura de missatges)
2. **Redactar un missatge** (Missatge nou i enviament)
3. **Per a, CC i CCO** (Diferències pedagògiques i privacitat de dades)
4. **Adjuntar fitxers** (Documents i OneDrive)
5. **Respondre a un missatge**
6. **Respondre a tots**
7. **Reenviar correu**
8. **Cercar missatges**
9. **Organitzar amb carpetas**
10. **Arxivar correus**
11. **Filtres ràpids** (No llegits, marcats)
12. **Categories de colors**
13. **Regles automàtiques**
14. **Configuració de signatura**
15. **Calendari escolar**

---

## ⌨️ Dreceres de teclat per al formador

* `Alt + P`: Activa / desactiva el **Mode Projector** (alta visibilitat).
* `Alt + O`: **Restaura l'Outlook Original**.
* `Alt + B`: Commuta al **Mode Bàsic**.
* `Alt + →` / `Alt + ←`: Avança o retrocedeix al següent pas didàctic del tema actiu.
* `Escape`: Ix del mode focus.

---

## 🌐 Compatibilitat lingüística

Suporta i detecta automàticament les interfícies d'Outlook en:
* **Valencià / Català**
* **Castellà**
* **English**

---

## 📦 Instal·lació

Consulta la guia detallada pas a pas en [INSTALL.md](INSTALL.md).

També pots compilar el paquet zip per a instal·lació directa executant:
```bash
npm run package
```

---

## 📄 Llicència

Projecte de programari lliure publicat sota llicència **MIT** per la comunitat **EduTicTac**.
*Avís: Aquest és un projecte pedagògic independent de programari lliure i no és un producte oficial de Microsoft Corporation.*

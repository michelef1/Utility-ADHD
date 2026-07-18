# Utility ADHD

App PWA in italiano per la gestione quotidiana con ADHD: attività, focus timer, abitudini, obiettivi, umore.

## Pubblicazione su GitHub Pages

1. Crea un repository su GitHub chiamato **esattamente** `Utility-ADHD` (maiuscole/minuscole comprese).
   - Se usi un nome diverso, devi aggiornare tutti i path che contengono `/Utility-ADHD/` in:
     - `manifest.json` (`start_url`, `scope`, `src` delle icone)
     - `service-worker.js` (costante `REPO` in cima al file)
2. Carica questi file mantenendo esattamente questa struttura:

```
Utility-ADHD/
├── index.html
├── manifest.json
├── service-worker.js
├── README.md
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-512-maskable.png
    └── apple-touch-icon.png
```

   ⚠️ **Le icone PNG devono stare dentro la cartella `icons/`**, non nella root del repo — è l'errore più comune che causa icone mancanti o 404 su Android.

3. Vai su **Settings → Pages** nel repository, e imposta il branch (es. `main`) e la cartella (`/root`) come sorgente.
4. L'app sarà raggiungibile su `https://<tuo-username>.github.io/Utility-ADHD/`.
5. Apri il link da telefono → menu del browser → **"Aggiungi a schermata Home"** per installarla come app.

## Note tecniche

- Tutti i dati (attività, abitudini, obiettivi, umore, impostazioni) sono salvati solo in `localStorage`, nel browser dell'utente. Nessun server, nessun account.
- Il service worker mette in cache i file principali per il funzionamento offline. Se aggiorni `index.html`, incrementa `CACHE_NAME` in `service-worker.js` (es. `utility-adhd-v2`) così gli utenti ricevono la nuova versione.
- La funzione "Spezza in passi con l'AI" richiama l'API di Claude: funziona quando l'app gira dentro l'ambiente artifact di Claude.ai. Se il file viene aperto/pubblicato fuori da quell'ambiente e la chiamata fallisce, l'app usa automaticamente una scomposizione locale di riserva.

---
Creata da Miki × Claude

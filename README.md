# **Esercizio:** Setup Web App Express

È ora di mettere alla prova le vostre conoscenze iniziando a costruire la vostra prima app completa!

### Comandi da eseguire nel terminale per inizializzare il progetto dopo averlo scaricato (lato server):


    npm init -y    --> installa npm
    npm i express  --> installa express
    npm i mysql2   --> si collega al db su mySql
    npm i cors     --> autorizza accesso a porte specifiche tramite browser
    npm i multer   --> permette di aggiungere file al db
    npm i slugify  --> gestione dinamica slug
Per startare il server:

    npm run dev

Se tutto funziona, dovrebbero apparire i seguenti messaggi nel terminale:
- sono un server attivo sulla porta 3000 (o la vostra porta impostata)
- MySQL server connected

---
## Consegna Day 1

- Utilizzando il file in allegato, creiamo un database con MySQL Workbench
- Creiamo una nuova applicazione Express
- Colleghiamo l’app al db e verifichiamo che tutto funzioni
- Prepariamo una rotta `index` per ottenere la lista dei film
- Prepariamo una rotta `show` per ottenere i dettagli di un singolo film e le sue recensioni

---
### *Bonus*
- Inserire delle immagini nel progetto express e dunque nel db
- Inserire i dati di connessione al database come variabili d’ambiente
- Inserire le vostre API in controller
- Inserire le vostre rotte in un router
- Inserire un middleware per le rotte inesistenti
- Inserire un middleware per la gestione errori

---
### *Bonus Bonus*
- Restituire nella rotta `index` anche la media delle recensioni dei vostri film

---

## Consegna Day 2-3 --> Setup Web App React 

Vedi README di webapp-react

---
## Consegna Day 4

## MILESTONE BACKEND
Predisponiamo un’API per salvare nel database una nuova recensione legata ad un film
Testiamola su postman e verifichiamo che nel DB venga effettivamente inserita una nuova recensione

---
### *Bonus*
Provate a creare un nuovo film con upload immagine ``multer``

---
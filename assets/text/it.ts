import AppText from "./interface";

const it: AppText = {
  internetConnectionPage: {
    title: "Disconnesso!",
    message:
      "...sembra che tu non sia connesso a Internet. Questa app richiede una connessione Internet stabile...",
  },
  console: {
    heading: "Console",
    start: "Avvia",
    targetDetails: {
      heading: "Informazioni sul tentativo",
      timedOut: "tempo scaduto!",
      accepted: "Risposte accettate:",
      description:
        "Pensi che la tua risposta dovesse essere accettata? Puoi segnalare questa parola per revisione e la esamineremo il prima possibile.",
      buttonTitle:
        "Premi e tieni premuto per segnalare la parola e rimuoverla dalle parole raccolte.",
      successResponse:
        "Questa parola è stata segnalata per revisione e rimossa dalla tua collezione. \n \n Grazie per il tuo aiuto!",
      failedResponse:
        "...qualcosa è andato storto 😣 per favore controlla la tua connessione Internet e riprova...",
      userResponse: "La tua risposta:",
    },
    editTicketScreen: {
      subHeading:
        "Salva nuove soluzioni personalizzate per questa parola",
      solutionName: "Soluzione",
      save: "Salva",
      message: "Nuove soluzioni aggiunte!",
    },
    help: {
      heading: "Aiuto",
      howToPlay: {
        title: "Come giocare",
        description:
          "Scrivi le parole in inglese così come vengono presentate.",
      },
      gameDescription: {
        title: "Il gioco",
        description:
          "Questo gioco per l'apprendimento delle lingue utilizza la ripetizione strutturata per insegnarti nuove parole. L'app apprenderà le tue capacità e presenterà le parole più comuni che probabilmente non conosci ancora. La nostra filosofia è espandere il vocabolario degli studenti il più rapidamente possibile.",
      },
      giveUp: {
        title: "Arrenditi!",
        description:
          "Per arrenderti e vedere subito le soluzioni, inserisci semplicemente un valore vuoto.",
      },
      dueToday: {
        title: "In scadenza oggi",
        description:
          "Queste sono le parole che devi rivedere oggi. Le parole si accumulano rapidamente se salti i giorni, quindi cerca di restare al passo.",
      },
      steps: {
        title: "Passi fatti oggi",
        description:
          "I tuoi passi rappresentano il numero di tentativi fatti con una parola. È un parametro utile per impostare obiettivi giornalieri.",
      },
      time: {
        title: "Tempo di gioco",
        description:
          "Questo è semplicemente il tempo che hai trascorso giocando oggi. È un timer attivo e si ferma quando smetti di interagire con la console!",
      },
      streak: {
        title: "La tua serie",
        description:
          "La tua serie rappresenta quante parole hai indovinato di seguito oggi.",
      },
      listen: {
        title: "Modalità ascolto",
        description:
          "Puoi scegliere se giocare con o senza audio. Ti consigliamo di giocare con il suono quando possibile, ma comprendiamo che a volte potrebbe non essere un'opzione. Usa questa icona per alternare tra le opzioni.",
      },
      read: {
        title: "Modalità solo audio",
        description:
          "Puoi anche giocare solo con l'audio, nascondendo la parola. Questo approccio è consigliato, poiché aiuta a evitare errori di pronuncia! Usa questa icona per alternare tra le opzioni.",
      },
      countdown: {
        title: "Modalità conto alla rovescia",
        description:
          "Puoi scegliere se giocare con o senza il timeout di 10 secondi. Il tempo sarà comunque contato, ma non sarai obbligato a inviare risposte errate dopo 10 secondi. Usa questa icona per alternare tra le opzioni.",
      },
    },
    statsMessages: {
      "basket-fill": "Nuove parole raccolte",
      target: "Parole rimanenti in scadenza oggi",
      "foot-print": "Passi fatti",
      "clock-outline": "Tempo di gioco",
      "trophy-variant": "Serie",
      sound: "Riattiva l'ascolto per sentire le parole",
    },
  },
  collection: {
    heading: "Collezione",
    searchMessage: "Cerca parole raccolte",
    noWords: "Nessuna parola contenente queste lettere",
    today: "oggi",
    tomorrow: "domani",
    statistics: {
      heading: "Statistiche",
      description:
        'Il "Livello" di una parola rappresenta quante volte hai indovinato quella parola. Dopo aver raccolto parole di livelli diversi, questa pagina mostrerà una suddivisione di quante parole hai a ogni livello.',
    },
    progressScreen: {
      congratulations: "Congratulazioni!",
      collected: {
        A: "Hai raccolto ",
        B: " nuove parole!",
      },
      textA: "La tua ",
      textB: " valutazione delle prestazioni è:",
      challenge:
        "Scarica questa app per l'apprendimento delle lingue e vedi se riesci a battere il mio punteggio!",
    },
    wordInfoScreen: {
      heading: "Descrizione",
      description:
        "Vuoi rimuovere definitivamente questa parola dalla tua collezione?",
      buttonTitle:
        "Premi e tieni premuto questo pulsante per eliminare questa parola dalla tua collezione",
      successResponse:
        "Questa parola è stata rimossa dalla tua collezione.",
      failedResponse:
        "...qualcosa è andato storto 😣 per favore controlla la tua connessione Internet e riprova...",
    },
    dictionaryLookupScreen: {
      heading: "Aggiungi Nuove Parole",
      searchMessage: "Cerca nel Dizionario",
      searchDictionary:
        "Qui puoi aggiungere altre parole dal nostro dizionario valutato.",
      noResults:
        "Nessun risultato contenente queste lettere",
      reminder:
        "Ricorda che, per efficienza, non includiamo variazioni della stessa parola e alcune parole potrebbero non essere disponibili. Se ritieni che una parola debba essere inclusa ma non lo è, contattaci.",
      wordAdded: "Nuova parola aggiunta alla raccolta:",
    },
  },
  options: {
    heading: "Opzioni",
    pressAndHold:
      "Premi e tieni premuto il pulsante di sicurezza rosso",
    setDailyGoal: {
      heading: "Obiettivo giornaliero",
      textA: "Obiettivo di tempo",
      textB: "Obiettivo nuove parole",
      textC: "Obiettivo passi",
      textD: "ripristina i valori predefiniti",
    },
    voiceSelection: {
      title: "Selezione della voce",
      textA:
        "La nostra app utilizza la voce preferita del tuo dispositivo.",
      textB:
        "Sia i dispositivi Android che iOS offrono una vasta gamma di opzioni vocali. Per cambiare la voce, vai nelle impostazioni e scegli quella che funziona meglio per te!",
      tip: "CONSIGLIO: Prova a cambiare la tua voce con l'accento più adatto a te. Ad esempio, lo spagnolo parlato in Messico suona molto diverso da quello parlato in Spagna. Scegli l'accento giusto per te!",
      accessSettings: "Impostazioni voce",
    },
    chooseDictionary: {
      title: "Seleziona dizionario",
      English: "Inglese",
      Spanish: "Spagnolo",
      Portuguese: "Portoghese",
      textA: "Attualmente offriamo due dizionari:",
      textB:
        "Molte app per l'apprendimento delle lingue cercano di offrire tutte le lingue immediatamente e sacrificano la qualità per la quantità. Anche se speriamo di offrire più corsi in futuro, ci stiamo attualmente concentrando sull'ottimizzazione di questi due dizionari.",
      dictionaryError:
        "Impossibile connettersi. Nessun dizionario disponibile.",
      changeHomeLanguage: "Cambia qui la tua lingua madre",
    },
    colorSchemeTitle: "Schema di colori",
    manageAccount: {
      title: "Gestione account",
      name: "Nome",
      email: "Email",
      homeLanguage: "Lingua madre",
      changeHomeLanguage: "Cambia la lingua madre",
      changeHomeLanguageWarning:
        "Questa è la tua lingua nativa e non dovrebbe essere cambiata regolarmente.\nCambiare questa lingua reimposterà il tuo account e tutti i dati di apprendimento.",
      continue: "Continua",
      languageAlreadySelected:
        "Questa è attualmente la tua lingua madre!",
      changeHomeLanguageDetails:
        "Per cambiare la lingua madre e reimpostare il tuo account, inserisci la password e premi e tieni premuto il pulsante rosso.",
      homeLanguageUpdated:
        "La tua lingua madre è stata aggiornata e i tuoi dati di apprendimento sono stati reimpostati.",
      subscription: "Abbonamento",
      save: "Salva",
      deleteAccount: "Elimina account",
      deleteAccountDetails:
        "Sei sicuro di voler eliminare permanentemente il tuo account e tutti i dati associati?\n\nPer eliminare il tuo account, inserisci la password e premi e tieni premuto il pulsante Elimina.",
      accountDeleted: "Il tuo account è stato eliminato!",
      usernameUpdated:
        "Il nome utente dell'account è stato aggiornato con successo",
      subscriptionPage: {
        heading: "Abbonamento",
        status: "Stato",
        subscribed: "Iscritto",
        notSubscribed: "Non iscritto",
        vipMessage: "VIP",
        vipExpires: "scade il ",
        yourSubscription: "Il tuo abbonamento",
        manage: "Gestisci",
        appStore: "App Store",
        playStore: "Play Store",
        subscribe: "Iscriviti",
      },
    },
    leaveAReview: {
      name: "Lascia una recensione",
    },
    contactUs: {
      name: "Contattaci",
      subject: "Richiesta generale",
    },
    logOut: {
      name: "Esci",
    },
  },
  auth: {
    titles: {
      signIn: "Accedi",
      signUp: "Registrati",
      lostPassword: "Password dimenticata",
      sendLink: "Invia link",
      next: "Avanti",
      goToSignIn: "Hai già un account? Accedi",
    },
    forms: {
      name: {
        trim: "Il nome manca!",
        min: "Il nome è troppo corto!",
        required: "Il nome è obbligatorio!",
        label: "Nome",
        placeholder: "Il tuo nome",
      },
      email: {
        trim: "L'email manca!",
        email: "Email non valida!",
        required: "L'email è obbligatoria!",
        label: "Email",
        placeholder: "tu@example.com",
      },
      password: {
        trim: "La password manca!",
        min: "La password è troppo corta!",
        matches: "La password è troppo semplice!",
        required: "La password è obbligatoria!",
        label: "Password",
      },
      code: {
        trim: "Inserisci il codice qui",
        min: "Mancano cifre",
        max: "Codice a 6 cifre",
        matches: "Il codice può contenere solo cifre",
        required: "Il codice è obbligatorio",
        label: "Codice a 6 cifre",
      },
    },
    verification: {
      heading: "Email inviata",
      subHeading: "Per favore verifica la tua email",
      text: "Ti abbiamo inviato un'email con un link di verifica. Controlla la tua email e torna all'app per accedere!",
      returnToLogin: "Torna alla pagina di accesso",
    },
    passwordReset: {
      heading: "Email inviata",
      subHeading:
        "Usa il link nell'email per reimpostare la tua password",
      text: "Ti abbiamo inviato un link che puoi usare per reimpostare la tua password tramite il nostro sito!",
      returnToLogin: "Torna alla pagina di accesso",
    },
    lostPassword: {
      heading: "Hai dimenticato la password?",
      subHeading:
        "Ops, hai dimenticato la tua password? Non preoccuparti, ti aiuteremo a riaccedere.",
    },
    signIn: { heading: "Bentornato!" },
    signUp: {
      start: {
        heading: "Benvenuto!",
        subHeading: "Iniziamo creando il tuo account",
        buttonTitle: "Crea account",
      },
      name: {
        heading: "Qual è il tuo nome?",
        subHeading: "Come vuoi che ti chiamiamo?",
      },
      email: {
        heading: "Qual è la tua email?",
        subHeading:
          "Avremo bisogno di un indirizzo email per configurare il tuo account",
      },
      password: {
        heading: "Crea una password",
        subHeading:
          "Crea una password con almeno 8 caratteri. Deve contenere almeno una cifra (0-9), una lettera e un carattere speciale (!@#$%¨&*()).",
      },
      code: {
        heading: "Inserisci il tuo codice di verifica",
        subHeading:
          "Abbiamo inviato un codice a 6 cifre alla tua email",
        subHeading2:
          "Inserisci il tuo codice qui sotto per confermare il tuo indirizzo email",
        verify: "Verifica",
        resend: "Reinvia il codice di verifica",
        cancel: "Annulla",
      },
      finish: {
        heading: "Benvenuto!",
        subHeading:
          "Il tuo account è stato verificato. Torna alla nostra homepage per accedere",
        buttonTitle: "Accedi",
      },
    },
  },
  paywall: {
    heading: "Abbonati",
    notice:
      "Ciao,\n\nSperiamo che ti stia godendo Link-King e stia facendo grandi progressi nel tuo percorso di apprendimento delle lingue!\n\nLa tua prova gratuita è terminata. Anche se aspiriamo a offrire Link-King gratuitamente in futuro, attualmente dobbiamo coprire diverse spese.\n\nPer continuare a utilizzare l'app e ampliare il tuo vocabolario, ti invitiamo ad abbonarti. Padroneggiare una nuova lingua richiede tempo, e investire in uno strumento potente come Link-King può fare la differenza.\n\nÈ un piccolo investimento per un grande ritorno nel tuo viaggio di apprendimento delle lingue!\n\nGrazie per far parte della comunità di Link-King.\n\nCordiali saluti,\nIl Team di Link-King",
    terms: [
      "Effettuando questo acquisto accetti i nostri ",
      "Termini e Condizioni",
      " e la nostra ",
      "Informativa sulla Privacy",
    ],
    priceDescription: "Accesso completo a soli ",
    perYear: "/anno",
  },
  modals: {
    leaveAReviewModal: {
      title: "Valutaci!",
      modalMessage:
        "Ti piace Link-King?\n\nAiutaci a condividere questa app con il mondo!",
      cancel: "Annulla",
    },
    contactUsModal: {
      title: "Invia Email",
      modalMessage:
        "Contattaci via email e ti risponderemo il prima possibile.",
      cancel: "Annulla",
    },
    logOutModal: {
      title: "Esci",
      modalMessage: "Sei sicuro di voler uscire?",
      cancel: "Annulla",
    },
    setDailyGoalModal: {
      title: "Ripristina Predefiniti",
      modalMessage:
        "Sei sicuro di voler ripristinare i valori predefiniti?",
      cancel: "Annulla",
    },
    dailyGoalInfoModal: {
      modalMessage:
        "Qui puoi impostare obiettivi giornalieri per tempo, nuove parole e passi. Riceverai una notifica quando raggiungerai il tuo obiettivo giornaliero durante il gioco. Puoi lasciare vuoto un obiettivo e non sarà considerato.",
      cancel: "Chiudi",
    },
    collectionInfoModal: {
      modalMessage:
        "Ecco la tua lista di raccolta. Ogni volta che sbagli una parola, la aggiungiamo alla tua collezione. (Se la indovini, significa che già la conosci, quindi non hai bisogno di rivederla.) Ogni volta che indovini una parola nella tua collezione, il tempo prima che la rivedi aumenta. Questo si chiama 'ripetizione strutturata' ed è uno strumento di apprendimento potente.",
      cancel: "Chiudi",
    },
    welcomeModal: {
      modalMessage:
        "Benvenuto su Link-King!\nScrivi le parole o le brevi frasi che senti nella tua lingua madre e premi invio per inviarle!",
      cancel: "Chiudi",
    },
    repeatRepeatsModal: {
      modalMessage:
        "Vuoi ripetere tutte le parole che hai sbagliato oggi?",
      title: "Sì, facciamolo!",
      cancel: "No. Chiudi",
    },
    trialNoticeModal: {
      modalMessage: "Bentornato!\n\nTi restano ",
      modalMessage2:
        " giorni di prova gratuita.\n\nCordiali saluti,\nIl Team di Link-King",
      cancel: "Chiudi",
    },
    missingTTSModal: {
      modalMessage:
        "I dati Text-to-Speech (TTS) per questa lingua non sono installati sul tuo dispositivo. Alcuni dispositivi Android non hanno i dati TTS preinstallati per risparmiare spazio. Puoi scaricarli gratuitamente e persino selezionare diversi accenti, se lo desideri.",
      cancel: "Chiudi",
    },
  },
  languageNames: {
    English: "Inglese",
    Spanish: "Spagnolo",
    Portuguese: "Portoghese",
    French: "Francese",
    Italian: "Italiano",
    German: "Tedesco",
  },
};

export default it;
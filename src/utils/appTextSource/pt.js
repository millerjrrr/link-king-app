export default {
  internetConnectionPage: {
    title: "Desconectado!",
    message:
      "...parece que você não está conectado à internet. " +
      "Este aplicativo requer uma conexão estável com a Internet...",
  },
  console: {
    heading: "Console",
    start: "Começar",
    targetDetails: {
      heading: "Descrição",
      timedOut: "tempo esgotado!",
      accepted: "Respostas aceitáveis:",
      description:
        "Você acha que a sua resposta devia ser aceita? Você pode " +
        "marcar essa palavra e a gente vai investigar se a sua resposta é " +
        "apropriada o mais breve possível",
      buttonTitle:
        "Pressione e segure para marcar a palavra e a apagar da sua colleção",
      responseA:
        "Essa palavra tem sido marcada e apagada da sua colleção. " +
        "\n \n Agradecemos a sua ajuda!",
      responseB:
        "...algo deu errado 😣 por favor, certifique que você tem conexão " +
        "de internet e tente de novo... ",
    },
    help: {
      heading: "Ajuda",
      howToPlay: {
        title: "Como jogar",
        description:
          "Digite as palavras em português conforme elas são " +
          "apresentadas.",
      },
      stats: {
        title: "Estatisticas",
        description:
          "Toque nas estatísticas para ver o que elas representam!",
      },
      playingOptions: {
        title: "Opções de jogo",
        description:
          "Você pode jogar sem som, onde apenas vê a palavra, " +
          "mas não a ouve. Isto não é recomendado, mas pode ser " +
          "apropriado em locais barulhentos ou se você esquecer " +
          "seus fones de ouvido. \n \n" +
          "Você também pode jogar apenas com som, onde a palavra " +
          "está escondida. Esta é a abordagem recomendada, pois " +
          "pode evitar o desenvolvimento de erros de pronúncia. " +
          "(Confira nosso canal no Youtube para mais informações " +
          "sobre isso) \n \n" +
          "Finalmente você pode escolher jogar com ou " +
          "sem o tempo limite de 10s. Seu tempo ainda será " +
          "contado, mas você não será forçado a enviar respostas " +
          "erradas após 10s",
      },
    },
    statsMessages: {
      "basket-fill": "Novas palavras coletadas hoje",
      target: "Palavras restantes para hoje",
      "foot-print": "Avansos de hoje",
      "clock-outline": "Tempo de estudo hoje",
      "trophy-variant": "Sem erros",
    },
  },
  collection: {
    heading: "Coleção",
    searchMessage: "Pesquisar Coleção",
    noWords: "Nenhuma palavra contendo essas letras",
    today: "hoje",
    tomorrow: "amanhã",
    levelsBreakdown: {
      heading: "Divisão de Níveis",
    },
    statsScreen: {
      congratulations: "Parabéns!",
      textA: "Você coletou",
      textB: "novas palavras!",
      textC: "Sua classificação de desempenho é",
    },
    deleteScreen: {
      heading: "Excluir uma Palavra",
      textA:
        "Tem certeza de que deseja remover permanentemente esta palavra da " +
        "sua coleção?",
      textB: "Pressione e segure para excluir",
      resA:
        "Esta palavra foi removida da sua coleção. Você não a verá mais como " +
        "parte de suas repetições, mas poderá vê-la novamente como um novo desafio " +
        "de palavras em algum momento no futuro",
      resB:
        "...algo deu errado 😣 por favor, certifique que você tem conexão " +
        "de internet e tente de novo... ",
    },
  },
  options: {
    heading: "Opções",
    setDailyGoal: {
      heading: "Meta Diária",
      textA: "Meta de Tempo",
      textB: "Meta de Novas Palavras",
      textC: "Meta de Passos",
      textD: "restaurar valores padrão",
    },
    voiceSelection: {
      title: "Seleção de Voz",
      textA:
        "Nosso aplicativo usa a voz preferida do seu dispositivo.",
      textB:
        "Tanto os dispositivos Android quanto os IOS oferecem uma ampla gama " +
        "de opções de voz. Para alterar a voz que você ouve, acesse as " +
        "configurações e escolha a opção que melhor funciona para você!",
      tip:
        "DICA: Mude a voz para o sotaque da região que você mais gosta. " +
        "Por exemplo, inglês Britanico, inglês Americano, inglês Australiano, etc.",
    },
    chooseDictionary: {
      title: "Selecionar um Dicionário",
      titleA: "Inglês para falantes de português",
      titleB: "Espanhol para falantes de inglês (BETA)",
      text:
        "*Embora exista a opção de mudar para um " +
        "dicionário Espanhol-Inglês (800 entradas), este é " +
        "um dicionário muito pequeno cujo objetivo é " +
        "ilustrar o conceito para falantes de inglês.",
    },
    colorSchemeTitle: "Esquema de Cores",
    contactUs: {
      name: "Contatos",
      subject: "Consulta Geral",
    },
    logOut: {
      name: "Sair",
    },
  },
  auth: {
    titles: {
      signIn: "Entrar",
      signUp: "Criar minha conta",
      lostPassword: "Esqueceu a senha?",
      sendLink: "Enviar Link",
      next: "Avançar",
    },
    forms: {
      name: {
        trim: "Falta o nome!",
        min: "Nome muito curto!",
        required: "Nome requerida!",
        label: "Nome",
        placeholder: "Seu Nome",
      },
      email: {
        trim: "O e-mail está faltando!",
        email: "E-mail inválido!",
        required: "E-mail requerida!",
        label: "E-mail",
        placeholder: "você@exemplo.com",
      },
      password: {
        trim: "A senha está faltando!",
        min: "A senha é muito curta!",
        matches: "A senha é muito simples!",
        required: "Senha requerida!",
        label: "Senha",
      },
    },
    verification: {
      heading: "E-mail enviado",
      subHeading: "Verifique seu e-mail",
      text:
        "Enviamos a você um e-mail com um link de verificação. Verifique seu " +
        "e-mail e retorne ao aplicativo para entrar!",
      returnToLogin: "Retornar à página de login",
    },
    passwordReset: {
      heading: "E-mail Enviado",
      subHeading:
        "Use o link no e-mail para redefinir sua senha",
      text:
        "Enviamos a você um link que você pode usar para redefinir sua senha " +
        "através do nosso site!",
      returnToLogin: "Retornar à página de login",
    },
    lostPassword: {
      heading: "Esqueceu sua senha?",
      subHeading:
        "Não se preocupe, nós ajudaremos você a voltar.",
    },
    signIn: { heading: "Bem-vindo de volta!" },
    signUp: {
      welcome: {
        heading: "Bem-vindo!",
        subHeading: "Vamos começar criando sua conta",
      },
      name: {
        heading: "Qual é seu nome?",
        subHeading:
          "Como você gostaria que chamássemos você?",
      },
      email: {
        heading: "Qual é o seu email?",
        subHeading:
          "Precisaremos de um endereço de e-mail para " +
          "configurar sua conta",
      },
      password: {
        heading: "Crie uma senha",
        subHeading:
          "Crie uma senha com pelo menos 8 caracteres." +
          "Sua senha deve conter pelo menos um dígito " +
          "(0-9), uma letra e um caractere especial (!@#$%¨&*())",
      },
    },
  },
  modals: {
    contactUs: {
      title: "Enviar E-mail",
      modalMessage:
        "Entre em contato conosco por e-mail e nós responderemos o mais breve " +
        "possível",
      cancel: "Cancelar",
    },
    logOut: {
      title: "Sair",
      modalMessage: "Tem certeza de que deseja sair?",
      cancel: "Cancelar",
    },
    setDailyGoal: {
      title: "Restaurar",
      modalMessage:
        "Tem certeza de que deseja restaurar os padrões?",
      cancel: "Cancelar",
    },
    dailyGoalInfo: {
      modalMessage:
        "Aqui você pode definir metas diárias de tempo, novas palavras " +
        "e etapas. Uma notificação aparecerá se uma destas " +
        "condições foram satisfeitas. Você pode deixar uma meta " +
        "em branco e não será considerado.",
      cancel: "Fechar",
    },
    collectionInfo: {
      modalMessage:
        "Aqui tem sua lista de coleção. Cada vez que você errar " +
        "uma palavra, ela será adicionada à sua coleção. " +
        "Depois, cada vez que você acertar, mais " +
        "tempo levará até que você a veja novamente. Esse método é " +
        "chamado de “repetição espaçada estruturada” e é uma " +
        "poderosa ferramenta de aprendizagem.",
      cancel: "Fechar",
    },
    welcome: {
      modalMessage:
        "Bem-vindo ao Link-King! \n" +
        "Vamos começar com um pequeno teste para avaliar seu nível. " +
        "Digite as palavras ou frases curtas em portugues." +
        "(não se preocupe com os diacráticos, eles são ignorados)",
      cancel: "Fechar",
    },
  },
};

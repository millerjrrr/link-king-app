import AppText from "./interface";

const pt: AppText = {
  internetConnectionPage: {
    title1: "Conexão Perdida",
    title2: "Manutenção",
    title3: "Erro Desconhecido",
    message1:
      "Por favor, verifique sua conexão com a internet e tente novamente. Pode ser um problema nosso também, e, nesse caso, pedimos desculpas.",
    message2:
      "Estamos atualmente em manutenção. Por favor, volte mais tarde.",
    message3:
      "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde. Se o erro persistir, entre em contato com o suporte.",
    message4:
      "Visite nosso site para saber mais sobre o Link King",
    message5: "Entre em contato com o suporte",
    refresh: "Recarregar",
  },
  walkthrough: {
    Welcome: {
      heading: "Quase lá!",
      subHeading:
        "Vamos confirmar suas configurações de idioma",
      buttonTitle: "Vamos lá",
    },
    "Choose Home Language": {
      heading: "Idioma Nativo",
      subHeading:
        "Este deve ser o seu idioma nativo, o idioma que você conhece melhor.",
      buttonTitle: "Próximo",
      linkTitle: "Alterar idioma nativo",
      message: "Idioma nativo atualizado com sucesso!",
    },
    "Choose a Language to Study": {
      heading: "Idioma de Estudo",
      subHeading:
        "Este é o idioma que você deseja melhorar",
      buttonTitle: "Próximo",
      linkTitle: "Alterar idioma de estudo",
    },
    "You're all set!": {
      heading: "Tudo pronto!",
      subHeading:
        "Quando você clicar em próximo, será levado ao console. É aqui que a mágica acontece.\n",
      howTo:
        "As palavras serão apresentadas em #T. Seu objetivo é digitar a melhor tradução em #N",
      dunno:
        "Se você não souber uma palavra, basta pressionar enter e as soluções serão exibidas abaixo",
      playFor:
        "Jogue por um total de 3 minutos e descubra sua classificação de vocabulário #T",
      next: "Vamos lá!",
    },
  },
  console: {
    heading: "Console",
    start: "Começar",
    targetDetails: {
      heading: "Descrição",
      timedOut: "tempo esgotado!",
      accepted: "Respostas aceitáveis:",
      description:
        "Você acha que a sua resposta devia ser aceita? Você pode marcar essa palavra e a gente vai investigar se a sua resposta é apropriada o mais breve possível",
      buttonTitle:
        "Pressione e segure para marcar a palavra e a apagar da sua coleção",
      successResponse:
        "Essa palavra tem sido marcada e apagada da sua coleção. \n\nAgradecemos a sua ajuda!",
      failedResponse:
        "...algo deu errado 😣 por favor, certifique que você tem conexão de internet e tente de novo... ",
      userResponse: "Sua resposta:",
    },
    editTicketScreen: {
      subHeading:
        "Salvar novas soluções personalizadas para esta palavra",
      solutionName: "Solução",
      save: "Salvar",
      message: "Novas soluções adicionadas!",
    },
    help: {
      heading: "Ajuda",
      howToPlay: {
        title: "Como Jogar",
        description:
          "Digite as palavras em português conforme elas são apresentadas.",
      },
      gameDescription: {
        title: "O Jogo",
        description:
          "Pressione o botão acima para visitar nosso canal no YouTube e saber mais sobre nosso jogo de aprendizagem",
      },
      giveUp: {
        title: "Desistir!",
        description:
          "Para desistir e ver soluções imediatamente, só aperta enter",
      },
      dueToday: {
        title: "Palavras de Hoje",
        description:
          "Estas são as palavras que devem ser revisadas hoje. As palavras se acumulam rapidamente quando você não pratica. Então jogue todo dia!",
      },
      steps: {
        title: "Passos",
        description:
          "Seus passos são o número de vezes que você submeteu uma resposta. É uma métrica útil para definir metas diárias.",
      },
      time: {
        title: "Tempo",
        description:
          "É a quantidade de tempo que você passou jogando no dia, um cronômetro ativo, que pausa sempre que você não estiver jogando. Desse modo, você saberá o tempo total de dedicação no jogo.",
      },
      streak: {
        title: "Sua Sequência",
        description:
          "Sua sequência é o número de palavras que você acertou em seguida.",
      },
      listen: {
        title: "Modo de Escuta",
        description:
          "Você pode escolher jogar com ou sem som (recomendamos jogar com som, para melhor aprendizagem). Use esse icone para habilitar ou desabilitar essa função.",
      },
      read: {
        title: 'Modo "Não Olhe"',
        description:
          "Você também pode jogar apenas com som, ocultando a palavra. Esta abordagem é recomendada pois pode ajudar a evitar o desenvolvimento de erros de pronúncia. Use esse icone para habilitar ou desabilitar essa função.",
      },
      countdown: {
        title: "Modo de contagem regressiva",
        description:
          "Você também pode optar por jogar com ou sem o tempo limite de 10s, para escrever a palavra. Use esse icone para habilitar ou desabilitar essa função.",
      },
    },
    statsMessages: {
      "basket-fill": "Novas Palavras Coletadas",
      target: "Palavras restantes para hoje",
      "foot-print": "Avansos",
      "clock-outline": "Tempo de Estudo",
      "trophy-variant": "Sem Erros",
      sound:
        "Ative a audição novamente para ouvir palavras",
    },
  },
  collection: {
    heading: "Coleção",
    searchMessage: "Pesquisar",
    noWords: "Nenhuma palavra contendo essas letras",
    today: "hoje",
    tomorrow: "amanhã",
    statistics: {
      heading: "Estatisticas",
      description:
        'O "Nível" de uma palavra representa quantas vezes você acertou a palavra. Depois de coletar palavras em diferentes níveis, esta página mostrará quantas palavras você tem em cada nível.',
    },
    stories: {
      title: "Histórias de IA",
      description:
        "Copie e cole o prompt abaixo no seu IA favorito para criar uma história. Edite o prompt para personalizar a história ao seu gosto!",
      promptX:
        "Usando uma linguagem muito simples e palavras derivadas de cada um dos lemas na lista a seguir, escreva uma história curta em #X sobre um assunto aleatório. Mantenha as frases curtas e o tom positivo. Por favor, marque cada palavra usada da lista com seu nível em subscrito minúsculo na palavra. Lista: #Y",
      prompt: "Prompt",
      copy: "Copiar",
    },
    progressScreen: {
      congratulations: "Parabéns!",
      collected: {
        A: "Você colectou ",
        B: " novas palavras!",
      },
      textA: "Sua ",
      textB: " classificação de desempenho é:",
      challenge:
        "Baixe este aplicativo de aprendizagem de idiomas e veja se você consegue superar minha pontuação!",
    },
    wordInfoScreen: {
      heading: "Descrição",
      description:
        "Você quer remover permanentemente esta palavra da sua coleção?",
      buttonTitle:
        "Pressione e segure para excluir esta palavra da sua coleção",
      successResponse:
        "Esta palavra foi removida da sua coleção.",
      failedResponse:
        "...algo deu errado 😣 por favor, certifique que você tem conexão de internet e tente de novo... ",
    },
    dictionaryLookupScreen: {
      heading: "Adicionar Novas Palavras",
      searchMessage: "Pesquisar",
      searchDictionary:
        "Aqui você pode adicionar mais palavras do nosso dicionário avaliado.",
      noResults: "Nenhum resultado contendo essas letras",
      reminder:
        "Lembre-se de que, para eficiência, não incluímos variações da mesma palavra e algumas palavras podem não estar disponíveis. Se você achar que uma palavra deveria ser incluída, mas não está, entre em contato conosco.",
      wordAdded: "Nova palavra adicionada à coleção:",
    },
  },
  options: {
    heading: "Opções",
    pressAndHold:
      "Pressione e segure o botão de segurança vermelho",
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
        "Tanto os dispositivos Android quanto os IOS oferecem uma ampla gama de opções de voz. Para alterar a voz que você ouve, acesse as configurações e escolha a opção que melhor funciona para você!",
      tip: "DICA: Mude a voz para o sotaque da região que você mais gosta. Por exemplo, inglês Britanico, inglês Americano, inglês Australiano, etc.",
      accessSettings: "Configurações de Voz",
    },
    chooseDictionary: {
      title: "Selecionar um Dicionário",
      English: "Inglês",
      Spanish: "Espanhol",
      Portuguese: "Português",
      textA: "Atualmente oferecemos dois dicionários:",
      textB:
        "Muitos aplicativos de aprendizagem de idiomas tentam oferecer todos os idiomas imediatamente e substituir qualidade por quantidade. Embora esperemos oferecer mais cursos no futuro, estamos atualmente focados na otimização destes dois dicionários.",
      dictionaryError:
        "Não foi possível conectar. Nenhum dicionário para exibir.",
      changeHomeLanguage: "Altere seu idioma nativo aqui",
    },
    colorSchemeTitle: "Esquema de Cores",
    manageAccount: {
      title: "Gerenciamento de Conta",
      name: "Nome",
      email: "E-mail",
      homeLanguage: "Idioma de Origem",
      changeHomeLanguage: "Alterar idioma de origem",
      changeHomeLanguageWarning:
        "Este é seu idioma nativo e não deve ser alterado regularmente.\nAlterar este idioma redefinirá sua conta e todos os dados de aprendizagem.",
      continue: "Continuar",
      languageAlreadySelected:
        "Este é seu idioma nativo atual!",
      changeHomeLanguageDetails:
        "Para alterar seu idioma nativo e redefinir sua conta, insira sua senha e pressione e segure o botão vermelho.",
      homeLanguageUpdated:
        "Seu idioma nativo foi atualizado e seus dados de aprendizagem foram redefinidos.",
      subscription: "Assinatura",
      save: "Salvar",
      deleteAccount: "Apagar Conta",
      deleteAccountDetails:
        "Tem certeza de que deseja excluir permanentemente sua conta e todos os dados associados?\n\nPara excluir sua conta, digite sua senha e mantenha pressionado o botão.",
      accountDeleted: "Sua conta foi apagada!",
      usernameUpdated:
        "O nome de usuário da conta foi atualizado com sucesso",
      subscriptionPage: {
        heading: "Assinatura",
        status: "Status",
        subscribed: "Inscrito",
        notSubscribed: "Não inscrito",
        vipMessage: "VIP",
        vipExpires: "expira ",
        yourSubscription: "Sua assinatura",
        manage: "Gerenciar",
        appStore: "AppStore",
        playStore: "Play Store",
        subscribe: "Inscrever-se",
        webNotice:
          "O aplicativo web é atualmente gratuito. Nenhuma assinatura é necessária.",
      },
    },
    leaveAReview: {
      name: "Deixe um Comentário",
    },
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
      goToSignIn: "Já tem uma conta? Entrar",
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
      code: {
        trim: "Digite o código aqui",
        min: "Dígitos faltantes",
        max: "código de 6 dígitos",
        matches: "O código só pode conter dígitos",
        required: "Código é obrigatório",
        label: "Código de 6 dígitos",
      },
    },
    verification: {
      heading: "E-mail enviado",
      subHeading: "Verifique seu e-mail",
      text: "Enviamos a você um e-mail com um link de verificação. Verifique seu e-mail e retorne ao aplicativo para entrar!",
      returnToLogin: "Retornar à página de login",
    },
    passwordReset: {
      heading: "E-mail Enviado",
      subHeading:
        "Use o link no e-mail para redefinir sua senha",
      text: "Enviamos a você um link que você pode usar para redefinir sua senha através do nosso site!",
      returnToLogin: "Retornar à página de login",
    },
    lostPassword: {
      heading: "Esqueceu sua senha?",
      subHeading:
        "Não se preocupe, nós ajudaremos você a voltar.",
    },
    signIn: { heading: "Bem-vindo de volta!" },
    signUp: {
      start: {
        heading: "Bem-vindo!",
        subHeading: "Vamos começar criando sua conta",
        buttonTitle: "Criar conta",
      },
      name: {
        heading: "Qual é seu nome?",
        subHeading:
          "Como você gostaria que chamássemos você?",
      },
      email: {
        heading: "Qual é o seu email?",
        subHeading:
          "Precisaremos de um endereço de e-mail para configurar sua conta",
      },
      password: {
        heading: "Crie uma senha",
        subHeading:
          "Crie uma senha com pelo menos 8 caracteres.Sua senha deve conter pelo menos um dígito (0-9), uma letra e um caractere especial (!@#$%¨&*())",
      },
      code: {
        heading: "Digite seu código de verificação",
        subHeading:
          "Enviamos um código de 6 dígitos para seu e-mail ",
        subHeading2:
          "Por favor insira seu código abaixo para confirmar seu endereço de e-mail",
        verify: "Verificar",
        resend: "Reenviar código de verificação",
        cancel: "Cancelar",
      },
      finish: {
        heading: "Bem-vindo!",
        subHeading:
          "Sua conta foi verificada. Retorne à nossa página inicial para fazer login",
        buttonTitle: "Entrar",
      },
    },
  },
  paywall: {
    heading: "Inscrever-se",
    notice:
      "Olá,\n\nEsperamos que você esteja gostando do Link-King e fazendo grandes progressos em sua jornada de aprendizado de inglês!\n\nSeu período de teste gratuito chegou ao fim. Embora desejemos um dia oferecer o Link-King gratuitamente, atualmente temos diversas despesas que precisam ser cobertas.\n\nPara continuar usando o aplicativo e aprimorar seus conhecimentos de inglês, convidamos você a se inscrever. Dominar um novo idioma leva tempo e investir em uma ferramenta poderosa como o Link-King pode fazer toda a diferença.\n\nÉ um pequeno investimento para um enorme retorno em sua jornada linguística!\n\nObrigado por fazer parte da comunidade Link-King.\n\nAtenciosamente\nO Time Link-King",
    terms: [
      "Ao fazer esta compra você aceita nossos ",
      "Termos e Condições",
      " e ",
      "Política de Privacidade",
    ],
    priceDescription: "Acesso total por ",
    perYear: "/ano",
    webAppUnavailableOnMobileNotice:
      "Infelizmente, o aplicativo web não funciona tão bem em dispositivos móveis.\n\nFelizmente, você pode baixar o aplicativo GRATUITAMENTE aqui!",
    openInBrowser: "Abrir no navegador",
  },
  updates: {
    heading: "Atualização Disponível!",
    subHeading:
      "Uma nova versão do aplicativo está disponível com recursos empolgantes e melhorias. Atualize para continuar usando o aplicativo.",
    linkX: "Atualize para a versão #X",
    currentX: "Versão atual #X",
  },
  modals: {
    leaveAReviewModal: {
      title: "Avalie-nos!",
      modalMessage:
        "Aproveitando o Link-King?\n\nPor favor, ajude-nos a compartilhar este aplicativo com o mundo!",
      cancel: "Cancelar",
    },
    contactUsModal: {
      title: "Enviar E-mail",
      modalMessage:
        "Entre em contato conosco por e-mail e nós responderemos o mais breve possível",
      cancel: "Cancelar",
    },
    logOutModal: {
      title: "Sair",
      modalMessage: "Tem certeza de que deseja sair?",
      cancel: "Cancelar",
    },
    setDailyGoalModal: {
      title: "Restaurar",
      modalMessage:
        "Tem certeza de que deseja restaurar os padrões?",
      cancel: "Cancelar",
    },
    dailyGoalInfoModal: {
      modalMessage:
        "Aqui você pode definir metas diárias de tempo, novas palavras e etapas. Uma notificação aparecerá se uma destas condições foram satisfeitas. Você pode deixar uma meta em branco e não será considerado.",
      cancel: "Fechar",
    },
    collectionInfoModal: {
      modalMessage:
        "Aqui tem sua lista de coleção. Cada vez que você errar uma palavra, ela será adicionada à sua coleção. Depois, cada vez que você acertar, mais tempo levará até que você a veja novamente. Esse método é chamado de “repetição espaçada estruturada” e é uma poderosa ferramenta de aprendizagem.",
      cancel: "Fechar",
    },
    repeatRepeatsModal: {
      modalMessage:
        "Você gostaria de repetir todas as palavras que errou hoje?",
      title: "Sim, vamos lá!",
      cancel: "Não. Fechar",
    },
    missingTTSModal: {
      modalMessage:
        "Os dados de Texto-para-Fala (TTS) para este idioma não estão instalados no seu dispositivo. Alguns dispositivos Android não vêm com dados TTS pré-instalados para economizar espaço. Você pode baixá-los gratuitamente e até escolher diferentes sotaques, se desejar.",
      cancel: "Fechar",
    },
    ratingInfoModal: {
      modalMessage:
        "Um índice de desempenho reflete sua capacidade de reconhecer palavras, enquanto os índices das palavras indicam sua dificuldade. Seu índice é atualizado conforme você interage com novas palavras, garantindo uma medição precisa de suas habilidades.",
      title: "Saiba mais",
      cancel: "Fechar",
    },
  },
  languageNames: {
    English: "Inglês",
    Spanish: "Espanhol",
    Portuguese: "Português",
    French: "Francês",
    Italian: "Italiano",
    German: "Alemão",
  },
};

export default pt;

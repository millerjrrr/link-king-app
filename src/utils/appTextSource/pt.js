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
  },
  collection: {
    heading: "Coleção",
    searchMessage: "Pesquisar Coleção",
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
    voiceSelection: {
      title: "Seleção de Voz",
      textA:
        "Nosso aplicativo usa a voz preferida do seu dispositivo.",
      textB:
        "Tanto os dispositivos Android quanto os IOS oferecem uma ampla gama " +
        "de opções de voz. Para alterar a voz que você ouve, acesse as " +
        "configurações e escolha a opção que melhor funciona para você!",
      tip:
        "DICA: Mude a voz para o sotaque da região que você mais gosta." +
        "Por exemplo, inglês Britanico, inglês Americano, inglês Australiano, etc.",
    },
    colorSchemeTitle: "Esquema de Cores",
    setDailyGoal: {
      heading: "Meta Diária",
      textA: "Meta de Tempo",
      textB: "Meta de Novas Palavras",
      textC: "Meta de Passos",
      textD: "restaurar valores padrão",
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
      signUp: "Inscreva-se",
      lostPassword: "perdi minha senha",
      sendLink: "Enviar Link",
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
      heading: "E-mail de verificação enviado",
      subHeading: "Verifique seu e-mail",
      text:
        "Enviamos a você um e-mail com um link de verificação. Verifique seu " +
        "e-mail e retorne ao aplicativo para entrar!",
    },
    passwordReset: {
      heading: "E-mail de Redefinição de Senha Enviado",
      subHeading:
        "Use o link no e-mail para redefinir sua senha",
      text:
        "Enviamos a você um link que você pode usar para redefinir sua senha " +
        "através do nosso site!",
    },
    lostPassword: {
      heading: "Esqueceu sua senha?",
      subHeading:
        "Opa, você esqueceu sua senha? Não se preocupe, nós ajudaremos você a voltar.",
    },
    signIn: { heading: "Bem-vindo de volta!" },
    signUp: {
      heading: "Bem-vindo!",
      subHeading: "Vamos começar criando sua conta",
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
  },
};

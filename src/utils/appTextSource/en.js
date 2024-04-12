export default {
  internetConnectionPage: {
    title: "Disconnected!",
    message:
      "...looks like you are not connected to the internet. " +
      "This app requires a stable internet connection...",
  },
  console: {
    heading: "Console",
    start: "Start",
    targetDetails: {
      heading: "Attempt Info",
      timedOut: "timed out!",
      accepted: "Accepted Answers:",
      description:
        "Think your answer should have been accepted? You can " +
        "flag this word for review and we will look into it " +
        "as soon as possible",
      buttonTitle:
        "Press and hold to flag word and delete from " +
        "collected words",
      responseA:
        "This word has been flagged for review and removed " +
        "from your collection. \n \n Thank you for your help!",
      responseB:
        "...something went wrong 😣 please check your " +
        "internet connection and try again... ",
    },
    help: {
      heading: "Help",
      howToPlay: {
        title: "How to Play",
        description:
          "Type the words in English as they are presented.",
      },
      stats: {
        title: "Statistics",
        description:
          "Touch statistics to see what they represent!",
      },
      playingOptions: {
        title: "Playing Options",
        description:
          "You can choose to play with no sound where you " +
          "only see the word but don't hear it. This is not " +
          "recommended but might be appropriate in a noisy " +
          "place or if you forget your headphones \n \n" +
          "You can also play with sound only, where the word is " +
          "hidden. This is the recommended approach as it can " +
          "avoid the development of pronunciation mistakes." +
          "(Check out our Youtube Channel for more info on this) \n \n" +
          "Finally you can choose to play with or without the " +
          "10s timeout. Your time will still be counted but you " +
          "won't be forced to submit wrong answers after 10s. ",
      },
    },
    statsMessages: {
      "basket-fill": "New words collected today",
      target: "Remaining words due today",
      "foot-print": "Steps taken today",
      "clock-outline": "Time playing today",
      "trophy-variant": "Current streak",
    },
  },
  collection: {
    heading: "Collection",
    searchMessage: "Search Collected Words",
    today: "today",
    tomorrow: "tomorrow",
    levelsBreakdown: {
      heading: "Levels Breakdown",
    },
    statsScreen: {
      congratulations: "Congratulations!",
      textA: "You've collected",
      textB: "new words!",
      textC: "Your performance rating is",
    },
    deleteScreen: {
      heading: "Delete One",
      textA:
        "Are you sure you want to permanently remove this " +
        "word from your collection?",
      textB: "Press and hold to delete",
      resA:
        "This word has been removed from your " +
        "collection. You will no longer see it as part " +
        "of your repetitions but you may see it again as " +
        "a new word challenge at some point in the future",
      resB:
        "...something went wrong 😣 please check your " +
        "internet connection and try again...",
    },
  },
  options: {
    heading: "Options",
    setDailyGoal: {
      heading: "Daily Goal",
      textA: "Time Goal",
      textB: "New Words Goal",
      textC: "Steps Goal",
      textD: "restore default values",
    },
    voiceSelection: {
      title: "Voice Selection",
      textA: "Our app uses your devices preferred voice.",
      textB:
        "Both android and IOS devices offer a very wide " +
        "range of voice options. To change the voice you " +
        "hear, go to your settings " +
        "and choose the option that works best for you!",
      tip:
        "TIP: Try changing your voice to the accent that " +
        "best suits you. For example, Spanish spoken in Mexico " +
        "sounds quite different to Spanish spoken in Spain. " +
        "Choose the accent that's right for you!",
    },
    chooseDictionary: {
      title: "Select Dictionary",
      titleA: "English for Portuguese Speakers",
      titleB: "Spanish for English Speakers (BETA)",
    },
    colorSchemeTitle: "Color Scheme",
    contactUs: {
      name: "Contact Us",
      subject: "General Inquiry",
    },
    logOut: {
      name: "Log Out",
    },
  },
  auth: {
    titles: {
      signIn: "Sign In",
      signUp: "Sign Up",
      lostPassword: "I lost my password",
      sendLink: "Send Link",
    },
    forms: {
      name: {
        trim: "Name is missing!",
        min: "Name is too short!",
        required: "Name is required!",
        label: "Name",
        placeholder: "Your Name",
      },
      email: {
        trim: "Email is missing!",
        email: "Invalid email!",
        required: "Email is required!",
        label: "Email",
        placeholder: "you@example.com",
      },
      password: {
        trim: "Password is missing!",
        min: "Password is too short!",
        matches: "Password is too simple!",
        required: "Password is required!",
        label: "Password",
      },
    },
    verification: {
      heading: "Verification Email Sent",
      subHeading: "Please verify your email",
      text:
        "We've sent you an email with a verification link. " +
        "Please check your email then return " +
        "to the app to log in!",
    },
    passwordReset: {
      heading: "Password Reset Email Sent",
      subHeading:
        "Use link in email to reset your password",
      text:
        "We've sent you an link which you can use to " +
        "reset your password through our site!",
    },
    lostPassword: {
      heading: "Forgot your password?",
      subHeading:
        "Oops, did you forget your password? Don't worry, we'll help you get back in.",
    },
    signIn: { heading: "Welcome back!" },
    signUp: {
      heading: "Welcome!",
      subHeading:
        "Let's get started by creating your account",
    },
  },
  modals: {
    contactUs: {
      title: "Send Email",
      modalMessage:
        "Please contact us by email and we will get back " +
        "to you as soon as possible.",
      cancel: "Cancel",
    },
    logOut: {
      title: "Log Out",
      modalMessage: "Are your sure you want to log out?",
      cancel: "Cancel",
    },
    setDailyGoal: {
      title: "Restore Defaults",
      modalMessage:
        "Are your sure you want to restore defaults?",
      cancel: "Cancel",
    },
    dailyGoalInfo: {
      modalMessage:
        "Here you can set daily goals for time, new words " +
        "and steps. A notification will appear if any of " +
        "these conditions are satisfied. You can set a goal " +
        "to blank and it will not be considered.",
      cancel: "Close",
    },
    collectionInfo: {
      modalMessage:
        "He is your collection list. Each time you get a word " +
        "wrong it's added to your collection. After its added " +
        "each time you get it right the longer it will be before " +
        "you see it again. This is called “structured spaced " +
        "repetition” and is a powerful learning tool.",
      cancel: "Close",
    },
    welcome: {
      modalMessage:
        "Welcome to Link-King! \n" +
        "Let's begin with a short test to assess your level. " +
        "Type the words or short phrases in English and hit " +
        "enter to submit!",
      cancel: "Close",
    },
  },
};

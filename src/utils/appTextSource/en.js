export default {
  internetConnectionPage: {
    title: "Disconnected!",
    message:
      "...looks like you are not connected to the internet. This app requires a stable internet connection...",
  },
  console: {
    heading: "Console",
    start: "Start",
    targetDetails: {
      heading: "Attempt Info",
      timedOut: "timed out!",
      accepted: "Accepted Answers:",
      description:
        "Think your answer should have been accepted? You can flag this word for review and we will look into it as soon as possible.",
      buttonTitle:
        "Press and hold to flag word and delete from collected words.",
      responseA:
        "This word has been flagged for review and removed from your collection. \n \n Thank you for your help!",
      responseB:
        "...something went wrong 😣 please check your internet connection and try again... ",
    },
    help: {
      heading: "Help",
      howToPlay: {
        title: "How to Play",
        description:
          "Type the words in English as they are presented.",
      },
      gameDescription: {
        title: "The Game",
        description:
          "This language learning game uses structured spaced repetition to teach you new words. The app will learn your ability and then present the most common words that you likely do not know yet. Our philosophy is to expand a students vocabulary as quickly as possible. ",
      },
      giveUp: {
        title: "Give Up!",
        description:
          "This button is used to quickly submit a wrong answer and skip straight to the solutions",
      },
      dueToday: {
        title: "Due Today",
        description:
          "These are the words that are due for revision today. Words accumulate fast when you miss days so try to keep on top of them",
      },
      steps: {
        title: "Steps Taken Today",
        description:
          "Your steps are the number of times you have attempted a word. Its a useful metric for setting daily goals",
      },
      time: {
        title: "Time Playing",
        description:
          "This is simply the amount of time you have spent playing today. Its an active timer and it stop whenever you stop interacting with the console!",
      },
      streak: {
        title: "Your Streak",
        description:
          "Your streak is how many words you got right in a row today. ",
      },
      listen: {
        title: "Listening Mode",
        description:
          "You can choose to play with or without sound. We recommend playing with sound whenever possible but understand that sometimes this might not be an option. Use this icon to toggle between options.",
      },
      read: {
        title: "Don't Look Mode",
        description:
          "You can also play with sound only, where the word is hidden. This is the recommended approach as it can help to avoid the development of pronunciation mistakes! Use this icon to toggle between options.",
      },
      countdown: {
        title: "Countdown Mode",
        description:
          "You can also choose to play with or without the 10s timeout. Your time will still be counted but you won't be forced to submit wrong answers after 10s. Use this icon to toggle between options.",
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
    noWords: "No words containing these letters",
    today: "today",
    tomorrow: "tomorrow",
    levelsBreakdown: {
      heading: "Levels Breakdown",
      description:
        'The "Level" of a word represents how many times you got that word right. After you\'ve collected words at different levels, this page will show a breakdown of how many words you have at each level.',
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
        "Are you sure you want to permanently remove this word from your collection?",
      textB: "Press and hold to delete",
      resA: "This word has been removed from your collection. You will no longer see it as part of your repetitions but you may see it again as a new word challenge at some point in the future",
      resB: "...something went wrong 😣 please check your internet connection and try again...",
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
        "Both android and IOS devices offer a very wide range of voice options. To change the voice you hear, go to your settings and choose the option that works best for you!",
      tip: "TIP: Try changing your voice to the accent that best suits you. For example, Spanish spoken in Mexico sounds quite different to Spanish spoken in Spain. Choose the accent that's right for you!",
      accessSettings: "Voice Settings",
    },
    chooseDictionary: {
      title: "Select Dictionary",
      "English-Portuguese":
        "English for Portuguese Speakers",
      "Spanish-English": "Spanish for English Speakers",
      "Custom-Dictionary":
        "A custom dictionary just for you!",
      text: "*While there is an option to switch to a Spanish-English dictionary (800 entries), this is a very small dictionary whose purpose is to illustrate the concept to English speakers.",
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
      lostPassword: "Forgot password",
      sendLink: "Send Link",
      next: "Next",
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
      code: {
        trim: "Enter code here",
        min: "Missing digits",
        max: "6 digit code",
        matches: "Code can only contain digits",
        required: "Code is required",
        label: "6 Digit Code",
      },
    },
    verification: {
      heading: "Email Sent",
      subHeading: "Please verify your email",
      text: "We've sent you an email with a verification link. Please check your email then return to the app to log in!",
      returnToLogin: "Return to login page",
    },
    passwordReset: {
      heading: "Email Sent",
      subHeading:
        "Use link in email to reset your password",
      text: "We've sent you an link which you can use to reset your password through our site!",
      returnToLogin: "Return to login page",
    },
    lostPassword: {
      heading: "Forgot your password?",
      subHeading:
        "Oops, did you forget your password? Don't worry, we'll help you get back in.",
    },
    signIn: { heading: "Welcome back!" },
    signUp: {
      start: {
        heading: "Welcome!",
        subHeading:
          "Let's get started by creating your account",
        buttonTitle: "Create account",
      },
      name: {
        heading: "What's your name?",
        subHeading: "What would you like us to call you?",
      },
      email: {
        heading: "What's your email?",
        subHeading:
          "We'll need an email address to set up your account",
      },
      password: {
        heading: "Create a password",
        subHeading:
          "Create a password with at least 8 characters. our password must contain at least one digit (0-9), a letter and a special character (!@#$%¨&*())",
      },
      code: {
        heading: "Enter your verification code",
        subHeading:
          "We sent a 6 digit code to your email.Please enter your code below to confirm your email address",
        verify: "Verify",
        resend: "Resend verification code",
        cancel: "Cancel",
      },
      finish: {
        heading: "Welcome!",
        subHeading:
          "You're account has been verified. Return to our homepage to login",
        buttonTitle: "Sign in",
      },
    },
  },
  modals: {
    contactUs: {
      title: "Send Email",
      modalMessage:
        "Please contact us by email and we will get back to you as soon as possible.",
      cancel: "Cancel",
    },
    signUp: {
      title: "Quit process",
      modalMessage:
        "Are your sure you want to end the process?\n \n If you leave, you won't be able to complete the sign up process again for 10 minutes",
      cancel: "Stay here",
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
        "Here you can set daily goals for time, new words and steps. A notification will appear if any of these conditions are satisfied. You can set a goal to blank and it will not be considered.",
      cancel: "Close",
    },
    collectionInfo: {
      modalMessage:
        "Here is your collection list. Each time you get a word wrong we add it to your collection. (If you get it right, you already know it, so you don't need to see it again.) After its added, each time you get it right the longer it will be before you see it again. This is called “structured spaced repetition” and is a powerful learning tool.",
      cancel: "Close",
    },
    welcome: {
      modalMessage:
        "Welcome to Link-King!\nLet's begin with a short test to assess your level. Type the words or short phrases in English and hit enter to submit!",
      cancel: "Close",
    },
  },
};

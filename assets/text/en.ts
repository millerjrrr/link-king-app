import AppText from "./interface";

const en: AppText = {
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
      successResponse:
        "This word has been flagged for review and removed from your collection. \n \n Thank you for your help!",
      failedResponse:
        "...something went wrong 😣 please check your internet connection and try again... ",
      userResponse: "Your response:",
    },
    editTicketScreen: {
      subHeading:
        "Save new personalized solutions for this word",
      solutionName: "Solution",
      save: "Save",
      message: "New solutions added!",
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
          "To give up and immediately see solutions, simply enter a blank value.",
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
      "basket-fill": "New Words Collected",
      target: "Remaining words due today",
      "foot-print": "Steps Taken",
      "clock-outline": "Time Playing",
      "trophy-variant": "Streak",
      sound: "Turn listening back on to hear words",
    },
  },
  collection: {
    heading: "Collection",
    searchMessage: "Search Collection",
    noWords: "No words containing these letters",
    today: "today",
    tomorrow: "tomorrow",
    statistics: {
      heading: "Statistics",
      description:
        'The "Level" of a word represents how many times you got that word right. After you\'ve collected words at different levels, this page will show a breakdown of how many words you have at each level.',
    },
    progressScreen: {
      congratulations: "Congratulations!",
      collected: {
        A: "You've collected ",
        B: " new words!",
      },
      textA: "Your ",
      textB: " performance rating is:",
      challenge:
        "Download this language learning app and see if you can beat my score!",
    },
    wordInfoScreen: {
      heading: "Description",
      description:
        "Do you want to permanently remove this word from your collection?",
      buttonTitle:
        "Press and hold this button to delete this word from your collection",
      successResponse:
        "This word has been removed from your collection.",
      failedResponse:
        "...something went wrong 😣 please check your internet connection and try again...",
    },
    dictionaryLookupScreen: {
      heading: "Add New Words",
      searchMessage: "Search Dictionary",
      searchDictionary:
        "Here you can add more words from our rated dictionary.",
      noResults: "No results containing these letters",
      reminder:
        "Remember that for efficiency we do not include variations of the same word and some words may not be available. If you feel a word should be included but isn't please contact us.",
      wordAdded: "New word added to collection:",
    },
  },
  options: {
    heading: "Options",
    pressAndHold: "Press and hold the red safety button",
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
      English: "English",
      Spanish: "Spanish",
      Portuguese: "Portuguese",
      textA: "We currently offer two dictionaries:",
      textB:
        "Too many language learning apps try to offer all languages immediately and substitute quality for quantity. While we do hope to offer more courses in the future we are currently focused on optimizing these two dictionaries.",
      dictionaryError:
        "Could not connect. No dictionaries to display.",
      changeHomeLanguage: "Change your home language here",
    },
    colorSchemeTitle: "Color Scheme",
    manageAccount: {
      title: "Account Management",
      name: "Name",
      email: "Email",
      homeLanguage: "Home Language",
      changeHomeLanguage: "Change home language",
      changeHomeLanguageWarning:
        "This is your native language and should not be changed regularly.\nChanging this language will reset your account and all learning data.",
      continue: "Continue",
      languageAlreadySelected:
        "This is your current home language!",
      changeHomeLanguageDetails:
        "To change your home language and reset your account, enter your password and press and hold the red button.",
      homeLanguageUpdated:
        "Your home language has been updated and your learning data has been reset.",
      subscription: "Subscription",
      save: "Save",
      deleteAccount: "Delete Account",
      deleteAccountDetails:
        "Are you sure you want to permanently delete your account and all associated data?\n\nTo delete your account, enter your password and press and hold the delete button.",
      accountDeleted: "Your account has been deleted!",
      usernameUpdated:
        "Account username has been updated successfully",
      subscriptionPage: {
        heading: "Subscription",
        status: "Status",
        subscribed: "Subscribed",
        notSubscribed: "Not subscribed",
        vipMessage: "VIP",
        vipExpires: "expires ",
        yourSubscription: "Your subscription",
        manage: "Manage",
        appStore: "AppStore",
        playStore: "Play Store",
        subscribe: "Subscribe",
        webNotice:
          "The web app is currently free. No subscription required",
      },
    },
    leaveAReview: {
      name: "Leave a Review",
    },
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
      goToSignIn: "Already have an account? Sign In",
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
          "Create a password with at least 8 characters. Your password must contain at least one digit (0-9), a letter and a special character (!@#$%¨&*())",
      },
      code: {
        heading: "Enter your verification code",
        subHeading: "We sent a 6 digit code to your email ",
        subHeading2:
          "Please enter your code below to confirm your email address",
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
  paywall: {
    heading: "Subscribe",
    notice:
      "Hello,\n\nWe hope you're enjoying Link-King and making great strides in your language learning journey!\n\nYour free trial has now come to an end. While we aspire to one day offer Link-King for free, we currently have various expenses that need to be covered.\n\nTo continue using the app and keep expanding your vocabulary, we invite you to subscribe. Mastering a new language takes time, and investing in a powerful tool like Link-King can make all the difference.\n\nIt’s a small investment for a huge return in your language learning journey!\n\nThank you for being part of the Link-King community.\n\nKind regards,\nThe Link-King Team",
    terms: [
      "By making this purchase you accept our ",
      "Terms and Conditions",
      " and ",
      "Privacy Policy",
    ],
    priceDescription: "Full access for just ",
    perYear: "/yr",
    webAppUnavailableOnMobileNotice:
      "Unfortunately, the web app does not work so well on mobile devices.\n\nFortunately, you can download the app for FREE here!",
  },
  modals: {
    leaveAReviewModal: {
      title: "Rate Us!",
      modalMessage:
        "Enjoying Link-King?\n\nPlease help us share this app with the world!",
      cancel: "Cancel",
    },
    contactUsModal: {
      title: "Send Email",
      modalMessage:
        "Please contact us by email and we will get back to you as soon as possible.",
      cancel: "Cancel",
    },
    logOutModal: {
      title: "Log Out",
      modalMessage: "Are your sure you want to log out?",
      cancel: "Cancel",
    },
    setDailyGoalModal: {
      title: "Restore Defaults",
      modalMessage:
        "Are your sure you want to restore defaults?",
      cancel: "Cancel",
    },
    dailyGoalInfoModal: {
      modalMessage:
        "Here you can set daily goals for time, new words and steps. You’ll be notified when you reach your goal for the day while playing. You can set a goal to blank and it will not be considered.",
      cancel: "Close",
    },
    collectionInfoModal: {
      modalMessage:
        "Here is your collection list. Each time you get a word wrong we add it to your collection. (If you get it right, you already know it, so you don't need to see it again.) After its added, each time you get it right the longer it will be before you see it again. This is called “structured spaced repetition” and is a powerful learning tool.",
      cancel: "Close",
    },
    welcomeModal: {
      modalMessage:
        "Welcome to Link-King!\nType the words or short phrases that you hear in your home language and hit enter to submit!",
      cancel: "Close",
    },
    repeatRepeatsModal: {
      modalMessage:
        "Would you like to repeat all the words you got wrong today?",
      title: "Yes, let's go!",
      cancel: "No. Close",
    },
    trialNoticeModal: {
      modalMessage: "Welcome back!\n\n You have ",
      modalMessage2:
        " days remaining on your free trial.\n\nKind regards,\nThe Link-King Team",
      cancel: "Close",
    },
    missingTTSModal: {
      modalMessage:
        "Text-to-Speech (TTS) data for this language isn’t installed on your device. Some Android devices don’t come with TTS data pre-installed to save space. You can download it for free and even select different accents if desired.",
      cancel: "Close",
    },
  },
  languageNames: {
    English: "English",
    Spanish: "Spanish",
    Portuguese: "Portuguese",
    French: "French",
    Italian: "Italian",
    German: "German",
  },
};

export default en;

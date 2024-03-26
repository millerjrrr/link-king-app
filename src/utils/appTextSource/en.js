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
        "best suits you. For example, english from the UK " +
        "sounds quite different to english from the USA. " +
        "Choose the accent that's right for you!",
    },
    colorSchemeTitle: "Color Scheme",
    setDailyGoal: {
      title: "Daily Goal",
      textA: "Time Goal",
      textB: "New Words Goal",
      textC: "Steps Goal",
      textD: "restore default values",
    },
    contactUs: {
      title: "Contact Us",
      subject: "General Inquiry",
      modalMessage:
        "Please contact us by email and we will get back " +
        "to you as soon as possible.",
      button: "Send Email",
    },
    logOut: {
      title: "Log Out",
      modalMessage: "Are your sure you want to log out?",
      button: "Log Out",
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
};

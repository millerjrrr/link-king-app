interface InternetConnectionPage {
  title: string;
  message: string;
}

interface ConsoleTargetDetails {
  heading: string;
  timedOut: string;
  accepted: string;
  description: string;
  buttonTitle: string;
  successResponse: string;
  failedResponse: string;
  userResponse: string;
}

interface ConsoleEditTicketScreen {
  subHeading: string;
  solutionName: string;
  save: string;
  message: string;
}

interface ConsoleHelpSection {
  title: string;
  description: string;
}

interface ConsoleHelp {
  heading: string;
  howToPlay: ConsoleHelpSection;
  gameDescription: ConsoleHelpSection;
  giveUp: ConsoleHelpSection;
  dueToday: ConsoleHelpSection;
  steps: ConsoleHelpSection;
  time: ConsoleHelpSection;
  streak: ConsoleHelpSection;
  listen: ConsoleHelpSection;
  read: ConsoleHelpSection;
  countdown: ConsoleHelpSection;
}

interface ConsoleStatsMessages {
  "basket-fill": string;
  target: string;
  "foot-print": string;
  "clock-outline": string;
  "trophy-variant": string;
  sound: string;
}

interface Console {
  heading: string;
  start: string;
  targetDetails: ConsoleTargetDetails;
  editTicketScreen: ConsoleEditTicketScreen;
  help: ConsoleHelp;
  statsMessages: ConsoleStatsMessages;
}

interface CollectionStatistics {
  heading: string;
  description: string;
}

interface CollectionProgressScreen {
  congratulations: string;
  collected: {
    A: string;
    B: string;
  };
  textA: string;
  textB: string;
  challenge: string;
}

interface CollectionWordInfoScreen {
  heading: string;
  description: string;
  buttonTitle: string;
  successResponse: string;
  failedResponse: string;
}

interface Collection {
  heading: string;
  searchMessage: string;
  noWords: string;
  today: string;
  tomorrow: string;
  statistics: CollectionStatistics;
  progressScreen: CollectionProgressScreen;
  wordInfoScreen: CollectionWordInfoScreen;
}

interface OptionsSetDailyGoal {
  heading: string;
  textA: string;
  textB: string;
  textC: string;
  textD: string;
}

interface OptionsVoiceSelection {
  title: string;
  textA: string;
  textB: string;
  tip: string;
  accessSettings: string;
}

interface OptionsChooseDictionary {
  title: string;
  English: string;
  Spanish: string;
  Portuguese: string;
  textA: string;
  textB: string;
  dictionaryError: string;
  changeHomeLanguage: string;
}

interface OptionsManageAccountSubscriptionPage {
  heading: string;
  status: string;
  subscribed: string;
  notSubscribed: string;
  vipMessage: string;
  vipExpires: string;
  yourSubscription: string;
  manage: string;
  appStore: string;
  playStore: string;
  subscribe: string;
}

interface OptionsManageAccount {
  title: string;
  name: string;
  email: string;
  homeLanguage: string;
  changeHomeLanguage: string;
  changeHomeLanguageWarning: string;
  continue: string;
  languageAlreadySelected: string;
  changeHomeLanguageDetails: string;
  homeLanguageUpdated: string;
  subscription: string;
  save: string;
  deleteAccount: string;
  deleteAccountDetails: string;
  accountDeleted: string;
  usernameUpdated: string;
  subscriptionPage: OptionsManageAccountSubscriptionPage;
}

interface OptionsContactUs {
  name: string;
  subject: string;
}

interface OptionsLogOut {
  name: string;
}

interface Options {
  heading: string;
  pressAndHold: string;
  setDailyGoal: OptionsSetDailyGoal;
  voiceSelection: OptionsVoiceSelection;
  chooseDictionary: OptionsChooseDictionary;
  colorSchemeTitle: string;
  manageAccount: OptionsManageAccount;
  contactUs: OptionsContactUs;
  logOut: OptionsLogOut;
}

interface AuthTitles {
  signIn: string;
  signUp: string;
  lostPassword: string;
  sendLink: string;
  next: string;
  goToSignIn: string;
}

interface AuthFormsField {
  trim: string;
  min?: string;
  max?: string;
  required: string;
  label: string;
  placeholder?: string;
  email?: string;
  matches?: string;
}

interface AuthForms {
  name: AuthFormsField;
  email: AuthFormsField;
  password: AuthFormsField;
  code: AuthFormsField;
}

interface AuthVerification {
  heading: string;
  subHeading: string;
  text: string;
  returnToLogin: string;
}

interface AuthPasswordReset {
  heading: string;
  subHeading: string;
  text: string;
  returnToLogin: string;
}

interface AuthLostPassword {
  heading: string;
  subHeading: string;
}

interface AuthSignIn {
  heading: string;
}

interface AuthSignUpStep {
  heading: string;
  subHeading: string;
  buttonTitle?: string;
}

interface AuthSignUp {
  start: AuthSignUpStep;
  name: AuthSignUpStep;
  email: AuthSignUpStep;
  password: AuthSignUpStep;
  code: AuthSignUpStep & {
    subHeading2: string;
    verify: string;
    resend: string;
    cancel: string;
  };
  finish: AuthSignUpStep;
}

interface Auth {
  titles: AuthTitles;
  forms: AuthForms;
  verification: AuthVerification;
  passwordReset: AuthPasswordReset;
  lostPassword: AuthLostPassword;
  signIn: AuthSignIn;
  signUp: AuthSignUp;
}

interface Paywall {
  heading: string;
  notice: string;
  terms: [string, string, string, string];
  priceDescription: string;
  perYear: string;
}

interface ModalsMessage {
  title?: string;
  modalMessage: string;
  modalMessage2?: string;
  cancel: string;
}

interface Modals {
  contactUs: ModalsMessage;
  logOut: ModalsMessage;
  setDailyGoal: ModalsMessage;
  dailyGoalInfo: ModalsMessage;
  collectionInfo: ModalsMessage;
  welcome: ModalsMessage;
  repeatRepeats: ModalsMessage;
  trialNotice: ModalsMessage;
  missingTTS: ModalsMessage;
}

interface LanguageNames {
  English: string;
  Spanish: string;
  Portuguese: string;
  French: string;
  Italian: string;
  German: string;
}

interface AppText {
  internetConnectionPage: InternetConnectionPage;
  console: Console;
  collection: Collection;
  options: Options;
  auth: Auth;
  paywall: Paywall;
  modals: Modals;
  languageNames: LanguageNames;
}

export default AppText;
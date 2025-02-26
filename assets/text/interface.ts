import { Modals } from "@src/types/Modals";

interface InternetConnectionPage {
  title1: string;
  title2: string;
  title3: string;
  message1: string;
  message2: string;
  message3: string;
  message4: string;
  message5: string;
  refresh: string;
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
  altHeading: string;
  altMessage: string;
  newTargetWord: string;
  importSolutions: string;
  required: string;
  silly: string;
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
  solutionMessage: string;
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

interface CollectionDictionaryLookupScreen {
  heading: string;
  searchMessage: string;
  searchDictionary: string;
  noResults: string;
  reminder: string;
  wordAdded: string;
  addCustomWord: string;
  customTicketCreated: string;
}

interface CollectionStories {
  title: string;
  description: string;
  promptX: string;
  prompt: string;
  copy: string;
}

interface Collection {
  heading: string;
  searchMessage: string;
  noWords: string;
  today: string;
  tomorrow: string;
  statistics: CollectionStatistics;
  stories: CollectionStories;
  progressScreen: CollectionProgressScreen;
  wordInfoScreen: CollectionWordInfoScreen;
  dictionaryLookupScreen: CollectionDictionaryLookupScreen;
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
  webNotice: string;
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
  forgotOrDidntSetUpPassword: string;
  manageUsers: string;
}

interface OptionsLeaveAReview {
  name: string;
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
  shareProgress: string;
  shareApp: string;
  leaveAReview: OptionsLeaveAReview;
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
  continueWithGoogle: string;
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
  message: string;
  priceDescriptionX: string;
  terms: [string, string, string, string];
  webAppUnavailableOnMobileNotice: string;
  openInBrowser: string;
}

interface Updates {
  heading: string;
  subHeading: string;
  linkX: string;
  currentX: string;
}

interface LanguageNames {
  English: string;
  Spanish: string;
  Portuguese: string;
  French: string;
  Italian: string;
  German: string;
}

interface WalkthroughBase {
  heading: string;
  subHeading: string;
  buttonTitle: string;
  linkTitle?: string;
  message?: string;
}
interface Walkthrough {
  Welcome: WalkthroughBase;
  "Choose Home Language": WalkthroughBase;
  "Choose a Language to Study": WalkthroughBase;
  "You're all set!": {
    heading: string;
    subHeading: string;
    howTo: string;
    dunno: string;
    playFor: string;
    next: string;
  };
}

interface AppText {
  internetConnectionPage: InternetConnectionPage;
  walkthrough: Walkthrough;
  console: Console;
  collection: Collection;
  options: Options;
  auth: Auth;
  paywall: Paywall;
  updates: Updates;
  modals: Modals;
  languageNames: LanguageNames;
}

export default AppText;

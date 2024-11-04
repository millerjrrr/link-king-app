interface Ticket {
  id: string;
  target?: string;
  solutions: string[];
  rating: number;
  level: number;
}

// CONSOLE
export type ConsoleStackParamList = {
  ConsoleStackScreen: undefined;
  WordInfoScreen: {
    ticket: Ticket;
    wrongAnswerReturned?: boolean;
  };
  EditTicketScreen: {
    ticket: Ticket;
    target: string;
  };
  HelpScreen: undefined;
  ProgressScreen: undefined;
  DictionarySelectionScreen: undefined;
};

// COLLECTION
export type CollectionStackParamList = {
  WordsCollection: undefined;
  WordInfoScreen: {
    ticket: Ticket;
    wrongAnswerReturned?: boolean;
  };
  EditTicketScreen: { ticket: Ticket; target: string };
  StatsScreen: undefined;
  ProgressScreen: undefined;
  DictionarySelectionScreen: undefined;
};

// OPTIONS
export type OptionsStackParamList = {
  OptionsStackScreen: undefined;
  SetDailyGoalScreen: undefined;
  VoiceSelectionScreen: undefined;
  DictionarySelectionScreen: undefined;
  ManageAccountNavigator: undefined;
};

// MANAGE ACCOUNT
export type ManageAccountStackParamList = {
  ManageAccountScreen: undefined;
  ChangeNameScreen: undefined;
  ManageSubscriptionScreen: undefined;
  ChangeHomeLanguageWarningScreen: undefined;
  ChangeHomeLanguageScreen: undefined;
  SelectNewHomeLanguageScreen: undefined;
  DeleteAccountScreen: undefined;
};

// AUTH
export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Name: undefined;
  Email: undefined;
  Password: undefined;
  VerificationCode: undefined;
  LostPassword: undefined;
  CheckYourEmail: undefined;
};

import type { StackNavigationProp } from "@react-navigation/stack";

export interface Ticket {
  id: string;
  target?: string;
  solutions: string[];
  rating: number;
  level: number;
}

// CONSOLE
export type ConsoleStackParamList = StackNavigationProp<{
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
}>;

// COLLECTION
export type CollectionStackParamList = StackNavigationProp<{
  WordsCollection: undefined;
  WordInfoScreen: {
    ticket: Ticket;
    wrongAnswerReturned?: boolean;
  };
  EditTicketScreen: { ticket: Ticket; target: string };
  StatsScreen: undefined;
  ProgressScreen: undefined;
  DictionarySelectionScreen: undefined;
  DictionaryLookupScreen: undefined;
}>;

// OPTIONS
export type OptionsStackParamList = StackNavigationProp<{
  OptionsStackScreen: undefined;
  SetDailyGoalScreen: undefined;
  DictionarySelectionScreen: undefined;
  ManageAccountNavigator: undefined;
}>;

// MANAGE ACCOUNT
export type ManageAccountStackParamList =
  StackNavigationProp<{
    ManageAccountScreen: undefined;
    ChangeNameScreen: undefined;
    ManageSubscriptionScreen: undefined;
    ChangeHomeLanguageWarningScreen: undefined;
    ChangeHomeLanguageScreen: undefined;
    SelectNewHomeLanguageScreen: undefined;
    DeleteAccountScreen: undefined;
  }>;

// AUTH
export type AuthStackParamList = StackNavigationProp<{
  Welcome: undefined;
  SignIn: undefined;
  Name: undefined;
  Email: undefined;
  Password: undefined;
  VerificationCode: undefined;
  LostPassword: undefined;
  CheckYourEmail: undefined;
}>;

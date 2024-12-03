import type { StackNavigationProp } from "@react-navigation/stack";

export interface Ticket {
  id: string;
  target?: string;
  solutions: string[];
  rating: number;
  level: number;
}

// COLLECTION
export type CollectionStackParamList = {
  Collection: undefined;
  "Word Details": {
    ticket: Ticket;
    wrongAnswerReturned?: boolean;
  };
  "Edit Solutions": { ticket: Ticket; target: string };
  Statistics: undefined;
  Progress: undefined;
  "Dictionary Lookup": undefined;
  "Dictionary Selection": undefined;
};

// CONSOLE
export type ConsoleStackParamList = {
  Console: undefined;
  "Word Details": {
    ticket: Ticket;
    wrongAnswerReturned?: boolean;
  };
  "Edit Solutions": {
    ticket: Ticket;
    target: string;
  };
  "Console - Help": undefined;
  Progress: undefined;
  "Dictionary Selection": undefined;
};

// MANAGE ACCOUNT
export type ManageAccountStackParamList = {
  "Manage Account": undefined;
  "Change Account Name": undefined;
  "Manage Subscription": undefined;
  "Change Home Language - Warning": undefined;
  "Change Home Language": undefined;
  "Select New Home Language": undefined;
  "Delete Account": undefined;
};

// OPTIONS
export type OptionsStackParamList = {
  Options: undefined;
  "Set Daily Goals": undefined;
  "Dictionary Selection": undefined;
};

// AUTH
export type AuthStackParamList = {
  Welcome: undefined;
  "Sign In": undefined;
  Name: undefined;
  Email: undefined;
  Password: undefined;
  "Verification Code": undefined;
  "Lost Password": undefined;
  "Check Your Email": undefined;
};

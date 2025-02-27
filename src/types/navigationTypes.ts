// COLLECTION
export type CollectionStackParamList = {
  Collection: undefined;
  "Word Details": {
    wrongAnswerReturned?: boolean;
  };
  "Edit Solutions": undefined;
  "Create Custom Ticket": { target: string };
  Statistics: undefined;
  "AI Stories": undefined;
  Progress: undefined;
  "Dictionary Lookup": undefined;
  "Dictionary Selection": undefined;
};

// CONSOLE
export type ConsoleStackParamList = {
  Console: undefined;
  "Word Details": {
    wrongAnswerReturned?: boolean;
  };
  "Edit Solutions": undefined;
  "Console - Help": undefined;
  Progress: undefined;
  "Dictionary Selection": undefined;
};

// MANAGE ACCOUNT
export interface SelectNewHomeLanguageProp {
  unprotect?: boolean;
}

export type ManageAccountStackParamList = {
  "Manage Account": undefined;
  "Change Account Name": undefined;
  "Manage Subscription": undefined;
  "Change Home Language - Warning": undefined;
  "Change Home Language": undefined;
  "Select New Home Language": SelectNewHomeLanguageProp;
  "Delete Account": undefined;
  "Manage Users": undefined;
};

// OPTIONS
export type OptionsStackParamList = {
  Options: undefined;
  "Set Daily Goals": undefined;
  "Dictionary Selection": undefined;
  Progress: undefined;
};

// AUTH
export interface NameScreenProps {
  updateName?: boolean;
  buttonTitle?: string;
}

export type AuthStackParamList = {
  Welcome: undefined;
  "Sign In": undefined;
  Name: NameScreenProps;
  Email: undefined;
  Password: undefined;
  "Verification Code": undefined;
  "Lost Password": undefined;
  "Check Your Email": undefined;
};

// WALKTHROUGH

export type WalkthroughStackParamList = {
  Welcome: undefined;
  "Choose Home Language": undefined;
  "Choose a Language to Study": undefined;
  "You're all set!": undefined;
  "Select New Home Language": undefined;
  "Choose a Dictionary": undefined;
};

export type TabParamList = {
  "Console:": undefined;
  "Collection:": undefined;
  "Options:": undefined;
  "Manage Account:": undefined;
};

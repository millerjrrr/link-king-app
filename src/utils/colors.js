const commonColors = {
  ORANGE: "#f8ab54",
  RED: "#f37777",
  LIGHTRED: "#f377774d",
  GREEN: "#2ecc71",
};

const darkText = {
  CONTRAST: ["#362718", "#8a793e"],
  INACTIVE_CONTRAST: "#36271880",
  STATUSBAR: "dark-content",
};

const colors = {
  dark: {
    PRIMARY: "#1b1b1b",
    SECONDARY: "#000000",
    CONTRAST: ["#ffffff", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  blue: {
    PRIMARY: "#4169e1",
    SECONDARY: "#0000ff",
    CONTRAST: ["#c9fffe", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  turquoise: {
    PRIMARY: "#cfe6de",
    SECONDARY: "#a1ffde",
    ...darkText,
    ...commonColors,
  },
  green: {
    PRIMARY: "#e0ffd6",
    SECONDARY: "#bff5bf",
    ...darkText,
    ...commonColors,
  },
  orange: {
    PRIMARY: "#fff5d6",
    SECONDARY: "#f5d48e",
    ...darkText,
    ...commonColors,
  },
  pink: {
    PRIMARY: "#ffd6ee",
    SECONDARY: "#ffb3e2",
    ...darkText,
    ...commonColors,
  },
  light: {
    PRIMARY: "#f5f5f5",
    SECONDARY: "#ffffff",
    ...darkText,
    ...commonColors,
  },
};

export default colors;

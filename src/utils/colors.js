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
    PRIMARY: "#e3feff",
    SECONDARY: "#baebff",
    ...darkText,
    ...commonColors,
  },
  green: {
    PRIMARY: "#e4ffe3",
    SECONDARY: "#c1ffba",
    ...darkText,
    ...commonColors,
  },
  orange: {
    PRIMARY: "#fff8e3",
    SECONDARY: "#ffe9ba",
    ...darkText,
    ...commonColors,
  },
  pink: {
    PRIMARY: "#ffebfe",
    SECONDARY: "#fbd4ff",
    ...darkText,
    ...commonColors,
  },
  light: {
    PRIMARY: "#ffffff",
    SECONDARY: "#f5f5f5",
    ...darkText,
    ...commonColors,
  },
};

export default colors;

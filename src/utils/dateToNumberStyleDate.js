module.exports = (date) =>
  // this is weird but since we use google sheets style dates
  // and they have day 1 being 31-Dec-1899
  // then we have 0 is 30-Dec-1899 which is weirdly represented as the below
  Math.floor(
    Math.abs(date - new Date(1899, 11, 30)) /
      (1000 * 60 * 60 * 24),
  ) * 1;

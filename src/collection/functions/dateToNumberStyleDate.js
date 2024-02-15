module.exports = (date) =>
  Math.floor(
    Math.abs(date - new Date('1899-12-30')) /
      (1000 * 60 * 60 * 24),
  ) * 1;

const choicesDimensions = {
  watermarkCard: (quality = 80) => ({ width: 100, quality: quality }),
  icon: (quality = 80) => ({ width: 50, quality: quality }),
  card: (quality = 80) => ({ width: 300, quality: quality }),
  custom: ({ width, quality = 80 }) => ({ width, quality }),
  original: (quality = 80) => ({ quality: quality }), // Original option doesn't specify any dimensions
};

module.exports = {
  choicesDimensions,
};

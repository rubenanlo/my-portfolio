const roundNumber = (value, decimals = 1) => {
  if (value == null) return null;

  const factor = 10 ** decimals;
  const adjustedValue = parseFloat(value) * factor;

  if (value < 0) {
    return Math.ceil(adjustedValue - 0.5) / factor;
  }

  return Math.round(adjustedValue) / factor;
};

module.exports = roundNumber;

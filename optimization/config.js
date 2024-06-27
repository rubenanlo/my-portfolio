const { small, medium, custom } = {
  small: (quality = 80) => ({ width: 50, height: 50, quality: quality }),
  medium: (quality = 80) => ({ width: 224, height: 130, quality: quality }),
  large: (quality = 80) => ({ width: 800, height: 600, quality: quality }),
  custom: ({ width, height, quality = 80 }) => ({ width, height, quality }),
};

const dimensionsMapping = {
  "ruben_headshot.jpeg": small(),
  "mitigation_toolkit.png": { width: 224, height: 130 },
  "rawdev.png": medium(),
  "my_portfolio.png": medium(),
  "sdg_tc.png": medium(),
  "sdr.png": medium(),
  "eu_sdr.png": medium(),
  "tick_tock.png": medium(),
  "benin.png": medium(),
  "spotify.webp": custom({ width: 275, height: 226 }),
  "email.webp": custom({ width: 275, height: 226, quality: 60 }),
  // ... add more mappings as needed
};

module.exports = dimensionsMapping;

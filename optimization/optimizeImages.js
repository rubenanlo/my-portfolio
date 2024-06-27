const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");
const roundNumber = require("../helpers/formatNumber");

const dirPath = path.join("public", "assets");
const excludedImagesPath = path.join("optimization", "excludedImages.json");

const dimensionsMapping = {
  "ruben_headshot.jpeg": { width: 50, height: 50 },
  "mitigation_toolkit.png": { width: 224, height: 130 },
  "rawdev.png": { width: 224, height: 130 },
  "my_portfolio.png": { width: 224, height: 130 },
  "sdg_tc.png": { width: 224, height: 130 },
  "sdr.png": { width: 224, height: 130 },
  "eu_sdr.png": { width: 224, height: 130 },
  "tick_tock.png": { width: 224, height: 130 },
  "benin.png": { width: 224, height: 130 },
  "spotify.webp": { width: 275, height: 226 },
  "email.webp": { width: 275, height: 226, quality: 60 },
  // ... add more mappings as needed
};

let excludedImages = {};
try {
  excludedImages = fs.readJsonSync(excludedImagesPath);
} catch (error) {
  console.log("No excluded images file found. Starting from scratch.");
}

const getDimensionsAndQuality = (fileName, metadata) => {
  const defaultQuality = 80;
  let dimensions = { width: metadata.width, height: metadata.height };
  let quality = defaultQuality;

  if (dimensionsMapping[fileName]) {
    dimensions = dimensionsMapping[fileName];
    quality = dimensionsMapping[fileName].quality || defaultQuality;
  }

  return { dimensions, quality };
};

const processImage = async (file) => {
  const fileName = path.basename(file);

  if (excludedImages[fileName]) {
    console.log(`Skipping excluded image: ${fileName}`);
    return;
  }

  try {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();
    const { dimensions, quality } = getDimensionsAndQuality(fileName, metadata);

    // Get the current file size
    const currentStats = await fs.stat(file);
    const currentSize = currentStats.size;

    const formats = [
      // { format: "avif", options: { quality: quality } }, We exclude AVIF format since it doesn't work with Edge
      { format: "webp", options: { quality: quality } },
      { format: "jpeg", options: { quality: quality, mozjpeg: true } },
      { format: "png", options: { quality: quality } },
      // { format: "svg", options: { quality: quality } },
    ];

    let smallestFile = { size: Infinity, format: null };

    for (const { format, options } of formats) {
      const outputPath = file.replace(path.extname(file), `.${format}`);
      await sharp(input)
        .resize(dimensions.width, dimensions.height)
        [format](options)
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      if (stats.size < smallestFile.size) {
        if (smallestFile.format) {
          await fs.unlink(
            file.replace(path.extname(file), `.${smallestFile.format}`)
          );
        }
        smallestFile = { size: stats.size, format: format };
      } else {
        await fs.unlink(outputPath);
      }
    }

    const delta = ((smallestFile.size - currentSize) / currentSize) * 100;

    console.log(
      `Processed ${fileName} and reduced size by ${roundNumber(delta)}%`
    );

    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

const processFiles = async () => {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      await processImage(path.join(dirPath, file));
    }

    await fs.writeJson(excludedImagesPath, excludedImages);
    console.log("Updated the excluded images list.");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = processFiles;

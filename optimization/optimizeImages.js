const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");
const formatNumber = require("../helpers/formatData");

const dirPath = path.join("public", "assets");
const excludedImagesPath = path.join("optimization", "excludedImages.json");
const data = []; // Change to an array of objects for better console.table compatibility

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
    return;
  }

  try {
    const input = await fs.readFile(file);
    const ext = path.extname(file).toLowerCase();

    // Get the current file size
    const currentStats = await fs.stat(file);
    const currentSize = currentStats.size;

    const formats = [
      { format: "webp", options: {} },
      { format: "jpeg", options: { mozjpeg: true } },
      { format: "png", options: {} },
    ];

    let smallestFile = { size: currentSize, format: ext, path: file };

    const metadata = await sharp(input).metadata();
    const { dimensions, quality } = getDimensionsAndQuality(fileName, metadata);

    if (ext === ".svg") {
      // Convert SVG to other formats and compare sizes
      for (const { format, options } of formats) {
        const outputPath = file.replace(ext, `.${format}`);
        await sharp(input)
          .resize(dimensions.width, dimensions.height) // Apply resizing to SVG
          .toFormat(format, { ...options, quality }) // Apply quality where supported
          .toFile(outputPath);

        const stats = await fs.stat(outputPath);
        if (stats.size < smallestFile.size) {
          if (smallestFile.path !== file) {
            await fs.unlink(smallestFile.path);
          }
          smallestFile = { size: stats.size, format, path: outputPath };
        } else {
          await fs.unlink(outputPath);
        }
      }
    } else {
      for (const { format, options } of formats) {
        const outputPath = file.replace(ext, `.${format}`);
        await sharp(input)
          .resize(dimensions.width, dimensions.height)
          .toFormat(format, { ...options, quality }) // Apply quality where supported
          .toFile(outputPath);

        const stats = await fs.stat(outputPath);
        if (stats.size < smallestFile.size) {
          if (smallestFile.path !== file) {
            await fs.unlink(smallestFile.path);
          }
          smallestFile = {
            size: stats.size,
            format,
            path: outputPath,
            quality,
          };
        } else {
          await fs.unlink(outputPath);
        }
      }
    }

    const delta = (currentSize - smallestFile.size) / currentSize;

    data.push({
      "File Name": fileName,
      "Smallest Size": formatNumber(smallestFile.size, { decimals: 0 }),
      "Reduction (%)": `${formatNumber(delta, {
        decimals: 2,
        percentage: true,
      })}%`,
      Quality: smallestFile.quality || "-",
    });

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
    console.table(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = processFiles;

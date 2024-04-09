const sharp = require("sharp");
const fs = require("fs-extra"); // Using fs-extra for its enhanced file handling
const path = require("path");

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

// Load excluded images from JSON file, or default to an empty object if not found
let excludedImages = {};
try {
  excludedImages = fs.readJsonSync(excludedImagesPath);
} catch (error) {
  console.log("No excluded images file found. Starting from scratch.");
}

const processAvif = async (file) => {
  const fileName = path.basename(file);

  if (excludedImages[fileName]) {
    console.log(`Skipping excluded image: ${fileName}`);
    return;
  }

  try {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();

    let dimensions = { width: metadata.width, height: metadata.height };
    let quality = 80; // default quality

    if (dimensionsMapping[fileName] && dimensionsMapping[fileName].dimensions) {
      dimensions = dimensionsMapping[fileName].dimensions;
      quality = dimensionsMapping[fileName].quality || 80;
    }

    await sharp(input)
      .resize(dimensions.width, dimensions.height)
      .avif({ quality: quality })
      .toFile(file);

    console.log(`Processed ${fileName}`);

    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

const processWebp = async (file) => {
  const fileName = path.basename(file);

  if (excludedImages[fileName]) {
    console.log(`Skipping excluded image: ${fileName}`);
    return;
  }

  try {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();

    let dimensions = { width: metadata.width, height: metadata.height };
    let quality = 80; // default quality

    if (dimensionsMapping[fileName] && dimensionsMapping[fileName].dimensions) {
      dimensions = dimensionsMapping[fileName].dimensions;
      quality = dimensionsMapping[fileName].quality || 80;
    }

    await sharp(input)
      .resize(dimensions.width, dimensions.height)
      .webp({ quality: quality })
      .toFile(file);

    console.log(`Processed ${fileName}`);

    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

const processPng = async (file) => {
  const fileName = path.basename(file);

  if (excludedImages[fileName]) {
    console.log(`Skipping excluded image: ${fileName}`);
    return;
  }

  try {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();

    // Check if the file has a mapping and if it has a dimensions property
    let dimensions = { width: metadata.width, height: metadata.height };
    let quality = 80; // default quality

    if (dimensionsMapping[fileName] && dimensionsMapping[fileName].dimensions) {
      dimensions = dimensionsMapping[fileName].dimensions;
      quality = dimensionsMapping[fileName].quality || 80; // Use provided quality or default
    }

    await sharp(input)
      .resize(dimensions.width, dimensions.height)
      .png({ quality: quality })
      .toFile(file);

    console.log(`Processed ${fileName}`);

    // Update the excludedImages list
    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

const processJpeg = async (file) => {
  const fileName = path.basename(file);

  if (excludedImages[fileName]) {
    console.log(`Skipping excluded image: ${fileName}`);
    return;
  }

  try {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();

    // Check if the file has a mapping and if it has a dimensions property
    let dimensions = { width: metadata.width, height: metadata.height };
    let quality = 80; // default quality

    if (dimensionsMapping[fileName] && dimensionsMapping[fileName].dimensions) {
      dimensions = dimensionsMapping[fileName].dimensions;
      quality = dimensionsMapping[fileName].quality || 80; // Use provided quality or default
    }

    await sharp(input)
      .resize(dimensions.width, dimensions.height)
      .jpeg({ quality: quality, mozjpeg: true })
      .toFile(file);

    console.log(`Processed ${fileName}`);

    // Update the excludedImages list
    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

const processGif = async (file) => {
  const fileName = path.basename(file);

  if (excludedImages[fileName]) {
    console.log(`Skipping excluded image: ${fileName}`);
    return;
  }

  try {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();

    let dimensions = { width: metadata.width, height: metadata.height };

    if (dimensionsMapping[fileName] && dimensionsMapping[fileName].dimensions) {
      dimensions = dimensionsMapping[fileName].dimensions;
    }

    await sharp(input, { animated: true })
      .resize(dimensions.width, dimensions.height)
      .toFile(file.replace(".gif", ".webp"));
    await fs.unlink(file);

    console.log(`Processed ${fileName}`);

    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Error processing file ${file}:`, error);
  }
};

// Main functions
const processFiles = async () => {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      if (path.extname(file).toLowerCase() === ".avif") {
        await processAvif(path.join(dirPath, file));
      } else if (path.extname(file).toLowerCase() === ".webp") {
        await processWebp(path.join(dirPath, file));
      } else if (path.extname(file).toLowerCase() === ".gif") {
        await processGif(path.join(dirPath, file));
      } else if (path.extname(file).toLowerCase() === ".jpeg") {
        await processJpeg(path.join(dirPath, file));
      } else if (path.extname(file).toLowerCase() === ".png") {
        await processPng(path.join(dirPath, file));
      }
    }

    // Save the updated excluded images list
    await fs.writeJson(excludedImagesPath, excludedImages);
    console.log("Updated the excluded images list.");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = processFiles;

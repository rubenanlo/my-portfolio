const sharp = require("sharp");
const fs = require("fs-extra"); // Using fs-extra for its enhanced file handling
const path = require("path");

const dirPath = path.join("public", "assets");
const excludedImagesPath = path.join("optimization", "excludedImages.json");

const dimensionsMapping = {
  "ruben_headshot.jpeg": { width: 50, height: 50 },

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
    const dimensions = dimensionsMapping[fileName] || {
      width: metadata.width,
      height: metadata.height,
    };
    await sharp(input).resize(dimensions.width, dimensions.height).toFile(file);

    console.log(`Processed ${fileName}`); // <-- Moved the log statement here

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
    const dimensions = dimensionsMapping[fileName] || {
      width: metadata.width,
      height: metadata.height,
    };

    await sharp(input, { animated: true })
      .resize(dimensions.width, dimensions.height)
      .toFile(file.replace(".gif", ".webp"));
    await fs.unlink(file); // Delete the original .gif

    console.log(`Processed ${fileName}`); // <-- Moved the log statement here

    // Update the excludedImages list
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
      } else if (path.extname(file).toLowerCase() === ".gif") {
        await processGif(path.join(dirPath, file));
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

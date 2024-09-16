require("dotenv").config(); // had to install dotenv, since i'm running the code in the terminal and not in an api endpoint
const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");
const cloudinary = require("../library/cloudinary");
const formatNumber = require("../helpers/formatData");
const { getDimensionsAndQuality } = require("./getDimensions.js");
const cliProgress = require("cli-progress");

const dirPath = path.join("public", "assets");
const excludedImagesPath = path.join("optimization", "excludedImages.json");
const imagesJsonPath = path.join("public", "images.json");
const data = [];
const errorLog = [];

let imagesData = [];

try {
  imagesData = fs.readJsonSync(imagesJsonPath);
} catch (error) {
  console.log("No images.json file found. Starting with an empty array.");
}

let excludedImages = {};
try {
  excludedImages = fs.readJsonSync(excludedImagesPath);
} catch (error) {
  console.log("No excluded images file found. Starting from scratch.");
}

const uploadToCloudinary = async (filePath, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
    });
    return result;
  } catch (error) {
    console.error(`Error uploading ${filePath} to Cloudinary:`, error);
    return null;
  }
};

const saveImageInfo = async (alt, format, src, width, height) => {
  // Find the index of the existing image entry, if any
  const existingIndex = imagesData.findIndex((img) => img.alt === alt);

  if (existingIndex > -1) {
    // Update the existing image entry
    imagesData[existingIndex] = { alt, format, src, width, height };
  } else {
    // Add a new image entry
    imagesData.push({ alt, format, src, width, height });
    console.log(`Added new entry for ${alt} to images.json`);
  }

  try {
    await fs.writeJson(imagesJsonPath, imagesData, { spaces: 2 });
  } catch (error) {
    console.error("Error saving to images.json:", error);
  }
};
const processImage = async (file, dimensionsAndQuality) => {
  const fileName = path.basename(file, path.extname(file)); // Get file name without extension
  const relativePath = path.relative(process.cwd(), file);

  if (excludedImages[fileName]) {
    return;
  }

  try {
    const input = await fs.readFile(file);
    const ext = path.extname(file).toLowerCase().replace(/\./g, "");

    const currentStats = await fs.stat(file);
    const currentSize = currentStats.size;

    const formats = [
      { format: "webp", options: {} },
      { format: "jpeg", options: { mozjpeg: true } },
      { format: "png", options: {} },
    ];

    let smallestFile = { size: currentSize, format: ext, path: file };

    // Use the pre-fetched dimensions and quality passed from the main loop
    const { dimensions, quality } = dimensionsAndQuality;

    for (const { format, options } of formats) {
      const outputPath = file.replace(`.${ext}`, `.${format}`);
      await sharp(input)
        .resize(dimensions.width, dimensions.height)
        .toFormat(format, { ...options, quality })
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      if (stats.size < smallestFile.size) {
        if (smallestFile.path !== file) {
          await fs.unlink(smallestFile.path);
        }
        smallestFile = { size: stats.size, format, path: outputPath };
      } else {
        if (format === smallestFile.format) {
          continue;
        }
        await fs.unlink(outputPath);
      }
    }

    const delta = (currentSize - smallestFile.size) / currentSize;

    const cleanRelativePath = relativePath.replace(/^[^/]+\//, "/");
    const cleanNewPath = smallestFile.path.replace(/^[^/]+\//, "/");

    // Ensure we push to the data array before accessing its index
    data.push({
      "File Name": fileName,
      "Smallest Size": formatNumber(smallestFile.size, { decimals: 0 }),
      "Reduction (%)": `${formatNumber(delta, {
        decimals: 2,
        percentage: true,
      })}%`,
      Quality: quality || "-", // Use the quality from the dimensionsAndQuality object
      "Original Path": cleanRelativePath,
      "New Path": cleanNewPath,
      "Cloudinary ID": "-",
      Status: "-",
    });

    const lastIndexData = data.length - 1;

    // Upload the smallest file to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      smallestFile.path,
      fileName
    );
    if (cloudinaryResult) {
      data[lastIndexData]["Cloudinary ID"] = cloudinaryResult.public_id;
      data[lastIndexData]["Status"] = "uploaded";

      // Save image information to images.json
      await saveImageInfo(
        fileName, // alt
        smallestFile.format, // format
        cloudinaryResult.public_id, // src (Cloudinary ID)
        dimensions.width, // width
        dimensions.height // height
      );
    }

    excludedImages[fileName] = true;
  } catch (error) {
    console.error(`Failed to process ${file}:`, error);
    const lastIndexData = data.length - 1;
    data[lastIndexData]["Status"] = "error";
    errorLog.push({
      File: file,
      "Cloudinary Error": error.message || error,
    });
  }
};

// Initialize the progress bar
const progressBar = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic
);

const processFiles = async () => {
  try {
    const files = await fs.readdir(dirPath);

    // Start the progress bar with total number of files
    progressBar.start(files.length, 0);

    // Sequential loop to get user input for dimensions
    const dimensionsAndQualityList = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = path.basename(file, path.extname(file));

      // Skip files already in excludedImages
      if (excludedImages[fileName]) {
        continue;
      }

      try {
        // This must happen sequentially, because it prompts the user
        const metadata = await sharp(path.join(dirPath, file)).metadata();
        const dimensionsAndQuality = await getDimensionsAndQuality(
          fileName,
          metadata
        );
        dimensionsAndQualityList.push({ file, dimensionsAndQuality });
      } catch (err) {
        console.error(`Failed to get dimensions for ${file}:`, err);
      }
    }

    // Parallel processing of the images
    const promises = dimensionsAndQualityList.map(
      ({ file, dimensionsAndQuality }, index) => {
        return processImage(path.join(dirPath, file), dimensionsAndQuality)
          .then(() => progressBar.update(index + 1))
          .catch((err) =>
            console.error(`Failed to process file ${file}:`, err)
          );
      }
    );

    await Promise.all(promises);

    // Stop the progress bar after processing
    progressBar.stop();

    // Save excluded images after processing
    await fs.writeJson(excludedImagesPath, excludedImages);

    const displayData = data.map(
      ({
        "File Name": fileName,
        "Smallest Size": smallestSize,
        "Reduction (%)": reduction,
        Quality: quality,
        "Cloudinary ID": cloudinaryId,
        Status: status,
      }) => ({
        "File Name": fileName,
        "Smallest Size": smallestSize,
        "Reduction (%)": reduction,
        Quality: quality,
        "Cloudinary ID": cloudinaryId,
        Status: status,
      })
    );

    const displayError = errorLog.map(
      ({ File: file, "Cloudinary Error": error }) => ({
        File: file,
        "Cloudinary Error": error,
      })
    );

    if (displayData.length > 0) {
      console.log("Summary");
      console.table(displayData);
    }
    if (errorLog.length > 0) {
      console.log("Errors");
      console.table(displayError);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = { processFiles };

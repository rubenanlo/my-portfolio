if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // had to install dotenv, since i'm running the code in the terminal and not in an api endpoint
}
const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");
const {
  excludedImagesPath,
  dirPath,
  notFormattedFormats,
} = require("./config.js");
const getDimensionsAndQuality = require("./helpers/getDimensions.js");
const getFileHash = require("./helpers/getFileHash.js");
const uploadToCloudinary = require("./uploadToCloudinary.js");
const setConsoleLog = require("./helpers/setConsoleLog.js");
const getExtension = require("./helpers/getExtension.js");
const reFormatting = require("./helpers/reFormatting.js");
const saveImageInfo = require("./helpers/saveImageInfo.js");

let excludedImages = {};

// Load excluded images with hashes
try {
  excludedImages = fs.readJsonSync(excludedImagesPath);
} catch (error) {
  console.log("No excluded images file found. Starting from scratch.");
}

const processImage = async (file, dimensionsAndQuality) => {
  const fileName = path.basename(file, path.extname(file));
  const relativePath = path.relative(process.cwd(), file);

  try {
    const input = await fs.readFile(file);
    const ext = getExtension(file);

    const currentStats = await fs.stat(file);
    const currentSize = currentStats.size;

    let smallestFile;
    let quality;
    let dimensions;

    if (!notFormattedFormats.includes(ext)) {
      const fileContent = await reFormatting(
        currentSize,
        ext,
        file,
        dimensionsAndQuality,
        input
      );
      smallestFile = fileContent.smallestFile;
      quality = fileContent.quality;
      dimensions = fileContent.dimensions;
    } else {
      smallestFile = { size: currentSize, format: ext, path: file };
      quality = dimensionsAndQuality.quality;
      dimensions = dimensionsAndQuality.dimensions;
    }

    setConsoleLog({
      logType: "initial",
      currentSize,
      smallestFile,
      relativePath,
      fileName,
      quality,
      ext,
    });

    // Upload the smallest file to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      smallestFile.path,
      fileName
    );

    if (cloudinaryResult) {
      // Log the Cloudinary result
      setConsoleLog({ logType: "update", cloudinaryResult });

      // Save image information to images.json
      await saveImageInfo(
        fileName, // alt
        smallestFile.format, // format
        cloudinaryResult.public_id, // src (Cloudinary ID)
        dimensions.width, // width
        dimensions.height // height
      );
    }

    // Generate the hash after processing to store the final version
    const finalHash = await getFileHash(smallestFile.path);

    excludedImages[fileName] = {
      hash: finalHash,
      processedAt: new Date().toISOString(),
    };
  } catch (errorHash) {
    console.error(`Failed to process ${file}:`, errorHash);

    setConsoleLog({ logType: "update", errorHash, file });
  }
};

const processFiles = async () => {
  try {
    const files = await fs.readdir(dirPath);
    const excludedFiles = [".DS_Store"];

    const filteredFiles = files.filter(
      (file) => !excludedFiles.includes(path.extname(file) || file)
    );

    // Sequential loop to get user input for dimensions
    const dimensionsAndQualityList = [];
    for (let i = 0; i < filteredFiles.length; i++) {
      const file = filteredFiles[i];
      const fileName = path.basename(file, path.extname(file));
      // Get current file hash
      const filePath = path.join(dirPath, file);
      const fileHash = await getFileHash(filePath);

      // Skip files already in excludedImages
      if (
        excludedImages[fileName] &&
        excludedImages[fileName].hash === fileHash
      ) {
        continue;
      }

      try {
        // This must happen sequentially, because it prompts the user
        const metadata = await sharp(path.join(dirPath, file)).metadata();
        const ext = getExtension(file);
        const notSupported = notFormattedFormats.includes(ext);
        const dimensionsAndQuality = await getDimensionsAndQuality(
          fileName,
          metadata,
          notSupported
        );
        dimensionsAndQualityList.push({ file, dimensionsAndQuality });
      } catch (err) {
        console.error(`Failed to get dimensions for ${file}:`, err);
      }
    }

    // Parallel processing of the images
    const promises = dimensionsAndQualityList.map(
      ({ file, dimensionsAndQuality }) =>
        // index
        {
          return (
            processImage(path.join(dirPath, file), dimensionsAndQuality)
              // .then(() => progressBar.update(index + 1))
              .catch((err) =>
                console.error(`Failed to process file ${file}:`, err)
              )
          );
        }
    );

    await Promise.all(promises);

    // Stop the progress bar after processing
    // progressBar.stop();

    // Save excluded images after processing
    await fs.writeJson(excludedImagesPath, excludedImages);

    const { data, errorLog } = setConsoleLog({ logType: "final" });

    if (data.length > 0) {
      console.log("Summary");
      console.table(data);
    }
    if (errorLog.length > 0) {
      console.log("Errors");
      console.table(errorLog);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = processFiles;

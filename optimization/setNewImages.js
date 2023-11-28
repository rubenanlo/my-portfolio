const fs = require("fs-extra");
const path = require("path");

// Set the directory where the images are located
const assetsDir = path.join("public", "assets");

// Utility function to check if a file is an image by its extension
const isImageFile = (fileName) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".svg",
    ".webp",
    ".avif",
    ".gif",
  ];
  const ext = path.extname(fileName).toLowerCase();
  return imageExtensions.includes(ext);
};

// Function to generate import statements for each image
const setImports = (imageNames) =>
  imageNames
    .map(
      (imageName) =>
        `import ${imageName
          .replace(/\..+$/, "")
          .toUpperCase()
          .replace(/[^a-zA-Z0-9_]/g, "_")} from 'assets/${imageName}';`
    )
    .join("\n");

// Function to generate export statements for each image
const setExports = (imageNames) =>
  imageNames
    .map(
      (imageName) =>
        `export { ${imageName
          .replace(/\..+$/, "")
          .toUpperCase()
          .replace(/[^a-zA-Z0-9_]/g, "_")} };`
    )
    .join("\n");

// Main function to update image imports and export statements
const setFullImageExport = async () => {
  try {
    // Read the image files from the assets directory
    const allFiles = await fs.readdir(assetsDir);

    // Filter out non-image files
    const imageFiles = allFiles.filter(isImageFile);

    // Generate the import statements for the images
    const imageImports = setImports(imageFiles);

    // Generate the export statements for the images
    const imageExports = setExports(imageFiles);

    // Define the target file where the exportImages.js is located
    const targetFile = path.join("helpers", "exportImages.js");

    // Combine the updated content with new import and export statements
    const updatedContent = `${imageImports}\n\n${imageExports}`;

    // Write the updated content back to the target file
    await fs.writeFile(targetFile, updatedContent, "utf-8");

    console.log("Updated image imports and exports successfully!");
  } catch (error) {
    console.error("Error updating image imports and exports:", error);
  }
};

module.exports = setFullImageExport;

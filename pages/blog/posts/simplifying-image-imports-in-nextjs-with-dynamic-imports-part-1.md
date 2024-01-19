---
title: "Simplifying Image Imports in Next.js with Dynamic Imports (Part 1)"
description: "A way to automate the creation of imports and exports to handle your newly added images into a repo"
date: 2023/12/24
category: code
---

# Simplifying Image Imports in Next.js with Dynamic Imports (Part 1)

One of the essential aspects of web development is efficiently managing assets like images. In a Next.js project, proper image handling can make a significant difference in the development workflow. In this blog post, we will explore a solution to simplify image imports by dynamically generating import statements. This approach not only makes your code cleaner but also helps you avoid the tedious task of importing images from relative paths.

When working on a Next.js project, you’ve probably encountered the need to import images and use them within your components. While you can import images directly, it can become cumbersome as your project grows. Manually maintaining import statements for each image can be time-consuming and error-prone.

To address this issue, we’ll introduce a set of scripts that automate the import of images and optimize them as well. These scripts are especially handy if you’re working on a project where image management is a critical aspect of your development process.

Before we start, please note that you will need to have a ‘helpers’ folder, or tweak the code below to generate the output in a specific folder. Also, you may want to create a script in your package.json so that you can run the script much more easily. And one last thing, this code assumes that all your images are saved in one folder (i.e., assets).

Lets start!

## Code to setup imports and exports (setNewImages.js)

```javascript
const fs = require("fs-extra");
const path = require("path");
```

These lines import the Node.js modules `fs-extra` and `path`, which are used for file system operations and path manipulation, respectively.

```javascript
const assetsDir = path.join(“public”, “static”, “assets”);
```

Here, `assetsDir` is defined as the path to the directory where the images are located. It’s created by joining the strings “public”, “static”, and “assets” using `path.join()`. This path represents the directory structure where your images are stored.

```javascript
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
```

This is a utility function called `isImageFile`. It takes a `fileName` as input and checks whether it has an image file extension. It does this by comparing the file’s extension (obtained using `path.extname()`) to a list of known image extensions. If the extension matches one of the image extensions, the function returns `true`, indicating that the file is an image; otherwise, it returns `false`.

```javascript
const setImports = (imageNames) =>
 imageNames.map((imageName) =>`import ${imageName
 .replace(/\..+$/, “”)
 .toUpperCase()
 .replace(/[^a-zA-Z0–9_]/g, “_”)} from ‘static/assets/${imageName}’;`
 ).join(“\n”);
```

The `setImports` function takes an array of `imageNames` as input and generates import statements for each image. It uses the `map()` method to iterate through the array of image names and constructs import statements by:

- Removing the file extension from the image name using `.replace(/\..+$/, “”)`.
- Converting the image name to uppercase with `.toUpperCase()`.
- Replacing any characters that are not alphanumeric or underscores with underscores using `.replace(/[^a-zA-Z0–9_]/g, “_”)`.
- Combining the modified image name into an import statement, e.g., `import MY_IMAGE_NAME from ‘static/assets/image.jpg’;`.

Finally, the import statements are joined with newline characters using `.join(“\n”)` to form a single string.

```javascript
const setExports = (imageNames) =>
imageNames.map((imageName) =>`export { ${imageName
 .replace(/\..+$/, “”)
 .toUpperCase()
 .replace(/[^a-zA-Z0–9_]/g, “_”)} };`
).join(“\n”);
```

The `setExports` function is similar to `setImports`, but it generates export statements for each image. It follows the same process of modifying image names and formatting them into export statements.

```javascript
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
 const targetFile = path.join(“helpers”, “exportImages.js”);
 // Combine the updated content with new import and export statements
 const updatedContent = `${imageImports}\n\n${imageExports}`;
 // Write the updated content back to the target file
 await fs.writeFile(targetFile, updatedContent, “utf-8”);
 console.log(“Updated image imports and exports successfully!”);
 } catch (error) {
 console.error(“Error updating image imports and exports:”, error);
 }
};
```

The `setFullImageExport` function is the main function that performs the following steps:

1. Reads all files in the `assetsDir` directory using `await fs.readdir(assetsDir)`. These are all files, including non-image files.

2. Filters out only the image files by calling `filter(isImageFile)` on the list of all files. This gives you an array of image file names.

3. Generates import statements for the images using `setImports(imageFiles)` and export statements using `setExports(imageFiles)`.

4. Defines the `targetFile` where the generated import and export statements will be written. It’s located in the “helpers” directory and named “exportImages.js.”

5. Combines the import and export statements into `updatedContent`, separating them with newline characters.

6. Writes the `updatedContent` back to the `targetFile` using `await fs.writeFile(targetFile, updatedContent, “utf-8”)`.

7. If the operations are successful, it logs a success message. If there’s an error, it logs an error message.

Finally, the `setFullImageExport()` function is called to execute the entire process.

In summary, this code is a script that automatically generates import and export statements for image files in a specified directory, making it easier to manage images in a Next.js project. It also filters out non-image files and ensures that the generated statements are well-formatted and suitable for use in your project.

## Usage

To run the code, you can either run this code in the terminal:

```bash
node ./folder_where_setImages.js_is/setImages.js
```

Or you can save it as a script in your package.json like this:

```yaml
“scripts”: {
“import”: “node ./folder_where_setImages.js_is/setImages”
},
```

and run the script in your terminal:

```bash
npm run import
```

Once you run the code, a new file will be created under the name exportImages.js in your helpers folder (or another folder you set up).

You are ready to use it! In any React component, you can import the image like this:

```javascript
import {FILENAME_OF_IMAGE as yourImage} from ‘../helpers/exportImages’

export const SampleComponent = ()=>{
(…)
return
<Image src={yourImage} alt="Your image"/>
(…)
}
```

The next part of this exercise will be the use of sharp to optimize certain images and gifs, stay tuned!

Thanks for reading

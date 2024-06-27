const matter = require("gray-matter");
const fs = require("fs-extra");
const path = require("path");

const updateMarkdownFiles = async (markdownDir, imageMappings) => {
  try {
    const files = await fs.readdir(markdownDir);

    for (const file of files) {
      const filePath = path.join(markdownDir, file);
      if (path.extname(filePath) === ".md") {
        let content = await fs.readFile(filePath, "utf-8");
        let { data: frontmatter, content: body } = matter(content);

        let updated = false;

        // Update paths in frontmatter
        for (let key in frontmatter) {
          if (typeof frontmatter[key] === "string") {
            for (const {
              "Original Path": original,
              "New Path": updatedPath,
            } of imageMappings) {
              if (frontmatter[key].includes(original)) {
                frontmatter[key] = frontmatter[key].replace(
                  original,
                  updatedPath
                );
                updated = true;
              }
            }
          }
        }

        // Update paths in markdown body
        for (const {
          "Original Path": original,
          "New Path": updatedPath,
        } of imageMappings) {
          if (body.includes(original)) {
            body = body.replace(new RegExp(original, "g"), updatedPath);
            updated = true;
          }
        }

        if (updated) {
          const newContent = matter.stringify(body, frontmatter);
          await fs.writeFile(filePath, newContent, "utf-8");
          console.log(`Updated ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error("Error updating markdown files:", error);
  }
};

module.exports = updateMarkdownFiles;

const readline = require("readline");
const { processFiles, data } = require("./optimizeImages");
const updateMarkdownFiles = require("./updateMd");
const path = require("path");

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

const startProcessing = async () => {
  try {
    const answer = await askQuestion(
      "Have you checked the excluded JSON file to make sure everything is ok? (y/n)"
    );

    if (answer.toLowerCase() === "y") {
      await processFiles();
      const imageMappings = data.map((entry) => ({
        "Original Path": entry["Original Path"],
        "New Path": entry["New Path"],
      }));
      await updateMarkdownFiles(
        path.join("pages", "blog", "posts"),
        imageMappings
      );
      console.log(
        "New images successfully processed and markdown files updated!"
      );
    } else {
      console.log(
        "Exiting without processing files. Please update the JSON file."
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

startProcessing();

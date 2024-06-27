const readline = require("readline");
const processFiles = require("./optimizeImages");
const setFullImageExport = require("./setNewImages");

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
      await setFullImageExport();
      console.log("New images successfully processed!");
    } else {
      console.log(
        "Exiting without processing files. Please update the JSON file."
      );
      return;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

startProcessing();

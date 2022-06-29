const { exec } = require("child_process"); //TODO: use spawn

// *** Execute the generated Python file *** //
const executeJava = (job) => {
  return new Promise((resolve, reject) => {
    exec(
      `java ./temp/${job.folder_name}/Main.java < ./temp/${job.folder_name}/input.txt`,
      (error, stdout, stderr) => {
        if (stderr) {
          reject({ stderr, stdout });
        }
        if (error) {
          reject({ error });
        }
        resolve({ stderr, stdout });
      }
    );
  });
};

module.exports = { executeJava };

const express = require("express");
const { randomBytes } = require("crypto"); // For Generating random bytes
const { sendInQueue } = require("./rabbitmq-server.js"); // Import function to push in queue
const { setKey, getKey, delKey } = require("./redis-server.js");
const cors = require("cors");

// *** Express App Configuration *** //
const app = express();
const PORT = 6500;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// *** Run endpoint for running the code *** //
app.post("/run", (req, res) => {
  const folder_name = randomBytes(20).toString("hex"); // Random Folder name
  try {
    setKey(folder_name, "Queued");

    // Extract Data received from the API
    let data = {
      language: req.body.language,
      code: req.body.code,
      folder_name: folder_name,
      input: req.body.input,
      timeout: req.body.timeout,
    };

    // If language is not received, return 400 BAD Request
    if (data.language === undefined) {
      return res.status(400).send({ error: "Language Not Received" });
    }

    // If code is not received, return 400 BAD Request
    if (data.code === undefined) {
      return res.status(400).send({ error: "Code Not Received" });
    }

    // If input is not received, set it as an empty string
    if (data.input === undefined) {
      data.input = "";
    }

    // If timeout is not received, set it to 15 sec
    if (data.timeout === undefined) {
      data.timeout = 15000;
    }

    // *** Prepare data and Push in Queue *** //
    data = JSON.stringify(data);
    sendInQueue(Buffer.from(data));

    console.log(`Request ${folder_name} received`);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: `Internal Server Error: ${err}` });
  }

  res.send(folder_name);
});

app.get("/results/:id", async (req, res) => {
  try {
    let key = req.params.id;
    let status = await getKey(key);

    if (status == "null") {
      return res.status(400).send({ status: "Job doesn't exists" });
    } else if (status == "Queued") {
      return res.status(202).send({ status: "Queued" });
    } else if (status == "Processing") {
      return res.status(202).send({ status: "Processing" });
    } else {
      const jobOutput = JSON.parse(status);
      return res.status(202).send({ status: "Done", jobOutput });
    }
  } catch (err) {
    return res.status(500).send({ error: `Internal Server Error: ${err}` });
  }
});

// *** Home endpoint for server testing: //TODO: Remove this endpoint //
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// *** Start server listening on defined PORT *** //
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

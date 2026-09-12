const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Buy AI Backend Online");
});

app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  res.json({
    source: "divar",
    url,
    status: "ready",
    data: {
      title: null,
      price: null,
      city: null,
      score: null,
      recommendation: null
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Smart Buy AI Backend Running");
});
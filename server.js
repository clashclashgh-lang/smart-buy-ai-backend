const express = require("express");
const { chromium } = require("playwright");

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Smart Buy AI Backend Online - Playwright Ready");
});

app.post("/analyze", async (req,res)=>{
  const { url } = req.body;

  let browser;

  try {
    browser = await chromium.launch({headless:true});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil:"domcontentloaded", timeout:30000});

    const title = await page.title();

    res.json({
      source:"divar",
      status:"extraction_started",
      data:{
        title,
        price:null,
        city:null,
        description:null,
        score:null,
        recommendation:null
      }
    });

  } catch(error) {
    res.status(500).json({
      error:"extract_failed",
      message:error.message
    });
  } finally {
    if(browser) await browser.close();
  }
});

app.listen(process.env.PORT || 3000, ()=>{
 console.log("Smart Buy AI Playwright Backend Running");
});
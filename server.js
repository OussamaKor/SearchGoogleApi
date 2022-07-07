const playwright = require("playwright");

const browserType = "chromium";
const express = require('express') ;
const cors = require('cors')

const app = express()

app.use(cors()) ;
app.use(express.json()) ;

app.post('/api/users',async(req,res)=>{
    const {transcript} = req.body ;
    const browser = await playwright[browserType].launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com");
    const searchTerm = transcript;
    const input = await page.$('input[name="q"]');
    await input.type(searchTerm);
    await input.press("Enter");

})

app.listen('3001',()=>{
    console.log("Server Running on port 3001")
})

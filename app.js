const express = require("express");
const dBModule = require('./dBModule') //
const personModel = require('./PersonModel')
const messageModel = require('./MessageModel') //
const app = express();
const port = 3000;

const staticDir = __dirname + "\\static\\";

app.use(express.static(staticDir));
app.use(express.urlencoded());
app.use(express.json());
app.set("view engine","ejs");

app.get("/", (req, res) => res.sendFile(staticDir + "pages\\index.html"));

app.get('/messages', async (req, res) => { // inväntar messages och låter den skapa om variabeln (let) och sedan inväntar den på medeladet och sedan visar alla
  let messages = await messageModel.getAllMessages()
  res.render("views/forums.ejs", { names: messages})
})


app.get("/forum", async (req, res) =>{ // skapar variabeln för messages och lägger in det vi skickar in till databasen i variabeln

  const messages = await messageModel.getAllMessage()

  res.render('./forum.ejs', { messages: messages.reverse() }) // detta är istället för res.send
  }
  // I'll probably need to use this bit of code below to show the message on screen, this is an old assignemnt.
);
app.post('/forum', async (req, res) => { // skapar själva medelandet som kräver user input från hemsidan och sedan lägger det i en const

  const message = await messageModel.createMessage(req.body.fname, req.body.forumMessage)

  await dBModule.storeElement(message)

  res.redirect('/forum')
})


app.get("/anime", (req, res) =>
  res.sendFile(staticDir + "pages\\anime.html")
);

app.get("/services", (req, res) =>
  res.sendFile(staticDir + "pages\\services.html")
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


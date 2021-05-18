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

app.get('/messages', async (req, res) => {
  let messages = await messageModel.getAllMessages()
  res.render("views/forums.ejs", { names: messages})
})


app.get("/forum", async (req, res) =>{

  const messages = await messageModel.getAllMessage()

  res.render('./forum.ejs', { messages: messages.reverse() }) // detta är istället för res.send
  }
  // I'll probably need to use this bit of code below to show the message on screen, this is an old assignemnt.
);
app.post('/forum', async (req, res) => {

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


/*
app.get('/', (req, res) => {
  res.render('pages/index.ejs', { name: " " })
})

app.get("/messages", (req, res) => res.render("messages.ejs"));


app.get('/messages', async (req, res) => {
  let messages = await messageModel.getAllMessages()
  res.render("pages/messages.ejs", { names: messages})
})



app.post('/messages', (req, res) => {
  let message = messageModel.createMessage(req.body.name, req.body.message)

  dBModule.storeElement(message)

  res.render('pages/messages.ejs', { name: req.body.name})
})

app.post('/', (req, res) => {

  let person = personModel.createPerson(req.body.name, req.body.email, req.body.age)

  dBModule.storeElement(person)

  let displayName = " " + req.body.name

  res.render('pages/index.ejs', { name: req.body.name }) // detta är istället för res.send
})

app.listen(port, () => {
  console.log(`Example app listening on ports ${port}!`)
})
*/
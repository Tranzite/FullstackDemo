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


//
app.get("/messages", (req, res) => res.render("forum.ejs"));

app.get('/messages', async (req, res) => {
  let messages = await messageModel.getAllMessages()
  res.render("views/forums.ejs", { names: messages})
})


app.post('/messages', (req, res) => {
  let message = messageModel.createMessage(req.body.fname, req.body.forumMessage)

  dBModule.storeElement(message)

  res.render('pages/forums.ejs', { name: req.body.fname})
})
//



app.get("/forum", (req, res) =>
  res.render("./forum.ejs", {
    
    name: "Name",
    forumMessage: "Message"
  })

  // I'll probably need to use this bit of code below to show the message on screen, this is an old assignemnt.
);
app.post('/forum', (req, res) => {

  let person = personModel.createPerson(req.body.fname, req.body.forumMessage)

  dBModule.storeElement(person)

  res.render('pages/index.ejs', { name: req.body.fname, message: req.body.forumMessage }) // detta är istället för res.send
})


app.get("/anime", (req, res) =>
  res.sendFile(staticDir + "pages\\anime.html")
);

app.get("/services", (req, res) =>
  res.sendFile(staticDir + "pages\\services.html")
);



app.post("/contact", function (req, res) {
  console.log(req.body.fname);
  console.log(req.body.forumMessage);
  
});






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
const express = require("express");
const bcrypt = require("bcryptjs");
const dBModule = require('./dBModule') 
const personModel = require('./PersonModel')
const messageModel = require('./MessageModel') 
const UserModel = require("./UserModel");
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
app.post("/registerUser", async (req,res) => { // hashed is a bcrypt variable that helps you encrypt important things like passwords which is done here
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  console.log(hashedPassword)
  UserModel.saveUser(req.body.email, hashedPassword );

  res.redirect("/forum");
});

app.post("/login", async (req,res) => { // Checks if the password matches the "userpassword" which if it does it will say success otherwise it will say Fail
  const user = await UserModel.getUser(req.body.email);
  await bcrypt.compare(req.body.password, user.password, (err, success) =>{
    console.log(user);
    if(err){
      console.log(err);
    }
    
    if(success) console.log("Success");
    else console.log("Fail");

  });

  res.redirect("/forum");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


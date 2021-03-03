const express = require("express");
const app = express();
const port = 3000;
const staticDir = __dirname + "\\static\\";

app.use(express.static(staticDir));
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => res.sendFile(staticDir + "html\\index.html"));

app.get("/contact", (req, res) =>
  res.sendFile(staticDir + "html\\contact.html")
);

app.post("/contact", function (req, res) {
  console.log(req.body.fname);
  console.log(req.body.date);
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

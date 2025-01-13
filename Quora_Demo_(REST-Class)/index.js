const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const port = 8080;

app.use(express.urlencoded({ extended: true })); // Parse data
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); // Set view engine
app.set("views", path.join(__dirname, "views")); // Link 'views' folder

app.use(express.static(path.join(__dirname, "public"))); // Link 'public' folder

// Posts Data
let posts = [
  {
    id: uuidv4(),
    username: "anonymouse",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "anonymouse2",
    content: "Hard work is important to achieve success.",
  },
  {
    id: uuidv4(),
    username: "anonymouse3",
    content: "I got selected for my 1st internship!",
  },
];

// Home Route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// New Route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Show Route
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// Edit Route
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Delete Route
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("Listening to post : 8080");
});

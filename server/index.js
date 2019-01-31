require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const app = express();
const check = require("./middlewares/checkForSession");
const { read } = require("./controllers/swag_controller");
const {
  login,
  register,
  signout,
  getUser
} = require("./controllers/auth_controller");

const { search } = require("./controllers/search_controller");

const { add, remove, checkout } = require("./controllers/cart_controller");

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(check);
app.use(express.static(`${__dirname}/../build`));

app.get("/api/swag", read);
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/signout", signout);
app.get("/api/user", getUser);

//cart
app.post("/api/cart", add);
app.post("/api/cart/checkout", checkout);
app.delete("/api/cart", remove);

//search
app.get("/api/search", search);

app.listen(SERVER_PORT || 3000, () =>
  console.log(`Listening on ${SERVER_PORT}`)
);

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/full-mern-jwt");

app.post("/api/register", async (req, res) => {
  try {
    const result = await User.create({
      name: req.body.submit.user,
      email: req.body.submit.email,
      password: req.body.submit.pass,
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/api/login", async (req, res) => {
  const result = await User.findOne({
    email: req.body.email,
    password: req.body.pass,
  });
  if (result) {
      const token  = jwt.sign({
        email : result.email,
        name : result.name
      }, 'secret123')

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: "false" });
  }
});

app.get("/api/quote", async (req, res) => {
   
  const token = req.headers['x-access-token']

  try {
    const decoded  = jwt.verify(token,'secret123')
    const email = decoded.email
    const user  =await User.findOne({email:email})
    return res.json({staus:'ok', quote: user.quote})
  } catch (error) {
    console.log('error')
    res.json({status : 'error',error :'Invalid token'})
  }


});
app.post("/api/quote", async (req, res) => {
   
  const token = req.headers['x-access-token']

  try {
    const decoded  = jwt.verify(token,'secret123')
    const email = decoded.email
    await User.updateOne({email:email},{$set:{quote : req.body.quote}})
    return res.json({staus:'ok'})
  } catch (error) {
    console.log(error)
    res.json({status : 'error',error :'Invalid token'})
  }


});


app.get("*", (req, res) => {
  res.send("page does not exist ");
});
app.listen(8080, () => {
  console.log("welcome to port 8080");
});

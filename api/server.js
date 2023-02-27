const express = require("express");
const app = express();
const cors = require("cors");  //middle ware to connect two address 
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcryptjs")
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/full-mern-jwt");

app.post("/api/register", async (req, res) => {

  try {
    const newPassword  = await bcrypt.hash(req.body.submit.pass,10)
    const result = await User.create({
      name: req.body.submit.user,
      email: req.body.submit.email,
      password: newPassword,
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/api/login", async (req, res) => {
  const result = await User.findOne({
    email: req.body.email,
  });
  if(!result){return res.json({status: "error", user: false })}
  const isPasswordValid = await bcrypt.compare(req.body.pass, result.password)
  if (isPasswordValid) {
      const token  = jwt.sign({
        email : result.email,
        name : result.name
      }, 'secret123')

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/quote", async (req, res) => {
   
  const token = req.headers['x-access-token']

  try {
    const decoded  = jwt.verify(token,'secret123')
    const email = decoded.email
    const user  =await User.findOne({email:email})
    return res.json({status:'ok', quote: user.quote})
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
    return res.json({status:'ok' , done : 'done'})
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

require("dotenv").config();
const express = require("express");
const app = express();
const db = require(process.env.localBancodeDados);
const bodyParser = require("body-parser");

const PORT = process.env.porta;
app.listen(PORT, function () {});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//conexão com o banco de dados:

db.authenticate()
  .then(() => {
    console.log("Conectou com o banco de dados");
  })
  .catch((err) => {
    console.log("Ocorreu um erro ao conectar com banco de dados!", err);
  });

//routes

//Tutor routes
//app.use("/", require(process.env.rotaParaTutorsRoutes));

//Pets routes
//app.use("/", require(process.env.rotaParaPetsRoutes));

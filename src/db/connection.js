require("dotenv").config();

const mongoose = require("mongoose");
const password = process.env.password;
const uname = process.env.uname



const con_string = 'mongodb+srv://'+uname+':'+password+'@cluster0.dnwerzh.mongodb.net/card?retryWrites=true&w=majority';

mongoose.connect(con_string);
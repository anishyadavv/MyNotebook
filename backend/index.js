const mongoose = require('mongoose');
const express = require('express');
const app = express();
require("dotenv").config();
const URI = process.env.MONGOURI;
mongoose.connect(URI);

app.use(express.json());//this is a middleware to use req.body 

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/',(req,res)=>{
    res.send('Hello Anish');
});
app.listen(5000,()=>{console.log('listening on port 5000');});
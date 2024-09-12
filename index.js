const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const {getUsers} = require("./controllers/userController");

dotenv.config();
const app = express();

app.use(cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.get('/test', function(req, res){
    res.send('test');
})
app.get('/json', function(req, res){
    res.json({message:'hello world'});
})
app.get('/users', getUsers)
app.get('/', function(req, res){
    res.send('API is running...');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB();
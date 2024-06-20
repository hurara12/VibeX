import cors from "cors";
import express from "express";
import 'dotenv/config';
import bodyParser from 'body-parser'
import CONNECT_DATABASE from "./ConnectDatabase.js";


import AUTH_ROUTE from "./routes/auth/auth.js";
import GENERALS_ROUTE from "./routes/generals/generals.js"
import CATALOGUE_ROUTE from "./routes/catalogue/catalogue.js";
import SPACES_ROUTE from "./routes/spaces/spaces.js";

// const SIGNUP_ROUTE=require("./routes/Auth/signup");

const app=express();   
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
CONNECT_DATABASE();

app.use(cors());

// app.use('/api/signup', SIGNUP_ROUTE); 
app.use('/api/auth',AUTH_ROUTE);
app.use('/api/generals',GENERALS_ROUTE);
app.use("/api/catalogue",CATALOGUE_ROUTE);
app.use("/api/spaces",SPACES_ROUTE);


app.get("/", (req, res) => {
    const countryNames = ["United States", "Canada", "United Kingdom"];
    res.json({ countries: countryNames });
});

app.listen(5001,()=>{
    console.log("Server Started on Port 5001");
});
require("dotenv").config();
const pg= require("pg");

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

pool.connect((err)=>{
    if(err) throw err;
    console.log("connection with db successful")
})

module.exports=pool;
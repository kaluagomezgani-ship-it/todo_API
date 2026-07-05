require("dotenv").config(); 
const pool=require("./db.js")
const express=require("express");
const app=express();

app.use(express.json());

app.get("/tasks",(req,res)=>{
    pool.query("SELECT * FROM tasks", (error,result) => {
        if(error) throw error
        res.status(200).json(result.rows)
    })
})

app.get("/tasks/:id",(req,res)=>{
    const id=req.params.id;
    pool.query("SELECT * FROM tasks WHERE id=$1",[id],(error,results)=>{
        if(error) throw error
        res.status(200).json(results.rows);
    })
})
app.post("/tasks",(req,res)=>{
    const {id,task,status}=req.body;
    pool.query("INSERT INTO tasks (id,task,status) VALUES ($1,$2,$3)",[id,task,status],(err,results)=>{
        if(err) throw err
        res.status(200).json({"message":"successfully saved task"})
    })
})
app.put("/tasks/update/:id",(req,res)=>{
    const id=req.params.id;
    const status=true;

    pool.query("UPDATE tasks SET status=$1 WHERE id=$2", [status,id],(err,results)=>{
        if (err){
            console.log(err);
            return res.status(500).json({"error": "internal server error"})
        }
        res.status(200).json({"messege" : "status updated"})
    } )
    
})


app.listen("3000",()=>{
    console.log("helloworld")
})

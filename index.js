const express = require('express')
const app = express();
app.use(express.json());

const data =[
    {id:1,email:"alice@example.com",password:"alice123"},
    {id:2,email:"bob@example.com",password:"bob123"},
    {id:3,email:"charlie@example.com",password:"charlie123"},
]


app.put("/update/:id",(req,res)=>{
    try {
        const {id} = req.params;
    if(!id){
        return res.status(400).send({message:"give the id as params"});
    }
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).send({message:"enter email and password"});
    }

    const newData = data.map((ele,idx)=>{
        if(id==ele.id){
            data[idx]= {
                id:ele.id,
                email,
                password
            }
        }
        return ele;
    })

    const data = newData;
        return res.status(200).send({message:"updated sucessfully",data:data})
    } catch (error) {
        return res.status(500).send({message:"something went wrong",error})
    }
    
})
app.delete('/delete/:id',(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message:"enter the id in params"});
        }
        const newdata = data.splice(id,1);
        const data = newdata;
       return  res.status(200).send({message:"deleted sucessfully",data});
    } catch (error) {
        return res.status(500).send({message:"something went wrong",error})   
    }
})
app.listen(5000,()=>{
    console.log("running on local host 5000");
})
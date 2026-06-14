const router=require('express').Router()
const db=require('../db')
const bycrypt=require('bcrypt')
router.post('/',async (req,res)=>{
    const {Fname,lname,email,password,role}=req.body
    const pass=await bycrypt.hash(password,10)
    try{
        const result=await db.query('INSERT INTO TaskFlowusers(FirstName,LastName,Email,Password,Role) VALUES($1,$2,$3,$4,$5)',[Fname,lname,email,pass,role])
        if(result.rowCount>0){
            console.log(result)
            res.status(200).json({message:'User registered successfully'})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Error registering user'})
    }
})
module.exports=router;
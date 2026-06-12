const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send('Taskflow initialized')
})
app.listen(2000,()=>{
    console.log('listening on 2000')
})
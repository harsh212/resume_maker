const express=require('express');
const User=require("../model/user");
const router=express.Router();

router.get("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const userInfo=await User.findById({_id: id},{_id:0,skills: 1})
        if(!userInfo){
            res.status(404).json({
                error: "Data not found"
            })
        }
        else{
            res.status(200).json(userInfo);
        }
    }catch(e){
        res.json({error: e})
        console.log(e);
    }
})

router.patch("/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=await User.findByIdAndUpdate({_id: id},
         {$push:{skills: {$each: req.body.data}}},{new: true})
         res.json(updatedData);
    }catch(e){
        res.json(e);
        console.log(e);
    }
})

router.patch("/remove/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        const deletedData=await User.findByIdAndUpdate({_id: id},
         {$pull:{skills: {_id: req.body.id}}},{new: true});
         res.json(deletedData);
    }catch(e){
        res.json(e);
        console.log(e);
    }
})

module.exports=router;

const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../confg");
const { authMiddleware } = require("../middleware");



const signupSchema = zod.object({
  username : zod.string().email(),
  password : zod.string(),
  firstName : zod.string().optional(),
  lastName :  zod.string().optional()
  
})

const signinSchema = zod.object({
  username : zod.string().email(),
  password : zod.string()
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.post("/signup" , async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
     return res.status(401).json({
        message: "Incorrect Inputs"
      })
    }

    const user = await User.findOne({
      username : body.username
    });

    if(user){
      return res.status(401).json({
        message: "Email Already Exists"
      })
    }



    const dbuser = await User.create(body);
    const userId = dbuser._id;

    const token = jwt.sign({
      userId : dbuser._id
    } , JWT_SECRET);

    await Account.create({
      userId,
      balance : 1+Math.random()*1000
    })

    res.json({
      message : "User Created Successfully",
      token : token
    })


  })

router.post("/signin" , async (req,res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    // Success -> True -> Proceed'
    if(!success){
      return res.status(411).json({
        message : "Incorrect Inputs."
      })
    }

    const user = await User.findOne({
      username : body.username,
      password : body.password
    });

    if(user){
      const token = jwt.sign({
        userId:user._id
      },JWT_SECRET);

      res.json({
        token : token
      })

    }

    res.status(411).json({
      message : "PassWord/Username Is Wrong"
    })
})




router.put("/update" ,authMiddleware ,async (req,res)=>{
    const body = req.body;
    const {success} = updateSchema.safeParse(body);

    if( !success){
      res.json({
        message : "Inputs Are SomeWhere failed"
      })

      await User.updateOne(
        {_id:req.userId} , req.body)
    }

    res.json({
      message : "Updated Successfully"
    })
})


router.get("/bulk"  ,async(req,res)=>{
    
  try{
    const users = await User.find({});
    res.json({
      users
    })
  }catch{
    res.status(404).json({
      message : "Something Went Wrong"
    })
  }
})


module.exports = router;
const express = require('express');
const { User, Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();


router.get("/balance" ,async(req,res)=>{
    const body = req.body;
    const account = await Account.findOne({
      userId: body.userId
    })

    if(account){
      return res.json({
        balance : account.balance
      })
      }else{
        return res.status(411).json({
          message : "Account Is Not In Database."
        })
    }
})


router.post("/transfer" , async (req,res)=>{

  const session = await mongoose.startSession();

  session.startTransaction();
  const {amount , to , userId} = req.body;

  const account = await Account.findOne({userId:userId}).session(session);

  // Validate The User
  if(!account){
      return res.json({
        message : "Account Not Found"
      })
  }else if( account.balance < amount)
  {
    await session.abortTransaction();
    return res.status(400).json({
        message : "Insufficient Funds"
    });
  }

  // Check For Other Account
  const toAccount = await Account.findOne({userId : to}).session(session)
  if(!toAccount){
    return res.json({
      message : "Invalid Account Details!"
    })
  }


  // Update The Balances.
  
    await Account.updateOne({userId:req.userId} , {$inc : {balance:-amount}}).session(session);
    await Account.updateOne({userId:to} , {$inc : {balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
      message : "Transaction Successful."
    })
})


module.exports = router;
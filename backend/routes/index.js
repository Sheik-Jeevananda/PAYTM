const express = require('express')
const userRouter = require("./user")
const accountRouter = require("./account");

const router = express.Router();

// api/v1/user/..... 
router.use("/user" , userRouter);
// api/v1/account/....
router.use("/account" , accountRouter);


module.exports = router;
// /api/v1/user
// /api/v1/Another.

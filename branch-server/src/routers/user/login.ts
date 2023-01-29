import express from "express";
import bodyParser from "body-parser";
import asyncHandler from "express-async-handler";
import Account from "../../models/userModel";
import bcrypt from "bcrypt";
const bodyParse = bodyParser.json();
const guestLogin = express.Router();

//registe!!
guestLogin.post(
  "/guestlogin",bodyParse,
  asyncHandler(async (req, res) => {
    const password = await bcrypt.hash('abc123',10)
    const {name, email}=req.body
    const use= new Account({
        name, email, password, isGuest:true
    })
    const guest = await use.save()
    res.send(guest);
  })
);

guestLogin.get(
    '/',asyncHandler(
       async (_,res) => {
        const allusers = await Account.find()
        res.send(allusers)
       }
    )
)

guestLogin.get(
    '/guestlogin/:id', asyncHandler(async (req, res) => {
        const guest =await Account.findById(req.params.id);
        if (guest) {
          res.json(guest);
        } else {
          res.status(404);
          throw new Error("yser not exist");
        }
      })
)

guestLogin.get(
  "/deleteall",
  asyncHandler(async (_, res) => {
    await Account.remove()
    res.send('deleted')
  })
);
export default guestLogin;

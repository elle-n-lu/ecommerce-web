import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express from "express";
import asyncHandler from "express-async-handler";
import { Redis } from "ioredis";
import "dotenv-safe/config";
import { v4 } from "uuid";
import Account from "../../models/userModel";
import { isAuth } from "../../Utils/adminAuth";
import { nodemail } from "../nodemail";
const bodyParse = bodyParser.json();
const userLogin = express.Router();

userLogin.post(
  "/forgotpassword/:id",
  bodyParse,
  asyncHandler(async (req, res) => {
    const user = await Account.findOne({ email: req.body.email });
    if (!user) {
      res.status(404);
      throw new Error("user not exist");
    }

    const token = v4();
    const FORGET_PSD_PREFIX = "forgot password";
    const redis = new Redis();
    await redis.set(FORGET_PSD_PREFIX + token, req.params.id);
    await nodemail(
      req.body.email,
      `<a href="${process.env.ORIGIN}/changePsd/${token}">reset password</a>`
    );
    res.send("email sent");
  })
);

userLogin.post(
  "/changePsd/:id",
  bodyParse,
  asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const FORGET_PSD_PREFIX = "forgot password";
    const key = FORGET_PSD_PREFIX + req.params.id;
    const redis = new Redis();
    const userId = await redis.get(key);
    if (!userId) {
      res.status(404);
      res.json({
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      });
    } else {
      const use = await Account.findById({ _id: userId });
      if (use) {
        if (await bcrypt.compare(oldPassword, use.password)) {
          const newCptPsd = await bcrypt.hash(newPassword, 10);
          use.password = newCptPsd;
          const changeRes = await use.save();
          if (changeRes) {
            await redis.del(key);
            res.status(201).json({
              _id: changeRes._id,
              name: changeRes.name,
              email: changeRes.email,
              avatarURL: changeRes.avatarUrl,
            });
          }
        } else {
          res.status(404);
          res.json({
            errors: [
              {
                field: "oldpassword",
                message: "old password wrong",
              },
            ],
          });
        }
      } else {
        res.status(500);
        throw new Error("user not exist");
      }
    }
  })
);

userLogin.post(
  "/admin",
  bodyParse,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const isExist = await Account.findOne({ email });
    if (isExist) {
      res.status(400);
      throw new Error("user exists");
    }
    const cptPsd = await bcrypt.hash(password, 10);
    const user = await Account.insertMany({
      name,
      email,
      password: cptPsd,
      isAdmin: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400);
      throw new Error("input not correct");
    }
  })
);

userLogin.get(
  "/me",
  isAuth,
  asyncHandler(async (req, res) => {
    const user = await Account.findById(req.session.userId);
    if (!user) {
      throw new Error("need login");
    } else {
      res.send(user);
    }
  })
);

userLogin.post(
  "/useRegiste",
  bodyParse,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const isExist = await Account.findOne({ email });
    if (isExist) {
      res.status(400);
      throw new Error("user exists");
    }
    if (name === "") {
      res.status(400);
      res.json({
        errors: [
          {
            field: "username",
            message: "username needed",
          },
        ],
      });
      throw new Error("input not correct");
    }
    if (email === "") {
      res.status(400);
      res.json({
        errors: [
          {
            field: "email",
            message: "email needed",
          },
        ],
      });
      throw new Error("input not correct");
    }
    if (name === "") {
      res.status(400);
      res.json({
        errors: [
          {
            field: "password",
            message: "password needed",
          },
        ],
      });
      throw new Error("input not correct");
    }
    const cptPsd = await bcrypt.hash(password, 10);
    const user = await Account.insertMany({
      name,
      email,
      password: cptPsd,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400);
      throw new Error("input not correct");
    }
  })
);

userLogin.post(
  "/useLogin",
  bodyParse,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Account.findOne({ email });
    if (!user) {
      res.status(400);
      res.json({
        errors: [
          {
            field: "email",
            message: "user not exist",
            password: "",
          },
        ],
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user._id;
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      res.status(500).json({
        errors: [
          {
            field: "password",
            message: "password not correct",
          },
        ],
      });
      throw new Error("input not correct");
    }
  })
);

userLogin.post("/useLogout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("qid");
    if (err) {
      throw new Error(err);
    }
    res.send("removed");
  });
});

userLogin.post(
  "/useDelete/:id",
  asyncHandler(async (req, res) => {
    const use = await Account.deleteOne({ _id: req.params.id });
    if (use) {
      res.send("deleted");
    } else {
      throw new Error("error");
    }
  })
);

userLogin.put("/uploadAvatar/:id", bodyParse, async (req, res) => {
  const use = await Account.findById(req.params.id);
  const { avatarUrl } = req.body;

  if (use) {
    use.avatarUrl = avatarUrl;
    const produ = await use.save();

    res.status(201).json({
      _id: produ._id,
      name: produ.name,
      email: produ.email,
      avatarURL: produ.avatarUrl,
    });
  } else {
    const addProduct = await Account.insertMany(req.body);
    res.send(addProduct);
  }
});

userLogin.put(
  "/update/:id",
  bodyParse,
  asyncHandler(async (req, res) => {
    const product = await Account.findById({ _id: req.body._id });
    const { name, email, contact } = req.body;
    if (product) {
      product.name = name;
      product.email = email;
      product.contact = contact;

      const produ = await product.save();

      res.status(201).json(produ);
    } else {
      const addProduct = await Account.insertMany(req.body);
      res.send(addProduct);
    }
  })
);

userLogin.get("/userDetail/:id", bodyParse, async (req, res) => {
  const use = await Account.findById(req.params.id);
  if (use) {
    res.send(use);
  } else {
    res.send(404).send("user not exist");
  }
});

export default userLogin;

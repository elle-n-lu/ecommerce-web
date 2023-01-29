import connectRedis from "connect-redis";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import redis from "ioredis";
import dbcommect from "./db/dbConfig";
import Account from "./models/userModel";
import AddData from "./routers/admin/addData";
import { upload } from './routers/cloudinary';
import { multerupload } from "./routers/multerupload";
import { strippay } from "./routers/strip/striPay";
import guestLogin from "./routers/user/login";
import AddOrder from "./routers/user/shipping";
import userLogin from "./routers/user/userlogin";
import { errorHandle, notFound } from "./Utils/errorHandle";



dbcommect();

// nodemail('bob@bob.com', 'halo nchwoed')

const app = express();
const redisStore = connectRedis(session);
const client = new redis(process.env.NODE_ENV==='production'? process.env.REDIS_URL :"127.0.0.1:6379");

app.set("trust proxy", 1);

// app.use(cors({credentials:true, origin:'https://main--lovely-marshmallow-ab9f95.netlify.app/'}))
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",process.env.NODE_ENV==="production"?"https://lovely-marshmallow-ab9f95.netlify.app":"http://localhost:3000" );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
});

app.use(
  session({
    name: "qid",
    store: new redisStore({
      client,
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      secure:process.env.NODE_ENV==="production"?true: false,
      httpOnly: true,
      sameSite: process.env.NODE_ENV==="production"? "none": "lax",
    },
  })
);

app.get('/paypal',async (_, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})


app.use("/api/import", AddData);
app.use("/api/order", AddOrder);
app.use("/api/guest", guestLogin);
app.use("/api/user", userLogin);
app.use("/api/stripe", strippay)
app.post('/upload',multerupload.single('image'), async(req, res)=>{
  if (!req.file){
    res.status(404).send('ohho')
    throw new Error('no file')
  }else{

    const {path} = req.file
    const cloudFile = await upload(path);
    if(cloudFile){
    res.status(201).json({
        message:'Image uploaded successfully',
        imageUrl:cloudFile.secure_url
    })}else{
      res.status(404).send('error, file not right')
    }
  }
})


app.get("/rm", async (_: any, res: any) => {
  await Account.remove();
  res.send("removed");
});



app.use(notFound);
app.use(errorHandle);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server started on port ${port}`));

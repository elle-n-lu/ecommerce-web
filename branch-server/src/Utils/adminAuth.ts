import asyncHandler from "express-async-handler";



const isAuth = asyncHandler(async (req, _, next) => {
  if(req.session.userId){
    next()
  }
})

const adminAuth = asyncHandler(async (req, res, next) => {
  if (req.session && req.session.userId === '63c9f1363f2c08519632dea0') {
    next();
  } else {
    res.status(404);
    throw new Error("User Not authorised");
  }
});
export { adminAuth, isAuth };

import express from "express";
import "dotenv-safe/config";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import bodyParser from "body-parser";

export const strippay = express.Router();
const bodyParse = bodyParser.json();

strippay.post("/products", bodyParse, async (req, res) => {
  const product = await stripe.products.create({
    name: req.body.title,
    default_price_data: { unit_amount: req.body.price*100, currency: "usd" },
    expand: ["default_price"],
  });
  if (product) {
    res.send(product);
  } else {
    throw new Error("not work");
  }
});

strippay.get("/product/:id", bodyParse, async (req, res) => {
  const products = await stripe.prices.search({
    query: `active:\'true\' AND product:\'${req.params.id}\'`,
  });
  if (products) {

    res.send(products);
  } else {
    throw new Error("get error");
  }
});

strippay.post(
  "/create-checkout-session",
  bodyParse,
  async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: `https://lovely-marshmallow-ab9f95.netlify.app/?success=true`,
      cancel_url: `https://lovely-marshmallow-ab9f95.netlify.app/order`,
    });
    if (session) {
        res.json({url: session.url}) 
    } else {
      throw new Error("unknown error");
    }
  }
);

strippay.get("/delete/:id", bodyParse, async (req, res) => {
  await stripe.products.del(req.params.id);
  res.send("deleted");
});

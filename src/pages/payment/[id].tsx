import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MainPage from "../../components/mainPage";
import {
  useCheckOrderQuery,
  useStripPayMutation
} from "../../features/products/productSlice";
import { RootState } from "../../store/store";
interface paymentProps {}

const Payment: React.FC<paymentProps> = ({}) => {
  const { id } = useParams();
  const { data: order } = useCheckOrderQuery(id as string);
  const [paybustripe] = useStripPayMutation();
  const cart = useSelector((state: RootState) => state.carter.cart);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.carter.cart);
  if (cartItems.length === 0) {
    navigate("/cart");
  }

  const priceList = cart.reduce(function (prev: any[], cur) {
    return [...prev, { price: cur.cart.priceStrip, quantity: cur.qty }];
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      alert(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  const body2 = (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              { amount: { value: order!.totalCost.toString() } },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions!.order!.capture().then((details) => {
            const name = details.payer!.name!.given_name;
            alert(`Transaction completed by ${name}`);
            //----------------------------------------
            // update order details about payment!
          });
        }}
      />
    </PayPalScriptProvider>
  );
  const body3 = (
    <button
      onClick={async () => {
        const res = await paybustripe(priceList);
        if ("data" in res) {
          window.location.href = res.data.url;
        }
      }}
    >
      <img
        src="https://res.cloudinary.com/dueldevdc/image/upload/v1673854927/tfpxsutpqhsfw2txwbkh.png"
        style={{ marginLeft: "75%", width: "50%" }}
        alt='stripe'
      />
    </button>
  );
  const [val, setVal] = useState(1);
  const body = (
    <div className=" pt-8">
      <div className=" container items-center justify-center mx-auto w-full md:w-1/2">
        <div className=" flex h-14 mb-14">
          <button
            className={`w-1/2 ${val === 1 ? "bg-slate-400" : ""}`}
            onClick={() => setVal(1)}
          >
            paypal
          </button>
          <button
            className={`w-1/2 ${val === 2 ? "bg-slate-400" : ""}`}
            onClick={() => setVal(2)}
          >
            stripe
          </button>
        </div>

        {val === 1 && <>{body2}</>}
        {val === 2 && <>{body3}</>}
      </div>
    </div>
  );
  return (
    <div>
      <MainPage body={body} />
    </div>
  );
};

export default Payment;

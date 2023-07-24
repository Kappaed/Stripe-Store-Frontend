import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../../helpers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user-context";
import { useContext } from "react";

const CustomCheckout = ({ shipping, cartItems }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const [cards, setCards] = useState(null);
  const [payment, setPayment] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const { user } = useContext(UserContext);
  const elements = useElements();
  const stripe = useStripe();

  const navigate = useNavigate();

  const handleCheckout = async () => {
    setProcessing(true);
    let si;
    if (saveCard) {
      si = await fetchFromAPI("save-payment-method");
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
    } else {
      if (saveCard && si) {
        await stripe.confirmCardSetup(si.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        });
        navigate("/success");
      } else {
        navigate("/success");
      }
    }
  };

  const savedCardCheckout = async () => {
    setProcessing(true);
    const { clientSecret } = await fetchFromAPI("update-payment-intent", {
      body: { paymentIntentId },
      method: "PUT",
    });
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payment,
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      navigate("/success");
    }
  };

  useEffect(() => {
    if (user) {
      const savedCards = async () => {
        try {
          const cardsList = await fetchFromAPI("get-payment-methods", {
            method: "GET",
          });
          setCards(cardsList);
        } catch (error) {
          console.log(error);
        }
      };
      savedCards();
    }

    if (shipping) {
      const items = cartItems.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      }));

      const body = {
        cartItems: items,
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address,
          },
        },
        description: "payment intent for nomad shop",
        receipt_email: shipping.email,
      };
      const CustomCheckout = async () => {
        const { clientSecret, id } = await fetchFromAPI(
          "create-payment-intent",
          {
            body,
          }
        );
        setClientSecret(clientSecret);
        setPaymentIntentId(id);
      };

      CustomCheckout();
    }
  }, [shipping, cartItems, user]);

  const cardHandleChange = (event) => {
    const { error } = event;
    setError(error ? error.message : "");
  };

  const CardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#606060",
        },
      },
      invalid: {
        color: "fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  let cardOption;

  if (cards) {
    cardOption = cards.map((card) => {
      const {
        card: { brand, last4, exp_month, exp_year },
      } = card;
      return (
        <option key={card.id} value={card.id}>
          {`${brand}/ **** **** **** ${last4} ${exp_month}/${exp_year}`}
        </option>
      );
    });
    cardOption.unshift(<option key="Select a card"> Select a Card </option>);
  }
  // console.log("user", user);
  // console.log("cards", cards);

  return (
    <div>
      {user && cards && cards.length > 0 && (
        <div>
          <h4>Pay with saved card</h4>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            {cardOption}
          </select>
          <button
            type="submit"
            disabled={processing || !payment}
            className="button is-black nomad-btn submit saved-card-btn"
            onClick={() => savedCardCheckout()}
          >
            {processing ? "PROCESSING" : "PAY WITH SAVED CARD"}
          </button>
        </div>
      )}
      <h4>Enter Payment Details</h4>
      <div className="stripe-card">
        <CardNumberElement
          className="card-element"
          options={CardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className="stripe-card">
        <CardExpiryElement
          className="card-element"
          options={CardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className="stripe-card">
        <CardCvcElement
          className="card-element"
          options={CardStyle}
          onChange={cardHandleChange}
        />
      </div>
      {user && (
        <div className="save-card">
          <label>Save Card</label>
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
          />
        </div>
      )}
      <div className="submit-btn">
        <button
          className="button is-black nomad-btn submit"
          onClick={() => handleCheckout()}
          disabled={processing}
        >
          {processing ? "PROCESSING" : "PAY"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CustomCheckout;

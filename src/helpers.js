import { auth } from "./firebase";
export const isInCart = (products, id) =>
  products.findIndex((product) => product.id === id) !== -1;

const API = "https://stripe-store-backend-production.up.railway.app";

export const fetchFromAPI = async (endpoint, opts) => {
  const { method, body } = {
    method: "POST",
    body: null,
    ...opts,
  };
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());

  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

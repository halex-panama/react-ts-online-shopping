import { Carts } from "../store/cartSlice";

type Props = {
  cartItems: Carts[];
};

const CheckoutButton = ({ cartItems }: Props) => {
  const handleCheckout = async () => {
    await fetch("https://shopi-server.vercel.app/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-3 text-white bg-primary py-2"
    >
      Check Out
    </button>
  );
};

export default CheckoutButton;

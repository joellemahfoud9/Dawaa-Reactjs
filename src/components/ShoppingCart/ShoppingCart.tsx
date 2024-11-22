import { useState, useEffect } from "react";
import { cartData } from "../../constant/index";
import { CartItem } from "../../models/Cart";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setCartItems(cartData);
  }, []);

  useEffect(() => {
    const total =
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      shipping -
      discount;
    setTotalAmount(total);
  }, [cartItems, shipping, discount]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  return (
    <div>
      <div className=" min-h-screen flex justify-center items-center">
        <div className="w-full max-w-2xl p-6 bg-white shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Shopping Cart
          </h1>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 max-sm:flex-col"
              >
                <div className="min-w-72 flex items-center sm:space-x-4 max-sm:flex-col">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded"
                  />
                  <div className="max-sm:flex max-sm:flex-col max-sm:items-center">
                    <h2 className="font-medium">{item.name}</h2>
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-center max-sm:flex-col max-sm:gap-0">
                  <p>${item.price}.00</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="border w-12 text-center rounded mx-2"
                    min="1"
                  />
                </div>
                {/* (|| 1 ) fix for nan price */}
                <p>${item.price * (item.quantity || 1)}.00</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 font-semibold hover:underline sm:ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Coupon Code */}
          <div className="flex items-center mt-6 max-sm:flex-col max-sm:gap-4">
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <button
              onClick={applyCoupon}
              className="bg-black text-white px-4 py-2 rounded ml-2"
            >
              Apply
            </button>
          </div>

          {/* Shipping and Summary */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:gap-4">
              <label className="text-gray-700">Shipping</label>
              <select
                value={shipping}
                onChange={(e) => setShipping(Number(e.target.value))}
                className="border px-4 py-2 rounded"
              >
                <option value={0}>Standard Delivery - $0</option>
                <option value={10}>Express Delivery - $10</option>
              </select>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-gray-700">Total</span>
              <span className="text-xl font-semibold">${totalAmount}.00</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-black text-white py-3 mt-6 font-semibold rounded">
            Proceed To Checkout
          </button>

          {/* Footer Links */}
          <div className="flex justify-center space-x-4 mt-6 text-sm text-gray-600 flex-wrap">
            <a href="#policy">Policy</a>
            <a href="#terms">Terms</a>
            <a href="#faq">FAQ</a>
            <a href="#support">Support</a>
          </div>

          <div className="flex justify-center space-x-4 mt-4 text-sm text-gray-600 flex-wrap">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
            <a href="#youtube">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

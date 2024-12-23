import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import API from "../service/api";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Replace with actual user ID logic
        const response = await API.post("/cart/get-cart", { userId });
        if (response.data.success) {
          setCartItems(response.data.cart.productsInCart);
          calculateTotal(response.data.cart.productsInCart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQty) => {
    try {
      if (newQty < 1) return;
      // Replace with actual user ID logic
      await API.put("/cart/update-quantity", {
        userId,
        productId,
        productQty: newQty,
      });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, productQty: newQty } : item
        )
      );
      calculateTotal(cartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      // Replace with actual user ID logic
      const response = await API.post("/cart/delete-items", {
        userId,
        productId,
      });
      if (response.data.message === 'Item deleted successfully.') {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
        calculateTotal(cartItems.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.productQty * 30, 0); // Assuming a price of $30 per item for simplicity
    setTotal(subtotal);
  };

  return (
    <div className="w-full">
      <div className="p-5 sm:p-2">
        <h1 className="text-3xl font-light text-center">YOUR BAG</h1>
        <div className="flex items-center justify-between p-5 sm:flex-col sm:gap-4">
          <button className="px-4 py-2 font-semibold bg-transparent border border-black cursor-pointer">
            CONTINUE SHOPPING
          </button>
        </div>
        <div className="flex flex-wrap justify-between gap-5">
          {/* Info Section */}
          <div className="flex-[3] flex flex-col gap-5">
            {cartItems.map(item => (
              <div
                key={item.productId}
                className="flex justify-between flex-wrap gap-5 border-b pb-5"
              >
                <div className="flex flex-wrap flex-[2] gap-5">
                  <img
                    className="w-48"
                    src={item.productImage || "https://via.placeholder.com/150"} // Replace with actual image source
                    alt={`Product ${item.productId}`}
                  />
                  <div className="flex flex-col justify-around gap-2">
                    <span>
                      <b>Product:</b> {item.productName || "Sample Product"}
                    </span>
                    <span>
                      <b>ID:</b> {item.productId}
                    </span>
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: "black" }}
                    ></div>
                    <span>
                      <b>Size:</b> {item.productSize || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-[1] gap-3">
                  <div className="flex items-center">
                    <Add
                      className="cursor-pointer"
                      onClick={() => handleQuantityChange(item.productId, item.productQty + 1)}
                    />
                    <span className="text-lg mx-2 sm:mx-5">{item.productQty}</span>
                    <Remove
                      className="cursor-pointer"
                      onClick={() => handleQuantityChange(item.productId, item.productQty - 1)}
                    />
                  </div>
                  <span className="text-2xl font-light">$ {item.productQty * 30}</span> {/* Replace with dynamic price */}
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Summary Section */}
        </div>
        <div className="flex-[1] w-full sm:w-full border border-gray-300 rounded-lg p-5">
          <h1 className="text-2xl font-light">ORDER SUMMARY</h1>
          <div className="flex justify-between my-5">
            <span>Subtotal</span>
            <span>$ {total}</span>
          </div>
          <div className="flex justify-between my-5">
            <span>Estimated Shipping</span>
            <span>$ 5.90</span>
          </div>
          <div className="flex justify-between my-5">
            <span>Shipping Discount</span>
            <span>$ -5.90</span>
          </div>
          <div className="flex justify-between my-5 text-lg font-medium">
            <span>Total</span>
            <span>$ {total}</span>
          </div>
          <button className="w-full px-4 py-2 text-white bg-black font-semibold">
            CHECKOUT NOW
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Cart;

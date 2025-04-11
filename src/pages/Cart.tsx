import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  // Simulating fetch from a dummy API
  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await fetch('https://fakestoreapi.com/products'); // Dummy API
      const products = await data.json();

      // Selecting the first few products as cart items
      const cartData: CartItem[] = products.slice(0, 5).map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      }));

      setCartItems(cartData);
    };

    fetchCartItems();
  }, []);

  // Recalculate total
  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      cartItems.forEach(item => {
        sum += item.price * item.quantity;
      });
      sum -= discount; // Apply discount
      setTotal(sum);
    };

    calculateTotal();
  }, [cartItems, discount]);

  // Handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Handle remove item from cart
  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Apply coupon code
  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(total * 0.1); // 10% discount
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="d-flex">
          {/* Left Section - Cart Items */}
          <div className="flex-grow-1">
            <div className="d-flex flex-wrap">
              {cartItems.map(item => (
                <div key={item.id} className="card mr-3 mb-3" style={{ width: '18rem' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">${item.price}</p>

                    <div className="d-flex justify-content-between">
                      <div className="quantity">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Calculation and Coupon */}
          <div className="ml-4" style={{ maxWidth: '300px' }}>
            <h4>Total: ${total.toFixed(2)}</h4>

            <div className="mt-4">
              <h5>Have a coupon?</h5>
              <div className="d-flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="form-control mr-2"
                  placeholder="Enter coupon code"
                />
                <button onClick={applyCoupon} className="btn btn-success">
                  Apply Coupon
                </button>
              </div>
              {discount > 0 && (
                <div className="mt-2 text-success">
                  <p>Coupon applied: 10% off</p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <Link to="/checkout" className="btn btn-primary">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

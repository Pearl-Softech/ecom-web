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

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await fetch('https://fakestoreapi.com/products');
      const products = await data.json();

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

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      cartItems.forEach(item => {
        sum += item.price * item.quantity;
      });
      sum -= discount;
      setTotal(sum);
    };

    calculateTotal();
  }, [cartItems, discount]);

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(total * 0.1);
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='fw-bold text-uppercase'>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>:Your cart is empty</p>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="row">
              {cartItems.map(item => (
                <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top p-4"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{item.title}</h5>
                      <p className="card-text">NRS {item.price.toFixed(2)}</p>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary & Coupon */}
          <div className="col-lg-4">
            <div className="card p-3 sticky-top" style={{ top: '80px' }}>
              <h4 className='fw-bold'>Total: NRS {total.toFixed(2)}</h4>
              <div className="mt-3">
                <h5>Have a coupon?</h5>
                <div className="d-flex gap-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="form-control"
                    placeholder="Enter coupon code"
                  />
                  <button onClick={applyCoupon} className="btn" style={{backgroundColor: "#24cfa6"}}>
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-success">
                    <p>Coupon applied: 10% off</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link to="/checkout" className="btn btn-primary w-100">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

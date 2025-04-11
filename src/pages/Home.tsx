import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products?limit=20'); // Fetching more products for all products section
        const data: Product[] = await res.json();
        setFeaturedProducts(data.slice(0, 5)); // Featured products
        setTrendingProducts(data.slice(5, 10)); // Trending products
        setAllProducts(data); // All products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Here, add the logic to add the product to the cart
    console.log('Added to cart:', product);
  };

  return (
    <div className="container mt-4">
      {/* Featured Products Carousel */}
      <h3 className="fw-bold mb-3 text-uppercase">
        <i className="fas fa-gem"></i> Featured Products
      </h3>
      <Carousel>
        {featuredProducts.map((product) => (
          <Carousel.Item key={product.id}>
            <div className="carousel-item-content text-center">
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.title}
                className="d-block w-100"
                style={{ height: '300px', objectFit: 'contain' }}
              />
              <Carousel.Caption>
                <h5>{product.title}</h5>
                <p>{product.description.slice(0, 60)}...</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Trending Products Section */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3 text-uppercase">
          <i className="fas fa-fire-alt"></i> Trending Products
        </h4>
        <div className="row g-4">
          {trendingProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card shadow-sm h-100" style={{ width: '100%' }}>
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold">{product.title.slice(0, 50)}...</h6>
                  <div
                    className="category-badge"
                    style={{
                      borderColor: '#24cfa6',
                      color: '#24cfa6',
                      borderRadius: '5px',
                      borderWidth: '2px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      marginBottom: '8px',
                      width: 'fit-content',
                      border: '0.1px solid',
                    }}
                  >
                    {product.category}
                  </div>
                  <p className="fw-bold mb-1" style={{ color: '#24cfa6' }}>NRS {product.price.toFixed(2)}</p>
                  <p className="card-text small flex-grow-1">{product.description.slice(0, 60)}...</p>
                  <button
                    className="btn btn-dark btn-sm mt-2 w-100"
                    onClick={() => handleAddToCart(product)}  // Add to cart logic
                    style={{ height: '40px' }} // Adjust the height of the button
                  >
                    <i className="bi bi-cart-fill me-2"></i> Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn w-100 mt-2"
                    style={{
                      backgroundColor: '#24cfa6',
                      color: '#fff',
                      height: '40px',
                      textAlign: 'center',
                    }}
                  >
                    <i className="bi bi-eye me-2"></i> View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Section */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3 text-uppercase">
          <i className="fas fa-boxes"></i> All Products
        </h4>
        <div className="row g-4">
          {allProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card shadow-sm h-100" style={{ width: '100%' }}>
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold">{product.title.slice(0, 50)}...</h6>
                  <div
                    className="category-badge"
                    style={{
                      borderColor: '#24cfa6',
                      color: '#24cfa6',
                      borderRadius: '5px',
                      borderWidth: '2px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      marginBottom: '8px',
                      width: 'fit-content',
                      border: '0.1px solid',
                    }}
                  >
                    {product.category}
                  </div>
                  <p className="fw-bold mb-1" style={{ color: '#24cfa6' }}>${product.price.toFixed(2)}</p>
                  <p className="card-text small flex-grow-1">{product.description.slice(0, 60)}...</p>
                  <button
                    className="btn btn-dark btn-sm mt-2 w-100"
                    onClick={() => handleAddToCart(product)}  // Add to cart logic
                    style={{ height: '40px' }} // Adjust the height of the button
                  >
                    <i className="bi bi-cart-fill me-2"></i> Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn w-100 mt-2"
                    style={{
                      backgroundColor: '#24cfa6',
                      color: '#fff',
                      height: '40px',
                      textAlign: 'center',
                    }}
                  >
                    <i className="bi bi-eye me-2"></i> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

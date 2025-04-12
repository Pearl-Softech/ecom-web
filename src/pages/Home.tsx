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
        const res = await fetch('https://fakestoreapi.com/products?limit=20');
        const data: Product[] = await res.json();
        setFeaturedProducts(data.slice(0, 5));
        setTrendingProducts(data.slice(5, 10));
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  const renderProductCard = (product: Product) => (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
      <div className="card shadow-sm h-100 d-flex flex-column">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title fw-bold">
            {product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}
          </h6>

          <span
            className="category-badge mb-2 text-uppercase px-2 py-1 rounded"
            style={{
              color: '#24cfa6',
              borderColor: '#24cfa6',
              fontSize: '12px',
              width: 'fit-content',
              border: '1.5px solid',
            }}
          >
            {product.category}
          </span>

          <p className="fw-bold mb-1" style={{ color: '#25c4a6' }}>
            NRS {product.price.toFixed(2)}
          </p>

          <p className="card-text small flex-grow-1">
            {product.description.length > 80 ? product.description.slice(0, 80) + '...' : product.description}
          </p>

          <button
            className="btn btn-dark btn-sm mt-2 w-100"
            onClick={() => handleAddToCart(product)}
            style={{ height: '40px' }}
          >
            <i className="bi bi-cart-fill me-2"></i> Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="btn w-100 mt-2"
            style={{
              backgroundColor: '#24cfa6',
              color: 'black',
              height: '40px',
            }}
          >
            <i className="bi bi-eye me-2"></i> View Product
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {/* Featured Carousel */}
      <Carousel
        interval={2500}
        pause="hover"
        indicators
        controls
        style={{ backgroundColor: "#25c4a6", borderRadius: "5px", overflow: "hidden" }}
        className="p-4"
      >
        {featuredProducts.map((product) => (
          <Carousel.Item key={product.id}>
            <div className="text-center">
              <img
                src={product.image}
                alt={product.title}
                className="d-block mx-auto"
                style={{
                  maxHeight: '350px',
                  objectFit: 'contain',
                  margin: '0 auto',
                  backgroundColor: 'transparent',
                }}
              />
              <Carousel.Caption
  className="text-center carousel-caption"
  style={{
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '1rem',
    borderRadius: '8px',
    bottom: '20px', // optional: controls vertical position near bottom
    maxWidth: '90%',
  }}
>
  <h5 className="fw-bold text-light mb-2">
    {product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}
  </h5>
  <Link
    to={`/product/${product.id}`}
    className="btn btn-sm"
    style={{ backgroundColor: '#24cfa6', color: 'black' }}
  >
    <i className="bi bi-eye me-1"></i> View Product
  </Link>
</Carousel.Caption>


            </div>
          </Carousel.Item>

        ))}
      </Carousel>


      {/* Trending Section */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3 text-uppercase">
          <i className="fas fa-fire-alt me-2"></i> Trending Products
        </h4>
        <div className="row">
          {trendingProducts.map(renderProductCard)}
        </div>
      </div>

      {/* All Products Section */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3 text-uppercase">
          <i className="fas fa-boxes me-2"></i> All Products
        </h4>
        <div className="row">
          {allProducts.map(renderProductCard)}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await res.json();

        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    if (query.trim()) {
      fetchProducts();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container mt-4">
      <h4 className="fw-bold mb-3 text-uppercase">
        <i className="bi bi-search"></i> Search Results for "{query}"
      </h4>
      <div className="row g-4">
        {results.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card shadow-sm h-100">
              <img
                src={product.image}
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
        ))}
        {query && results.length === 0 && (
          <p className="text-muted">:No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default Search;

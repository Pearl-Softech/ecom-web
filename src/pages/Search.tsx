import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
                <h6 className="card-title fw-bold">{product.title.slice(0, 50)}...</h6>
                <p className="fw-bold mb-1" style={{ color: '#24cfa6' }}>
                  ${product.price.toFixed(2)}
                </p>
                <p className="card-text small flex-grow-1">
                  {product.description.slice(0, 60)}...
                </p>
              </div>
            </div>
          </div>
        ))}
        {query && results.length === 0 && (
          <p className="text-muted">No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default Search;

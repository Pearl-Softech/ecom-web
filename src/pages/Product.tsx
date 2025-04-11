import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCartPlus, FaTags } from 'react-icons/fa';
import '../styles/Product.css';

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    images?: string[];
}

interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    profilePic: string;
}

const Product: React.FC = () => {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data: Product = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();

            setReviews([
                {
                    id: 1,
                    name: 'John Doe',
                    rating: 5,
                    comment: 'Excellent product!',
                    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    rating: 4,
                    comment: 'Good quality, fast shipping.',
                    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
                },
            ]);
        }
    }, [id]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data: Product[] = await res.json();
                const related = data.filter(
                    (p) => p.category === product?.category && p.id !== product?.id
                );
                setRelatedProducts(related.slice(0, 4));
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        if (product) {
            fetchRelatedProducts();
        }
    }, [product]);

    const handleAddReview = () => {
        const newReview: Review = {
            id: reviews.length + 1,
            name: 'Anonymous',
            rating: newRating,
            comment: newComment,
            profilePic: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
        };
        setReviews([newReview, ...reviews]);
        setNewComment('');
        setNewRating(5);
    };

    if (!product) return <div className="text-center my-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Product Image */}
                <div className="col-md-5" style={{ height: 'object-fit' }}>
                    <img src={product.image} className="img-fluid mb-3" alt={product.title} style={{ height: '100%', width: '100%' }} />
                    {product.images?.length > 0 && (
                        <div className="d-flex gap-2 flex-wrap">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt="Gallery"
                                    className="img-thumbnail"
                                    style={{ width: '80px', cursor: 'pointer' }}
                                    onClick={() => window.open(img, '_blank')}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="col-md-6">
                    <h2 className="fw-bold">{product.title}</h2>
                    <p style={{ color: '#24cfa6', border: '0.1px solid #24cfa6', width: 'fit-content', padding: '5px 12px', borderRadius: '5px' }}>{product.category}</p>
                    <p className="fw-bold fs-4" style={{ color: '#24cfa6' }}>NRS {product.price.toFixed(2)}</p>
                    <p>{product.description}</p>
                    <p><strong>Listed on:</strong> April 11, 2025</p>

                    <div className="mb-3">
                        <strong>Rating:</strong> {product.rating.rate} / 5 ({product.rating.count} reviews)
                    </div>

                    <button
                        className="btn btn-primary fw-bold"
                        onClick={() => console.log('Add to cart', product)}
                    >
                        <FaCartPlus className="me-2" /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Related Products */}
            <div className="related-products mt-5">
                <h5 className="fw-bold text-uppercase">
                    <FaTags className="me-2" />
                    Related Products
                </h5>
                <div className="row">
                    {relatedProducts.map((relProd) => (
                        <div key={relProd.id} className="col-md-3 col-sm-6 mb-3">
                            <div className="card h-100">
                                <img
                                    src={relProd.image}
                                    className="card-img-top p-4"
                                    alt={relProd.title}
                                    style={{ objectFit: 'contain', height: '150px' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title fw-bold">{relProd.title}</h6>
                                    <p className="card-text" style={{ color: "#24cfa6" }}>NRS {relProd.price.toFixed(2)}</p>
                                    <button className="btn btn-primary btn-sm mt-auto p-2" onClick={()=>{navigate(`/product/${relProd.id}`)}}>
                                        <i className="bi bi-eye me-2"></i> View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-5">
                <h5 className="fw-bold text-uppercase">
                    <i className="fa-solid fa-star"></i>
                    {" " + "Customer Reviews"}
                </h5>
                {reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <div key={rev.id} className="border p-3 mb-2 rounded d-flex align-items-start gap-3">
                            <img src={rev.profilePic} alt={rev.name} className="rounded-circle" width="50" height="50" />
                            <div>
                                <strong>{rev.name}</strong> – <span className="text-warning">{'★'.repeat(rev.rating)}</span>
                                <p className="mb-1">{rev.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {/* Add Review */}
            <div className="add-review mt-4">
                <h5 className="fw-bold text-uppercase">
                    Add a Review
                </h5>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select className="form-select" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                        {[5, 4, 3, 2, 1].map((val) => (
                            <option key={val} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea className="form-control" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={handleAddReview}>Submit Review</button>
            </div>
        </div>
    );
};

export default Product;

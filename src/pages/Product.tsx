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
            <div className="row d-flex align-items-stretch">
                {/* Product Image */}
                <div className="col-md-5 d-flex align-items-stretch">
                    <div className="product-image-container w-100 p-3 bg-white d-flex flex-column">
                        <img
                            src={product.image}
                            className="img-fluid flex-grow-1"
                            alt={product.title}
                            style={{
                                objectFit: 'contain',
                                maxHeight: '100%', /* Ensures the image does not exceed container height */
                                width: '100%', /* Ensures the image takes up full width */
                            }}
                        />
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
                </div>

                {/* Product Info */}
                <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div>
                        <h2 className="fw-bold">{product.title}</h2>
                        <p style={{ color: '#24cfa6', border: '0.1px solid #24cfa6', width: 'fit-content', padding: '5px 12px', borderRadius: '5px' }}>
                            {product.category}
                        </p>
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
            </div>

            {/* Related Products */}
            <div className="related-products mt-5">
                <h5 className="fw-bold text-uppercase">
                    Related Products
                </h5>
                <div className="row">
                    {relatedProducts.map((relProd) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={relProd.id}>
                            <div className="card shadow-sm h-100 d-flex flex-column">
                                <img
                                    src={relProd.image || 'https://via.placeholder.com/300'}
                                    className="card-img-top p-3"
                                    alt={relProd.title}
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

                                </div>
                                <div className="card-footer bg-white border-0">
                                    <button
                                        className="btn w-100"
                                        style={{ backgroundColor: '#24cfa6', color: 'black', height: '40px' }}
                                        onClick={() => navigate(`/product/${relProd.id}`)}
                                    >
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
                    Customer Reviews
                </h5>
                {reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <div key={rev.id} className="p-3 mb-3 bg-light rounded shadow-sm d-flex align-items-start gap-3">
                            <img src={rev.profilePic} alt={rev.name} className="rounded-circle border" width="60" height="60" />
                            <div>
                                <div className="d-flex align-items-center gap-2">
                                    <strong className="me-2">{rev.name}</strong>
                                    <div className="text-warning">
                                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                    </div>
                                </div>
                                <p className="mb-0 mt-2">{rev.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {/* Add Review */}
            <div className="add-review mt-4 bg-light p-4 rounded shadow-sm">
                <h5 className="fw-bold text-uppercase mb-3">Add a Review</h5>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Rating</label>
                    <select className="form-select" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                        {[5, 4, 3, 2, 1].map((val) => (
                            <option key={val} value={val}>{val} Star{val > 1 && 's'}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Comment</label>
                    <textarea
                        className="form-control"
                        rows={10}
                        placeholder="Write your review here..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary fw-bold px-4"
                    onClick={handleAddReview}
                    disabled={newComment.trim() === ''}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default Product;

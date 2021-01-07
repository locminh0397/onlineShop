import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated, makeComment } from './apiCore';
import Card from './Card';
import { FaStar } from 'react-icons/fa'
import "../style.css"
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct } from '../admin/apiAdmin';

const Product = (props, { match }) => {
    const [product, setProduct] = useState({});
    const [data,setData] = useState([])
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [rating, setRating] = useState(5)
    const [hover, setHover] = useState()
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        comment: '',
        loading: false,
        createdProduct: '',
        formData: ''
    });

    const [categories, setCategories] = useState([]);
    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        // categories,
        category,
        shipping,
        quantity,
        loading,
        createdProduct,
        comment,
        formData
    } = values;
    

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    comment: data.comment,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };
    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(props.match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    comment: '',
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };
    

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            
            <div className="row">            
                <div className="col-9">
                    <h4 class="mb-4">Thông tin sản phẩm</h4>
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                    <div className="rating">
                    <h3 className="ratingText"><strong>Đánh giá: </strong></h3>
                    {[... Array(5)].map((start, i) => {
                        const ratingValue = i + 1
                        return (
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar 
                                    className="star" 
                                    color={ratingValue <= rating || hover ? "#ffc107" : "#e4e5e9"}
                                    size={50}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover()}
                                /> 
                            </label>
                        )
                    })}
                    </div>
                    <div className="card mb-3">
                    <div className="row">
                        <div className="col-md-10 px-3">
                        <div className="card-block px-3">
                            <h5 className="card-title text-dark" style={{marginTop: '10px', 'fontWeight':'bolder'}}>minh</h5>
                            <p className="card-text" style={{fontSize: '16px'}}>Sản phẩm tốt</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                        <h3>Bình luận</h3>
                        <form  onSubmit={clickSubmit}>
                            <div className="form-group">
                                <textarea rows="5"
                                    required
                                    className="form-control"
                                    
                                    placeholder="Type a comment"
                                    >
                                </textarea>
                            </div>
                            <div className="form-group" align="right">
                                <input type="submit"
                                    className="btn btn-dark"
                                    value="Post Comment"
                                    >
                                </input>
                            </div>
                        </form>
                    </div>
                    
                </div>

                <div className="col-3">
                    <h4 class="mb-4">Sản phẩm liên quan</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
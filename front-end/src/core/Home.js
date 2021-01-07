import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import FooterLayout from './FooterLayout'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Online Shop"
            description="Shopping"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">Sản phẩm mới</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Sản phẩm bán chạy</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <FooterLayout></FooterLayout>
        </Layout>
    );
};

export default Home;

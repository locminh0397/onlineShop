import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import '../style.css'
import Checkout from './Checkout';


const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems =items => {
        return (
            <div>
                <h2>Giò hàng có {`${items.length}`} sản phẩm</h2>
                <hr />
                {items.map((product, i) => (  
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                        
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Giỏ hàng <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Online shopping"
            description="Quản lý giỏ hàng   "
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                
                <div className="col-md-6">
                    <h2>Thanh toán</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Quản lý sản phẩm"
            description="Chỉnh sửa thông tin sản phẩm"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Tổng số {products.length} sản phẩm
                    </h2>
                    <hr />
                    <table class="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Sửa</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead> 
                    {products.map((c, index) => {
                        return (
                            <tbody>
                            <th scope="row">{index + 1}</th>
                            <td scope="row">{c.name}</td>
                            <td scope="row">
                                <Link to={`/admin/product/update/${c._id}`} className="text-warning">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link></td>
                            <td scope="row">
                                <Link to={`/admin/product/update/${c._id}`} className="text-danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Link>
                            </td>
                            
                            </tbody>
                        )
                    })}
                    
                    </table>
                    <br />
                </div>
            </div>
            <Link to="/admin/dashboard" className="btn btn-warning mb-5">
                Quay lại
            </Link>
        </Layout>
    );
};

export default ManageProducts;
import React, { useState, useEffect, Fragment} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";


const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
        //const orderId = props.match.params.orderId;
    },[props]);

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
            <div className="input-group-text"><span className="font-weight-bold">{key}</span></div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Trạng thái: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
    return (
        <Layout
            title="Chi tiết đơn hàng"
            description={`Hi ${
                user.name
            }`}
            className="container-fluid"
        >
            <div className="row">
                <div className=" col-md-10 m-auto">
                    {/* {console.log(props.match.params.orderId)} */}
                    {/* {console.log(orders)} */}

                    {orders.map((o, oIndex) => {
                        if(o._id === props.match.params.orderId){
                            return (
                                <div
                                    className="mt-5"
                                    key={oIndex}
                                    style={{ borderBottom: "5px solid indigo" }}
                                >
                                    <h2 className="mb-5">
                                        <span className="bg-primary">
                                            Mã đơn hàng: {o._id}
                                        </span>
                                    </h2>
    
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">
                                            {showStatus(o)}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="font-weight-bold">Mã giao dịch: </span> {o.transaction_id}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="font-weight-bold">Tổng tiền: </span>{o.amount} 
                                        </li>
                                        <li className="list-group-item">
                                            <span className="font-weight-bold">Khách hàng: </span> {o.user.name}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="font-weight-bold">Ngày đặt hàng: </span>
                                            {moment(o.createdAt).format('DD-MM-YYYY')}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="font-weight-bold">Địa chỉ: </span>{o.address}
                                        </li>
                                    </ul>
    
                                    <h3 className="mt-4 mb-4 font-italic">
                                        <span className="font-weight-bold">Tổng số sản phẩm: </span>{" "}
                                        {o.products.length}
                                    </h3>
    
                                    {o.products.map((p, pIndex) => (
                                        <div
                                            className="mb-4"
                                            key={pIndex}
                                            style={{
                                                padding: "20px",
                                                border: "1px solid indigo"
                                            }}
                                        >
                                            {showInput("Mã sản phẩm", p._id)}
                                            {showInput("Tên sản phẩm", p.name)}
                                            {showInput("Giá sản phẩm", p.price)}
                                            {showInput("Số lượng", p.count)}
                                        </div>
                                    
                                    ))}
                                </div>
                            );
                           
                        }
                    })}
                <Link to={`/admin/print/${props.match.params.orderId}`} className="btn btn-primary mt-3 mb-3 float-right">Lưu</Link>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;



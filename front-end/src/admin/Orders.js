import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


const Orders = () => {
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
    }, []);


    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
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
            {/* <h3 className="mark mb-4">Trạng thái: {o.status}</h3> */}
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Cập nhật trạng thái</option>
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
            title="Đơn hàng"
            description={`Xin chào ${
                user.name
            }`}
            className="container"
        >
            
            <table class="table ">
            <thead>
            <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Mã giao dịch</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Người đặt hàng</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Chi tiết</th>
            </tr>
        </thead> 
        {orders.map((o, oIndex) => {
            return (
                <tbody>
                <th scope="row">{o._id}</th>
                <td scope="row">{o.transaction_id}</td>
                <td scope="row">{o.status}</td>
                <td scope="row">{o.amount}</td>
                <td scope="row">{o.user.name}</td>
                <td scope="row">{moment(o.createdAt).fromNow()}</td>
                <td scope="row">{o.address}</td>
                <td scope="row">
                <Link className=""
                to={`/admin/order/${o._id}`} role="button"><FontAwesomeIcon icon={faEye}/>
                </Link>
                </td>
                </tbody>
            )
        })}
        
        </table>
        <Link to="/admin/dashboard" className="btn btn-warning mb-5">
                Quay lại
        </Link>
        </Layout>
    );
};

export default Orders;
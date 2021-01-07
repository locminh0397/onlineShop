import React ,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from 'moment';
const Dashboard = () => {
    const {
        user: {_id,name, email, role },token
    } = isAuthenticated();
    const [history,setHistory]=useState([]);
    const init=(userId,token)=>{
        getPurchaseHistory(userId,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setHistory(data);
            }
        })
    }
    useEffect(() => {
        init(_id,token)// eslint-disable-next-line
    },[])
    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">...</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            Giỏ hàng
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`} >
                            Cập nhật thông tin
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Thông tin người dùng</h3>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Họ tên: </strong>{name}</li>
                    <li className="list-group-item"><strong>Email: </strong>{email}</li>
                    <li className="list-group-item"><strong>Quyền: </strong>
                        {role === 1 ? "Admin" : " User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Lịch sử mua hàng</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div key={i+1}>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Tên sản phẩm: {p.name}</h6>
                                                <h6>
                                                    Giá: ${p.price}
                                                </h6>
                                                <h6>
                                                    Thời gian:{" "}
                                                    {moment(p.createdAt).format('DD-MM-YYYY')}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Hi ${name}!`}
            className="container-fluid"
        >
            <div className="row container">
                <div className="col-lg-3 col-md-3 col-sm-8 col-xs-8">{userLinks()}</div>
                <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

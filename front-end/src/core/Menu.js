import React, { Fragment, useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../style.css"
import { faHome, faStore, faSignOutAlt, faSignInAlt, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (

    <div>
        <div className="nav nav-tabs bg-primary">
            <div className="nav-logo">
                <Link
                    className="link-logo"
                    style={{ textDecoration: 'none', color: "white" }}
                    to="/"
                >
                    <span className="logo">LOGO</span>
                </Link>
            </div>
            <div className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    <FontAwesomeIcon icon={faHome}/>  Trang chủ 
                </Link>
            </div>

            <div className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    <FontAwesomeIcon icon={faStore}/> Cửa hàng
                </Link>
            </div>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <div className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </div>
            )}
            

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <div className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </div>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <div className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            <FontAwesomeIcon icon={faSignInAlt}/> Đăng nhập
                        </Link>
                    </div>

                    <div className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            <FontAwesomeIcon icon={faUserPlus}/> Đăng ký
                        </Link>
                    </div>
                </Fragment>
            )}

            <div className="nav-item ml-auto">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    <FontAwesomeIcon icon={faShoppingCart}/>{" "}
                    <sup>
                        <small className="badge badge-success">{itemTotal()}</small>
                    </sup>
                </Link>
            </div>
            

            {isAuthenticated() && (
                <div className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                       <FontAwesomeIcon icon={faSignOutAlt}/> Đăng xuất
                    </span>
                </div>
            )}
            
        </div>
    </div>
);

export default withRouter(Menu);
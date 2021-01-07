import React, { useState, useEffect, Fragment } from "react";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues } from "./apiAdmin";
import moment from "moment"
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import "../style.css"
import { Link, Redirect } from "react-router-dom";


const Print = (props) => {
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
    }, [props]);
    const createPdf = (html) => Doc.createPdf(html, props.match.params.orderId);

  return ( 
    orders.map((o, oIndex) => {
      if(o._id === props.match.params.orderId){
        return (
          <PdfContainer createPdf={createPdf}>
            <div className = "invoice container-fluid h-100">
            <div  className=" container d-flex justify-content-center">
          <div className="card">
            <div className="card-header">
              <span className="float-left"> <strong>Ngày:</strong> {moment(o.createdAt).format('DD-MM-YYYY')}</span>
              <span className="float-right"> <strong>Trạng thái:</strong> {o.status}</span>
        
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-12 text-center"> <h3>LOGO</h3> <hr  className="border"/></div>
                
                <div className="col-sm-6">
                  <div>
                    <strong>Mã giao dịch: </strong> {o.transaction_id}
                  </div>
                  <div> <strong>Khách hàng: </strong> {o.user.name}</div>
                  <div><strong>Địa chỉ: </strong> {o.address} </div>
                  <div><strong>Tổng số sản phẩm:</strong> {o.products.length}</div>
                </div>
        
              </div>
        
              
                <div className="table-responsive-sm">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {/* <th className="center">#</th> */}
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
        
                      <th className="right">Giá sản phẩm</th>
                      <th className="center">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {o.products.map((p, pIndex) => (
                      <tr>
                      {/* <td className="center">{pIndex + 1}</td> */}
                      <td className="left strong">{p._id}</td>
                      <td className="left">{p.name}</td>
        
                      <td className="right">{p.price}</td>
                      <td className="center">{p.count}</td>
                      </tr>
                     
                    ))}
                      
                  
                  </tbody>
                </table>
              </div>
              
              <div className="row">
                <div className="col-lg-4 col-sm-5">
        
                </div>
        
                <div className="col-lg-4 col-sm-5 ml-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Tổng tiền</strong>
                        </td>
                        <td className="right">{o.amount}</td>
                      </tr>
                    </tbody>
                  </table>
        
                </div>
        
              </div>
            </div>
            <div className="card-footer">
              <h5 className="text-center m-0"><strong>Cảm ơn bạn đã mua hàng!</strong></h5>
            </div>
          </div>
        </div>
          </div>
          </PdfContainer>  
        )
      }
    })
  )
}

export default Print;
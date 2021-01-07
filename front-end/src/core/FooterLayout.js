import React from "react";
import '../style.css'
        import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

        const FooterLayout = () => {
          return (
              
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <hr className="border"/>
              <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                  <MDBCol md="6">
                    <h3 className="title">Online Shopping</h3>
                      <h5 className="font-weight-bold ">Liên hệ </h5>
                      <p className="font-weight-bold mb-0">SĐT: 0123456789 </p>                 
                      <p className="font-weight-bold mb-0">Email: onlineshop@ecommerce.com </p>                 
                      <p className="font-weight-bold mb-0">Đại chỉ: Phú Mỹ - Đình Tổ - Thuận Thành - Bắc Ninh </p>                  
                  </MDBCol>
                  <MDBCol md="6">
                    <h3 className="title">Theo dõi chúng tôi</h3>
                    <span><i class="fa fa-facebook " aria-hidden="true"></i></span>
                    <span><i class="fa fa-twitter mr-3 ml-3" aria-hidden="true"></i></span>
                    <span><i class="fa fa-google " aria-hidden="true"></i></span>
                    <p className="font-weight-bold mt-3 mb-2">Đăng ký nhận tin từ chúng tôi</p>
                    <div className="input-group">
                        <input className="w-75 " placeholder="Mời nhập email..." id="email"/>
                        <button className="btn btn-primary ml-3">Xác nhận</button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              <hr/>
              <div className="footer-copyright text-center font-weight-bold pb-2">
                <MDBContainer  fluid>
                  &copy; {new Date().getFullYear()} <span>Online Shop</span>
                </MDBContainer>
              </div>
            </MDBFooter>
          );
        }

        export default FooterLayout;
      
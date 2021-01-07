import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getProducts} from "./apiAdmin";
import moment from "moment";
import { Line } from "react-chartjs-2";
import "../style.css"



const Chart = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [chartData, setchartData] = useState({})
    const { user, token } = isAuthenticated();

    let productName = []
    let sold_ = []
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
                   
            }
        });
    };
    
    const loadProducts = () => {
      getProducts().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setProducts(data);
              data.map(element => {
                productName.push(element.name)
                sold_.push(element.sold)
              });
              setchartData({
                labels: productName,
                datasets: [
                  {
                    label: "Số lượng sản phẩm đã bán",
                    data: sold_,
                    backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                    borderWidth: 4
                  }
                ]
              });
             
          }
      });
  };

    console.log(productName)

    useEffect(() => {
        loadOrders();
        loadProducts();
    }, []);



    return (
        <div className="Chart">
          <h1>Biểu đồ</h1>
          <div style={{height:" 1000px", width:"1000px"}}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                title: { text: "Thống kê", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true
                      },
                      gridLines: {
                        display: true
                      }
                    }
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false
                      }
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      );
};

export default Chart;
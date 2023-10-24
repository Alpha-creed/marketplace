import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
const Home = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [filter, setFilters] = useState({
    status: "approved",
    category:[],
    age:[]
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const productDetails = {
    border: "1px solid #3F3131",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    cursor: "pointer",
  };
  const productOverlay = {
    display: "grid",
    gridTemplateColumns: "repeat(5,minmax(0,1fr)",
    gap: 40,
  };

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filter);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filter}
          setFilters={setFilters}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 ,width:"100%"}}>
        <div style={{ display: "flex", gap: 10,alignItems:"center" }}>
          {!showFilters && (
            <i
              className="ri-filter-3-line"
              style={{ fontSize: "25px",cursor:"pointer" }}
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search Product here"
            style={{
              border: "1px solid #DEDEDE",
              borderRadius: "10px",
              width: "100%",
              padding: "10px",
              height:"20px"
            }}
          />
        </div>
        <div
          style={{
            ...productOverlay,
            gridTemplateColumns: showFilters
              ? "repeat(4,minmax(0,1fr)"
              : "repeat(5,minmax(0,1fr)",
          }}
        >
          {products?.map((product) => {
            return (
              <div
                style={productDetails}
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    padding: 5,
                  }}
                  alt=""
                />
                <div
                  style={{
                    padding: "0 10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h1 style={{ fontSize: "18px", textTransform: "capitalize" }}>
                    {product.name}
                  </h1>
                  <p style={{ fontSize: "12px" }}>{product.description}</p>

                  <Divider />
                  <span style={{ color: "#20A10C" }}>${product.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

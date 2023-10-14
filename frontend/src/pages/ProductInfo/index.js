import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetProductById } from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";
import { message } from "antd";

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productOverview = {
    display: "grid",
    gridTemplateColumns: "repeat(5,minmax(0,1fr)",
  };

  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div>
        <div style={productOverview}>
          {/* images */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <div style={{ display: "flex", gap: 5 }}>
              {product.images.map((image, index) => {
                  const smallImageStyles={
                    border: selectedImageIndex === index ? '1px dashed #003333' : '',
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    cursor: "pointer",
                    padding:"5px",
                  }
                return (
                  <img
                    style={
                        smallImageStyles
                    }
                    onClick={()=>setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductInfo;

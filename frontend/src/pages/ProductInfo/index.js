import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllBids, GetProductById } from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";
import Divider from "../../components/Divider";
import { Button, message } from "antd";
import moment from "moment";
import BidModal from "./BidModal";
function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productOverview = {
    display: "grid",
    gridTemplateColumns: "repeat(2,minmax(0,1fr)",
    gap: 20,
  };
  const headingStyles = {
    fontSize: "20px",
    fontStyle: "bold",
    color: "#660000",
    textTransform: "uppercase",
  };
  const subHeadingStyles = {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
  };
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
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
                const smallImageStyles = {
                  border:
                    selectedImageIndex === index ? "1px dashed #003333" : "",
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  cursor: "pointer",
                  padding: "5px",
                };
                return (
                  <img
                    style={smallImageStyles}
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
            <Divider />
            <div>
              <h4 style={{ color: "#404040" }}>Added On</h4>
              <span>
                {moment(product.createdAt).format("MMM D,YYYY hh:mm A")}
              </span>
            </div>
          </div>

          {/* details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <h1 style={headingStyles}>{product.name}</h1>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 style={headingStyles}>Product details</h1>
              <div style={subHeadingStyles}>
                <span>Price </span>
                <span>$ {product.price}</span>
              </div>
              <div style={subHeadingStyles}>
                <span>Category </span>
                <span style={{ textTransform: "uppercase" }}>
                  {product.category}
                </span>
              </div>
              <div style={subHeadingStyles}>
                <span>Bill Available </span>
                <span> {product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div style={subHeadingStyles}>
                <span>Box Available </span>
                <span> {product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div style={subHeadingStyles}>
                <span>Accessories Available </span>
                <span> {product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div style={subHeadingStyles}>
                <span>Warranty Available </span>
                <span> {product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div style={subHeadingStyles}>
                <span>Purchased Year </span>
                <span>
                  {" "}
                  {moment().subtract(product.age, "years").format("YYYY")}(
                  {product.age} years ago)
                </span>
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 style={headingStyles}>Seller details</h1>
              <div style={subHeadingStyles}>
                <span>Name </span>
                <span> {product.seller.name}</span>
              </div>
              <div style={subHeadingStyles}>
                <span>Email </span>
                <span style={{ textTransform: "uppercase" }}>
                  {product.seller.email}
                </span>
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={subHeadingStyles}>
                <h1 style={headingStyles}>Bids</h1>
                <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>
              {console.log(product)}
            {product.showBidsOnProductPage &&
              product.bids.map((bid) => {
                return (
                  <div
                    style={{
                      border: "1px solid #BDB9B9",
                      padding: 2,
                      borderRadius: "5px",
                      margin: "10px 0",
                    }}
                  >
                    <div style={{ ...subHeadingStyles, color: "#7D7D7D" }}>
                      <span>Name</span>
                      <span>{bid.buyer.name}</span>
                    </div>
                    <div style={{ ...subHeadingStyles, color: "#7D7D7D" }}>
                      <span>Bid Amount</span>
                      <span>{bid.bidAmount}</span>
                    </div>
                    <div style={{ ...subHeadingStyles, color: "#7D7D7D" }}>
                      <span>Bid Place On</span>
                      <span>
                        {" "}
                        {moment(bid.createdAt).format("MMM D,YYYY hh:mm A")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          </div>

        </div>
        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;

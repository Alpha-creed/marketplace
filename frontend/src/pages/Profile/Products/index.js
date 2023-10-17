import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import moment from "moment";
import Bids from "./Bids";

function Product() {
  const [showBids, setShowBids] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const btnOverlay = {
    display: "flex",
    justifyContent: "end",
    marginBottom: "5px",
  };
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({ seller: user._id });
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", gap: 10,cursor:"pointer",alignItems:"center" }}>
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
            <i
              class="ri-edit-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
            <br/><br/><br/>
            <span style={{ textDecoration: "underline" }}
            onClick={()=>{
              setSelectedProduct(record)
              setShowBids(true) 
            }}>Show Bids</span>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div style={btnOverlay}>
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}

export default Product;

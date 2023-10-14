import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { EditProduct, GetProducts, UpdateProductStatus } from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";

function Product() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id,status) => {
    try {
        dispatch(setLoader(true));
        const response = await UpdateProductStatus(id,status);
        dispatch(setLoader(false));
        if(response.success){
            message.success(response.message);
            getData();
        }else{
            throw new Error(response.message)
        }
    } catch (error) {
        dispatch(setLoader(false));
        message.error(error.message)
    }
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => record.seller.name,
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
      render:(text,record)=>{
        return record.status.toUpperCase();
      }
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
        const { status, _id } = record;
        return (
          <div style={{ display: "flex", gap: 6 }}>
            {status === "pending" && (
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </span>
            )}
             {status === "pending" && (
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => onStatusUpdate(_id, "rejected")}
              >
                Reject
              </span>
            )}
            {status === "approved" && (
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
             {status === "blocked" && (
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                unblock
              </span>
            )}
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
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Product;

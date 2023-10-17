import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";
import Divider from "../../../components/Divider";

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
        
      });
      dispatch(setLoader(false));
      console.log(response.data)
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
      console.log(error)

    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render:(text,record)=>{
        return record.buyer.name
      }
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Data",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMM Do YYYY, hh:mm a");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone:{record.mobile}</p>
            <p>Email:{record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getData();
      console.log();
    }
  }, [selectedProduct]);

  return (
    <Modal
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1200}
      footer={null}
    >
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <h3 style={{ fontSize: "20px", color: "#003319" }}>Bids</h3>
      <Divider />
      <h3 style={{ fontSize: "20px", color: "#404040"}}>
        Product Name:{selectedProduct.name}
      </h3>
      <Table columns={columns} dataSource={bidsData}/>
      </div>
    </Modal>
  );
}

export default Bids;

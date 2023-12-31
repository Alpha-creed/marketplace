import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { setLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/products";
import { useDispatch, useSelector } from "react-redux";
import { AddNotification } from "../../apicalls/notice";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const rules = [{ required: true, message: "Required" }];
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        message.success("Bid added successfully");
        //send notifcation to seller
        await AddNotification({
          title: "A new bid has been placed",
          message: `A new bid has been placed on your  ${product.name} by ${user.name} for $ ${values.bidAmount}`,
          user:product.seller._id,
          onClick:`/profile`,
          read:false,
        });
        reloadData();
        setShowBidModal(false);
        console.log(AddNotification)
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoader(false));
    }
  };
  return (
    <Modal
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          margin: "10px 0",
        }}
      >
        <h1 style={{ fontSize: "20px", color: "#660000", textAlign: "center" }}>
          Place a Bid
        </h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item rules={rules} label="Bid Amount" name="bidAmount">
            <Input />
          </Form.Item>
          <Form.Item label="Message" rules={rules} name="message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModal;

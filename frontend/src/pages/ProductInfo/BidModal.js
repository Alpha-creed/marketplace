import { Form, Input, Modal } from "antd";
import React, { useRef } from "react";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const formRef = useRef(null);
  const rules = [{ required: true, message: "Required" }];
  const onFinish=async(values)=>{
    try {
        
    } catch (error) {
        
    }
  }
  return (
    <Modal
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={()=>formRef.current.submit()}
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

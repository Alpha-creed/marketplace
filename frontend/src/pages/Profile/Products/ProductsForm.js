import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProduct,
  DeleteProduct,
  EditProduct,
} from "../../../apicalls/products";
import { setLoader } from "../../../redux/loadersSlice";
import Images from "./images";
const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "required",
  },
];
function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [selectedTab = "1",setSelectedTab] = useState("1");
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const formRef = useRef(null);
  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  const initialValues = {};
  // Create an initial value object with each item's name set to false
  additionalThings.forEach((item) => {
    initialValues[item.name] = false;
  });

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab==="2" && {footer:false})}
    >
      <div>
        <h1
          style={{
            color: "#405138",
            textAlign: "center",
            fontSize: "20px",
            fontStyle: "semi-bold",
            textTransform: "uppercase",
          }}
        >
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs defaultActiveKey="1"
        activeKey={selectedTab}
        onChange={(key)=>setSelectedTab(key)}>
          <Tabs.TabPane tab="General" key="1">
            <Form
              layout="vertical"
              ref={formRef}
              onFinish={onFinish}
              initialValues={initialValues}
            >
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="no-select">no-select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ display: "flex", gap: 10 }}>
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              getData={getData}
              setShowPoductForm={setShowProductForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;

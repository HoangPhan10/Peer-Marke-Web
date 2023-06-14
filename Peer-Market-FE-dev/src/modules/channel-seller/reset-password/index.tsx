import { CrmCMSLayout } from "@app/common/layout";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
export const ResetPassword = () => {
   const onFinish = (values: any) => {
     console.log("Success:", values);
   };
  return (
    <>
      <Row className="d-flex justify-content-center channel-sell-reset-password">
        <Col className="body p-4">
          <Row className="d-flex justify-content-between body-title">
            <Link href="/channel-seller/login">
              <ArrowLeftOutlined className="icon" />
            </Link>
            <p>Đặt lại mật khẩu</p>
            <p></p>
          </Row>
          <Row className="d-flex justify-content-center mt-4">
            <Col span={20}>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: 30 }}
                  name="username"
                  rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                  <Button className="button-submit mb-1" htmlType="submit">
                    TIẾP THEO
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

ResetPassword.layout = CrmCMSLayout.CHANNEL_SELLER;

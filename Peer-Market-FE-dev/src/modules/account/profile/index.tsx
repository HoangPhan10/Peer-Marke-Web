import { CrmCMSLayout } from "@app/common/layout";
import { Button, Form, Input } from "antd";
import React from "react";

export const AccountProfile = () => {


  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: 580 }}>
      <div
        className="pt-20"
        style={{ margin: "20px 30px 0 30px", borderBottom: "1px solid #ccc" }}
      >
        <p className="fontsz-18 m-0">Hồ Sơ Của Tôi</p>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>

      <div>
        <div className="d-flex justify-content-center">
          <div className="mt-30">
            <Form
              name="basic"
              className="account-profile"
              style={{ width: 500 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
              >
                <Input className="ml-20 ph-h-35" />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="name"
              >
                <Input className="ml-20 ph-h-35" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input className="ml-20 ph-h-35" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset:6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
AccountProfile.layout = CrmCMSLayout.USER_LAYOUT;

import { login } from "@app/api/auth/login";
import { register } from "@app/api/auth/register";
import { getProfile } from "@app/api/user/get-profile";
import { CrmCMSLayout } from "@app/common/layout";
import { SUCCESS_CODE } from "@app/const/common.const";
import { useAppDispatch } from "@app/hooks/redux/useAppDispatch";
import { useSubscription } from "@app/hooks/subscription";
import { addUser } from "@app/redux/users/user-slice";
import { saveUserCredential } from "@app/services/auth";
import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export const Register = () => {
  const router = useRouter();
  const useDispatch = useAppDispatch();
  const subscription = useSubscription();
  const onFinish = (values: any) => {
    const registerAccount = register(values).subscribe((res)=>{
      router.push("/auth/login")
    },(err)=>{
      toast.error(err.message);
    })
    subscription.add(registerAccount);
  };
  return (
    <div>
      <Row
        className="d-flex justify-content-around px-5 channel-sell-body"
        style={{ backgroundColor: "#ee4e2e" }}
      >
        <Col span={8} className="channel-sell-body-left m-0">
          <img src="/assets/images/bg-login.jpg" height={650} />
        </Col>
        <Col span={8} className="channel-sell-body-right mt-85" style={{height:480}}>
          <p className="channel-sell-body-right-title">Đăng ký</p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              style={{ marginBottom: 30 }}
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập đầy đủ tên!" }]}
            >
              <Input placeholder="Tên đây đủ" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: 30 }}
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập." },
              ]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 30 }}
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: 30 }}
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu." }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Button className="button-submit mb-1" htmlType="submit">
                ĐĂNG KÝ
              </Button>
            </Form.Item>
          </Form>
          <p className="text-center channel-sell-body-right-msg">
            Bạn đã có tài khoản PeerMarket?{" "}
            <Link href="/auth/login">
              <span>Đăng nhập</span>
            </Link>
          </p>
        </Col>
      </Row>
      <p className="middle pt-17">
        © 2015 - Bản quyền thuộc về Công ty TNHH PeerMarket
      </p>
    </div>
  );
};
Register.layout = CrmCMSLayout.CHANNEL_SELLER;

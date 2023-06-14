import { CrmCMSLayout } from "@app/common/layout";
import { Button, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import React from "react";
import {
  GlobalOutlined,
  GiftOutlined,
  TaobaoOutlined,
} from "@ant-design/icons";
import { useSubscription } from "@app/hooks/subscription";
import { register } from "@app/api/auth/register";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export const RegisterChannelSell = () => {
  const subscription = useSubscription();
  const router = useRouter();
  const onFinish = (values: any) => {
    const registerAccount = register(values).subscribe((res)=>{
      router.push("/channel-seller/login")
    },(err)=>{
      toast.error(err.message);
    })
    subscription.add(registerAccount);
  };
  return (
    <Row className="channel-sell-body-register">
      <Row className="container d-flex justify-content-around px-5 channel-sell-body">
        <Col span={7} className="channel-sell-body-left">
          <h4>PeerMarket Việt Nam</h4>
          <h2>Trở thành người bán ngay hôm nay</h2>
          <div className="d-flex mb-2">
            <GlobalOutlined className="icon" />
            <p>Nền tảng thương mại điện tử hàng đầu Đông Nam Á và Đài Loan</p>
          </div>
          <div className="d-flex mb-3">
            <GiftOutlined className="icon" />
            <p className="mt-3">Phát hiện trở thành thương hiệu toàn cầu</p>
          </div>
          <div className="d-flex">
            <TaobaoOutlined className="icon" />
            <p>Dẫn đầu lượng người dùng trên ứng dụng mua sắm tại Việt Nam</p>
          </div>
        </Col>
        <Col span={8} className="channel-sell-body-right">
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
            <Link href="/channel-seller/login">
              <span>Đăng nhập</span>
            </Link>
          </p>
        </Col>
      </Row>
    </Row>
  );
};
RegisterChannelSell.layout = CrmCMSLayout.CHANNEL_SELLER;

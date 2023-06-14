import { login } from "@app/api/auth/login";
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

export const LoginChannelSell = () => {
  const router = useRouter();
  const useDispatch = useAppDispatch();
  const subscription = useSubscription();
  const onFinish = (values: any) => {
    const loginSub = login(values).subscribe(
      (res:any) => {
        if (res.status==="OK") {
          saveUserCredential(res.data.token);
          getProfile({ jwt:res.data.token }).subscribe(
            (res) => {
              router.push("/channel-seller/onboarding");
              useDispatch(addUser(res.data))
            },
            (err) => {
              console.log(err);
            }
          );
          return;
        }
        toast.error(res.message);
      },
      (err) => toast.error("Đăng nhập không thành công.")
    );

    subscription.add(loginSub);
  };
  return (
    <>
      <Row className="container d-flex justify-content-around px-5 channel-sell-body">
        <Col span={8} className="channel-sell-body-left">
          <h2>Bán hàng chuyên nghiệp</h2>
          <p>
            Quản lý shop của bạn một cách hiệu quả hơn trên PeerMarket với
            PeerMarket - Kênh Người bán
          </p>
          <img src="/assets/images/channel-seller/image1.png" width={"100%"} />
        </Col>
        <Col span={8} className="channel-sell-body-right">
          <p className="channel-sell-body-right-title">Đăng nhập</p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
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
                ĐĂNG NHẬP
              </Button>
              <Link href="/channel-seller/reset-password">
                <span className="reset-password">Quên mật khẩu</span>
              </Link>
            </Form.Item>
          </Form>
          <p className="text-center channel-sell-body-right-msg">
            Bạn mới biết đến PeerMarket?{" "}
            <Link href="/channel-seller/register">
              <span>Đăng ký</span>
            </Link>
          </p>
        </Col>
      </Row>
    </>
  );
};
LoginChannelSell.layout = CrmCMSLayout.CHANNEL_SELLER;

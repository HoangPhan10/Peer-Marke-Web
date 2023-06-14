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

export const Login = () => {
  const router = useRouter();
  const useDispatch = useAppDispatch();
  const subscription = useSubscription();
  const onFinish = (values: any) => {
    const loginSub = login(values).subscribe(
      (res: any) => {
        if (res.status === "OK") {
          saveUserCredential(res.data.token);
          getProfile({ jwt: res.data.token }).subscribe(
            (res) => {
              const {
                query: { callback },
              } = router;
              useDispatch(addUser(res.data));
              if (res.data.role.id === 4) {
                router.push("/portal/ship");
                return;
              }
              if (res.data.role.id === 2) {
                router.push("/admin/list-user");
                return;
              }
              if (callback) {
                router.push(callback.toString());
                return;
              }
              router.push("/");
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
    <div>
      <Row
        className="d-flex justify-content-around px-5 channel-sell-body"
        style={{ backgroundColor: "#ee4e2e" }}
      >
        <Col span={8} className="channel-sell-body-left m-0">
          <img src="/assets/images/bg-login.jpg" height={650} />
        </Col>
        <Col
          span={8}
          className="channel-sell-body-right"
          style={{ marginTop: 125 }}
        >
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
            <Link href="/auth/register">
              <span>Đăng ký</span>
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
Login.layout = CrmCMSLayout.CHANNEL_SELLER;

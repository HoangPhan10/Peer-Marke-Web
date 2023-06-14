import React from "react";
import { CrmCMSLayout } from "..";
import { HeaderCustomerLayout } from "../header-customer-layout";
import { Col, Row } from "antd";
import { UserOutlined, EditOutlined, ProfileOutlined } from "@ant-design/icons";
import Link from "next/link";
interface ChannelSellerLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export default function UserLayout(props: ChannelSellerLayoutProps) {
  return (
    <div>
      <HeaderCustomerLayout>
        <div className="container mt-30">
          <Row>
            <Col span={5} className="">
              <div
                className="mt-37 mr-30 pb-15 d-flex"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <div
                  style={{ border: "1px solid #ccc", borderRadius: "50%" }}
                  className="ph-h-50 ph-w-50"
                >
                  <UserOutlined
                    className="middle fontsz-25 p-11"
                    style={{ color: "#999" }}
                  />
                </div>
                <div className="ml-15 mt-5">
                  <p className="font-bold fontsz-16 m-0">HoangPhan</p>
                  <div
                    className="d-flex cursor-pointer"
                    style={{ color: "#999" }}
                  >
                    <EditOutlined className="fontsz-18" />
                    <Link href={"/account/profile"}>
                      <p className="m-0">Sửa Hồ Sơ</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-20">
                <div className="d-flex">
                  <p className="ph-w-30">
                    <UserOutlined
                      className="fontsz-20"
                      style={{ color: "#2067aa" }}
                    />
                  </p>
                  <p className="mt-5 mb-0">Tài Khoản Của Tôi</p>
                </div>
                <div className="d-flex">
                  <p className="ph-w-30"></p>
                  <Link href={"/account/profile"}>
                    <p className="m-0 cursor-pointer link">Hồ sơ</p>
                  </Link>
                </div>
                <div className="d-flex">
                  <p className="ph-w-30"></p>
                  <Link href={"/account/address"}>
                    <p className="m-0 mt-5 cursor-pointer link">Địa Chỉ</p>
                  </Link>
                </div>
                <Link href={"/account/purchase"}>
                  <div className="d-flex mt-10 link-cart cursor-pointer">
                    <p className="ph-w-30">
                      <ProfileOutlined
                        className="fontsz-20"
                        style={{ color: "#2067aa" }}
                      />
                    </p>
                    <p className="m-0 mt-2">Đơn Hàng</p>
                  </div>
                </Link>
              </div>
            </Col>
            <Col span={19}>{props.children}</Col>
          </Row>
        </div>
      </HeaderCustomerLayout>
    </div>
  );
}

import { Dropdown, MenuProps, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkPathReturnTitle } from "@app/utils/titlePage";
import { DownOutlined } from "@ant-design/icons";
import { getProfile } from "@app/api/user/get-profile";
import { useSubscription } from "@app/hooks/subscription";
import { getAccessToken } from "@app/services/auth";
import { useSession } from "@app/hooks/session";
import { useSelector } from "react-redux";
import { getUser } from "@app/redux/users/user-slice";
import Link from "next/link";
interface ChannelSellerLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export function ChannelSellerRegister(props: ChannelSellerLayoutProps) {
  const { logout } = useSession();
  const items: MenuProps["items"] = [
    {
      label: <a onClick={logout}>Đăng xuất</a>,
      key: "0",
    },
  ];
  const user = useSelector(getUser);
  return (
    <section className="vh-100 channel-sell">
      <Row className=" w-100 py-3 channel-sell-header">
        <Row className="container d-flex justify-content-between">
          <div className="d-flex">
            <Link href={"/"}>
              <img className="cursor-pointer"  src="/assets/images/logo/logo2.svg" />
            </Link>
            <h4 className="pt-16">Đăng ký trở thành người bán PeerMarket</h4>
          </div>
          <div className="mt-16">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {user.username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Row>
      </Row>
      <Row>{props.children}</Row>
    </section>
  );
}

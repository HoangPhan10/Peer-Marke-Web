import { CrmCMSLayout } from "@app/common/layout";
import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import ListOrder from "./list-order-admin";
import { useRouter } from "next/router";
import { getProfile } from "@app/api/user/get-profile";
import { getAccessToken } from "@app/services/auth";
import { getShopByUserId } from "@app/api/shop/get-shop-by-user-id";
import { listOrderByShopIdAndStatus } from "@app/api/orders/list-order-by-shop-id";
import { useSubscription } from "@app/hooks/subscription";
import { listOrderByStatus } from "@app/api/orders/list-order-by-status";

export const ListOrderAdmin = () => {
  const [listOrders, setListOrders] = useState<any>([]);
  const [value, setValue] = useState<string>("0");
  const subscription = useSubscription();
  const onChange = (key: string) => {
    setValue(key);
  };

  useEffect(() => {
    getProfile({ jwt: getAccessToken() })
      .toPromise()
      .then((profile) => {
        if (profile.data.role.id === 2) {
          listOrderByStatus(+value).subscribe(
            (res) => {
              setListOrders(res.data);
            },
            (err) => {}
          );
        }
      });
  }, [value]);

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: `Tất cả`,
      children: <ListOrder data={listOrders} type={0} />,
    },
    {
      key: "1",
      label: `Chờ thanh toán`,
      children: <ListOrder data={listOrders} type={1} />,
    },
    {
      key: "6",
      label: `Chờ xác nhận`,
      children: <ListOrder data={listOrders} type={6} />,
    },
    {
      key: "2",
      label: `Vận chuyển`,
      children: <ListOrder data={listOrders} type={2} />,
    },
    {
      key: "3",
      label: `Đang giao`,
      children: <ListOrder data={listOrders} type={3} />,
    },
    {
      key: "4",
      label: `Hoàn thành`,
      children: <ListOrder data={listOrders} type={4} />,
    },
    {
      key: "5",
      label: `Đã hủy`,
      children: <ListOrder data={listOrders} type={5} />,
    },
  ];

  return (
    <div style={{ width: "100%", minHeight: 600 }} className="order">
      <Tabs defaultActiveKey={"0"} items={items} onChange={onChange} />
    </div>
  );
};

ListOrderAdmin.layout = CrmCMSLayout.DASKBOARD_ADMIN;

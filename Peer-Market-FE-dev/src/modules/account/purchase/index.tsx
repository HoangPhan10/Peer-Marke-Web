import { CrmCMSLayout } from "@app/common/layout";
import { Tabs, TabsProps } from "antd";
import React from "react";
import ListOrder from "./list-order";

export const AccountPurchase = () => {
  const onChange = (key: string) => {
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tất cả`,
      children: <ListOrder type={0} />,
    },
    {
      key: "2",
      label: `Chờ thanh toán`,
      children: <ListOrder type={1} />,
    },
    {
      key: "3",
      label: `Chờ xác nhận`,
      children: <ListOrder type={6} />,
    },
    {
      key: "4",
      label: `Vận chuyển`,
      children: <ListOrder type={2} />,
    },
    {
      key: "5",
      label: `Đang giao`,
      children: <ListOrder type={3} />,
    },
    {
      key: "6",
      label: `Hoàn thành`,
      children: <ListOrder type={4} />,
    },
    {
      key: "7",
      label: `Đã hủy`,
      children: <ListOrder type={5} />,
    },
  ];

  return (
    <div style={{ width: "100%", minHeight: 600 }} className="purchase">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

AccountPurchase.layout = CrmCMSLayout.USER_LAYOUT;

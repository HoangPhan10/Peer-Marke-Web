import { CrmCMSLayout } from "@app/common/layout";
import { Tabs, TabsProps } from "antd";
import ListOrder from "./list-order";
import { useEffect, useState } from "react";
import { listOrderByStatus } from "@app/api/orders/list-order-by-status";
import { useSubscription } from "@app/hooks/subscription";

export const PortalShip = () => {
  const [listOrders, setListOrders] = useState<any>([]);
  const [value, setValue] = useState<String>("2");
  const subscription = useSubscription();
  const onChange = (key: string) => {
    setValue(key);
  };

  useEffect(() => {
    const list = listOrderByStatus(+value).subscribe(
      (res) => {
        setListOrders(res.data);
      },
      (err) => {}
    );
    subscription.add(list);
  }, [value]);

  const items: TabsProps["items"] = [
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
  ];

  return (
    <div style={{ width: "100%", minHeight: 600 }} className="order">
      <Tabs defaultActiveKey={"2"} items={items} onChange={onChange} />
    </div>
  );
};

PortalShip.layout = CrmCMSLayout.DASKBOARD_SHIP;

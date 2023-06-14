import { CrmCMSLayout } from "@app/common/layout";
import { Button, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import SettingInfoShop from "./setting-info-shop";
import ShopTransport from "./transport-shop";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUser } from "@app/redux/users/user-slice";
import { useSubscription } from "@app/hooks/subscription";
import { getShopByUserId } from "@app/api/shop/get-shop-by-user-id";

const StartShop = () => {
  const router = useRouter();
  return (
    <div className="pt-5 pb-5  d-flex justify-content-center">
      <div className="start-shop">
        <img src="/assets/images/checked.png" />
        <h5 className="mt-3">Đăng ký thành công</h5>
        <p className="start-shop-msg mb-4">
          Hãy đăng bán sản phẩm đầu tiên để khởi động hành trình bán hàng cùng
          PeerMarket nhé!
        </p>
        <Button
          className="button-danger"
          onClick={() => {
            router.push("/portal/product/new");
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>
    </div>
  );
};

export const Onboarding = () => {
  const user = useSelector(getUser);
  const subscription = useSubscription();
  const [data, setData] = useState<any>({});
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const onSaveStep1 = (data: any) => {
    setData(data);
    next();
  };
  
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(()=>{
    const getShop = getShopByUserId(user.id).subscribe((res)=>{
      setCurrent(2);
    }, (err) => {
      console.log(err);
    })
    subscription.add(getShop);
  },[])
  
  const steps = [
    {
      title: "Cài đặt thông tin cửa hàng",
      content: <SettingInfoShop onSave={onSaveStep1} />,
    },
    {
      title: "Cài đặt vận chuyển",
      content: <ShopTransport data={data} prev={prev} next={next} />,
    },
    {
      title: "Đăng bán sản phẩm",
      content: <StartShop />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    width: "100%",
    textAlign: "center",
    marginTop: 16,
  };

  return (
    <Row className="container channel-seller-onboarding">
      <Steps
        current={current}
        items={items}
        className="container channel-seller-onboarding-step"
      />
      <div style={contentStyle}>{steps[current].content}</div>
    </Row>
  );
};

Onboarding.layout = CrmCMSLayout.CHANNEL_SELLER_REGISTER;

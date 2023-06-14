import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllProduct from "./components/AllProduct";
import { getProfile } from "@app/api/user/get-profile";
import { getAccessToken } from "@app/services/auth";
import { getShopByUserId } from "@app/api/shop/get-shop-by-user-id";
import { useSubscription } from "@app/hooks/subscription";
import { getProductByShopId } from "@app/api/product/get-list-product-by-shop-id";
import { getImageByProductId } from "@app/api/product-detail/get-list-images-by-product-id";
import { FORMAT_PRICE } from "@app/const/format-price";
import { useRouter } from "next/router";
import { getProductByPage } from "@app/api/product/get-list-product-page";
import { LIST_TYPE } from "@app/const/common.const";
import { CrmCMSLayout } from "@app/common/layout";
export const ListProductAdmin = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tất cả`,
      children: <AllProduct type={LIST_TYPE.ALL} />,
    },
    {
      key: "2",
      label: `Đang hoạt động`,
      children: <AllProduct type={LIST_TYPE.ACTIVE} />,
    },
    {
      key: "3",
      label: `Hết hàng`,
      children: <AllProduct type={LIST_TYPE.OUT_OF_STOCK} />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      className="portal-list-product"
      style={{ padding: 20, height: 672, backgroundColor: "white" }}
      items={items}
    />
  );
};

ListProductAdmin.layout = CrmCMSLayout.DASKBOARD_ADMIN;
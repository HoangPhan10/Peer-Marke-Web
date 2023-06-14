import { listOrderByShopIdAndStatus } from "@app/api/orders/list-order-by-shop-id";
import { listOrderByUserIdAndStatus } from "@app/api/orders/list-order-by-user-id";
import { updateStatusOrder } from "@app/api/orders/update-status-order";
import { getShopByUserId } from "@app/api/shop/get-shop-by-user-id";
import { getProfile } from "@app/api/user/get-profile";
import { LIST_STATUS } from "@app/const/common.const";
import { FORMAT_PRICE } from "@app/const/format-price";
import { useSubscription } from "@app/hooks/subscription";
import { getAccessToken } from "@app/services/auth";
import { Button, Tag } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ListOrder(props) {
  const { type, data } = props;
  const [shop, setShop] = useState<any>({});
  const [listOrders, setListOrders] = useState<any>(data);
  const router = useRouter();
  useEffect(() => {
    getProfile({ jwt: getAccessToken() })
      .toPromise()
      .then((profile) => {
        getShopByUserId(profile.data.id)
          .toPromise()
          .then((res) => {
            setShop(res.data);
          });
      });
  }, []);

  useEffect(() => {
    if (data) {
      setListOrders(data);
    }
  }, [data]);

  const onConfirm = (item: any) => {
    const data = {
      idStatus: 2,
      idOrder: item.orderId,
    };
    updateStatusOrder(data).subscribe(
      (res) => {
        listOrderByShopIdAndStatus(shop.id, type).subscribe(
          (res) => {
            setListOrders(res.data);
            toast.success("Cập nhật trạng thái đơn hàng thành công.")
          },
          (err) => {}
        );
      },
      (err) => {}
    );
  };

  return (
    <div>
      {listOrders.length > 0 ? (
        listOrders.map((item, index) => {
          const { cart, transport, status } = item;
          return (
            <div key={index} className="mt-20">
              <div
                className="flex justify-content-between"
                style={{
                  borderBottom: "1px solid #e8e8e8",
                  padding: "10px 30px 10px 30px",
                  backgroundColor: "white",
                }}
              >
                <div className="flex">
                  <Tag color="#ee4d2d">Yêu thích</Tag>
                  <p className="m-0">
                    {cart.productResponse.product.shop.name}
                  </p>
                </div>
                <p className="m-0" style={{ color: "#ee4d2d" }}>
                  {LIST_STATUS.find((elm) => elm.id === status.id)?.name}
                </p>
              </div>
              <div
                className="pt-10 flex justify-content-between"
                style={{
                  borderBottom: "1px solid #e8e8e8",
                  padding: "0px 30px 10px 30px",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="flex cursor-pointer"
                  onClick={() => router.push("#")}
                >
                  <div
                    className="image ph-w-80 ph-h-80"
                    style={{
                      backgroundImage: `url(${cart.productResponse.images[0].urls[0]})`,
                    }}
                  ></div>
                  <div className="pt-7 pl-10">
                    <p className="m-0">{cart.productResponse.product.title}</p>
                    <p className="fontsz-14 m-0" style={{ color: "#0000008a" }}>
                      Phân loại hàng: {cart.cart.color},{cart.cart.size}
                    </p>
                    <p className="m-0">Số lượng: x{cart.cart.quantity}</p>
                  </div>
                </div>

                <p style={{ color: "#ee4d2d" }} className="mt-20">
                  ₫{FORMAT_PRICE(`${cart.productResponse.product.price}`)}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fffefb",
                  padding: "10px 30px 20px 0",
                }}
              >
                <div className="flex justify-content-end">
                  <div className="flex">
                    <p className="m-0 pt-5 pr-10">
                      Vận chuyển {transport.name}:{" "}
                    </p>
                    <p
                      style={{ color: "#ee4d2d" }}
                      className="fontsz-20 m-0 text-end"
                    >
                      ₫{FORMAT_PRICE(`${transport.price}`)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-content-end">
                  <div className="flex mb-10">
                    <p className="pt-5 pr-10 m-0">Thành tiền: </p>
                    <p
                      style={{ color: "#ee4d2d" }}
                      className="fontsz-20 text-end m-0"
                    >
                      ₫{FORMAT_PRICE(`${cart.cart.total + transport.price}`)}
                    </p>
                  </div>
                </div>
                {status.id === 6 && (
                  <div className="flex justify-content-end">
                    <Button
                      className="button-submit ph-h-40 ph-w-140"
                      style={{ opacity: 1 }}
                      onClick={() => onConfirm(item)}
                    >
                      Xác Nhận
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div
          className="mt-20 flex justify-content-center"
          style={{ backgroundColor: "white", height: 500 }}
        >
          <div style={{ marginTop: 160 }}>
            <img
              height={100}
              width={100}
              className="ml-50 mb-10"
              src="/assets/images/purchase.png"
            />
            <p className="fontsz-18">Không tìm thấy đơn hàng</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListOrder;

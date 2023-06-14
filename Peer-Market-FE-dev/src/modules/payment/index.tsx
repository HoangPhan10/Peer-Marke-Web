import { CrmCMSLayout } from "@app/common/layout";
import { FORMAT_PRICE, dayTransport } from "@app/const/format-price";
import { getProductPayment, getUser } from "@app/redux/users/user-slice";
import { Button, Col, Input, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Transport } from "./transport";
import { useSubscription } from "@app/hooks/subscription";
import { getListTransport } from "@app/api/transport/get-list-transport";
import { getAddressByUserId } from "@app/api/address/list-address-by-user-id";
import { Address } from "./address";
import { getListPayment } from "@app/api/payment/list-payment";
import { PaymentMethod } from "./payment_method";
import { createOrderPayment } from "@app/api/orders/create-order";
import { createPaymentVnpay } from "@app/api/payment/create-payment-vnpay";
import { useRouter } from "next/router";

export const Payment = () => {
  const productSelected = useSelector(getProductPayment);
  const userSelected = useSelector(getUser);
  const route = useRouter();
  const [isOpenTransport, setIsOpenTransport] = useState<boolean>(false);
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [isOpenPaymentMethod, setIsOpenPaymentMethod] =
    useState<boolean>(false);
  const [orderPayment, setOrderPayment] = useState<any>([]);
  const [listTransport, setListTransport] = useState<any>([]);
  const [addressNow, setAddressNow] = useState<any>({});
  const [transport, setTransport] = useState<any>({});
  const [idTransport, setIdTransport] = useState<number>(0);
  const [listPayment, setListPayment] = useState<any>([]);
  const [paymentNow, setPaymentNow] = useState<any>({});
  const subscription = useSubscription();
  useEffect(() => {
    const listTransport = getListTransport().subscribe((res) => {
      setListTransport(res.data);
    });
    subscription.add(listTransport);
  }, []);

  useEffect(() => {
    const addresses = getAddressByUserId(userSelected.id).subscribe((res) => {
      setAddressNow(res.data[0]);
    });
    subscription.add(addresses);
  }, []);

  useEffect(() => {
    const payments = getListPayment().subscribe((res) => {
      setListPayment(res.data);
      setPaymentNow(res.data[0]);
    });
    subscription.add(payments);
  }, []);

  const totalPriceProduct = () => {
    let total = 0;
    orderPayment.forEach((item) => {
      total += item.order.cart.total;
    });
    return FORMAT_PRICE(`${total}`);
  };

  const totalTransport = () => {
    let total = 0;
    orderPayment.forEach((item) => {
      total += item.transport?.price;
    });
    return FORMAT_PRICE(`${total}`);
  };

  const totalPrice = () => {
    let total = 0;
    orderPayment.forEach((item) => {
      total += item.transport?.price + item.order.cart.total;
    });
    return total;
  };

  useEffect(() => {
    if (!productSelected) {
      route.push("/account/purchase");
      return;
    }
    if (listTransport.length === 0) return;
    const data = productSelected.map((item, index) => {
      return {
        id: index + 1,
        order: item,
        message: "",
        transport: listTransport[0],
      };
    });
    setOrderPayment(data);
  }, [productSelected, listTransport]);

  const onCreateTransport = (values: any, id: number) => {
    const orderPaymentClone = [...orderPayment];
    orderPaymentClone[id - 1].transport = values;
    setOrderPayment(orderPaymentClone);
    setIsOpenTransport(false);
  };

  const onChangeTransport = (item: any) => {
    setIdTransport(item.id);
    setTransport(item.transport);
    setIsOpenTransport(true);
  };

  const onChangeMessage = (value: any, id: number) => {
    const orderPaymentClone = [...orderPayment];
    orderPaymentClone[id - 1].message = value;
    setOrderPayment(orderPaymentClone);
  };

  const onCreateAddress = (value: any) => {
    setAddressNow(value);
    setIsOpenAddress(false);
  };

  const onCreatePaymentMethod = (value: any) => {
    setPaymentNow(value);
    setIsOpenPaymentMethod(false);
  };

  const createOrder = () => {
    const order = orderPayment.map((el) => {
      return {
        message: el.message,
        idCart: el.order.cart.id,
        idTransport: el.transport.id,
        idShop:el.order.productResponse.product.shop.id
      };
    });

    const payload = {
      idUser: userSelected.id,
      idAddress: addressNow.id,
      idPayment: paymentNow.id,
      order: order,
    };

    createOrderPayment(payload).subscribe(
      (res) => {
        const listOrder = res.data.map((elm) => elm.id);
        const data = {
          content_pay: "Thanh Toan Hoa Don Mua Tai PeerMarket",
          list_id_order: listOrder,
          amount: totalPrice() * 100,
        };
        if (paymentNow.id === 1) {
          route.push("/account/purchase");
          return;
        }
        createPaymentVnpay(data).subscribe(
          (res) => {
            route.push(res.data.url);
          },
          (err) => console.log(err)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ backgroundColor: "white" }} className="ph-h-80 mb-30">
        <div className="container">
          <h2 style={{ color: "#ee4d2d" }} className="pt-20">
            Thanh Toán
          </h2>
        </div>
      </div>

      <div
        className="container ph-h-100 p-0"
        style={{ backgroundColor: "white" }}
      >
        <div className="vtrWey"></div>
        <div className="p-25">
          <div className="flex" style={{ color: "#ee4d2d" }}>
            <svg
              height="16"
              fill="#ee4d2d"
              viewBox="0 0 12 16"
              width="12"
              className="shopee-svg-icon icon-location-marker mt-5 mr-5"
            >
              <path
                d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                fill-rule="evenodd"
              ></path>
            </svg>
            <p className="fontsz-18 m-0">Địa Chỉ Nhận Hàng</p>
          </div>
          <div className="flex justify-content-between">
            {!!addressNow ? (
              <div className="flex pb-20">
                <strong className="fontsz-16 pr-10">
                  {addressNow.name_receiver} (+84) {addressNow.phone}
                </strong>
                <p className="fontsz-16">{addressNow.address};</p>
                <Tag color="magenta" className="ph-h-20 ml-20">
                  Địa chỉ nhận hàng
                </Tag>
              </div>
            ) : (
              <p>Vui lòng thêm địa chỉ.</p>
            )}
            <Button
              style={{ opacity: 1, marginTop: "-10px" }}
              className="button-submit ml-50 ph-h-30 ph-w-100 mr-125"
              onClick={() => setIsOpenAddress(true)}
            >
              Thay Đổi
            </Button>
          </div>
        </div>
      </div>

      <div className="container p-0 mt-15">
        <Row className="p-25" style={{ height: 40, backgroundColor: "white" }}>
          <Col span={10} className="fontsz-18">
            Sản phẩm
          </Col>
          <Col span={4}></Col>
          <Col span={3} style={{ color: "#bbbbbb" }}>
            Đơn giá
          </Col>
          <Col span={3} style={{ color: "#bbbbbb" }}>
            Số lượng
          </Col>
          <Col className="text-end" span={4} style={{ color: "#bbbbbb" }}>
            Thành tiền
          </Col>
        </Row>
        {orderPayment.length > 0 &&
          orderPayment.map((item) => (
            <div
              style={{ height: "auto", backgroundColor: "white" }}
              className="pt-20 mb-20"
            >
              <div className="d-flex plr-25">
                <Tag color="#ee4d2d" className="ph-h-20">
                  Yêu thích +
                </Tag>
                <p className="fontsz-14">
                  {item.order.productResponse.product.shop.name}
                </p>
              </div>
              <Row
                className="pb-10 plr-25"
                style={{ borderBottom: "2px dashed rgba(0,0,0,.09);" }}
              >
                <Col span={10} className="fontsz-18 flex">
                  <img
                    className="image ph-h-40 ph-w-40"
                    style={{
                      backgroundImage: `url(${item.order.productResponse.images[0].urls[0]})`,
                    }}
                  />
                  <p className="fontsz-14 over-flow p-10 ph-h-30">
                    {item.order.productResponse.product.title}
                  </p>
                </Col>
                <Col span={4} style={{ color: "#bbbbbb" }}>
                  <p className="pt-10 fontsz-14">
                    Loại:{" "}
                    {item.order.cart?.color && item.order.cart?.color + ","}{" "}
                    {item.order.cart?.size}
                  </p>
                </Col>
                <Col span={3} className="pt-10">
                  ₫{FORMAT_PRICE(`${item.order.productResponse.product.price}`)}
                </Col>
                <Col span={3} className="pl-20 pt-10">
                  {item.order.cart.quantity}
                </Col>
                <Col className="text-end pt-10" span={4}>
                  ₫{FORMAT_PRICE(`${item.order.cart.total}`)}
                </Col>
              </Row>
              <Row
                className="plr-25"
                style={{
                  backgroundColor: "#fafdff",
                  borderBottom: "2px dashed rgba(0,0,0,.09);",
                }}
              >
                <Col
                  span={9}
                  className="fontsz-18 flex ptb-15"
                  style={{ borderRight: "2px dashed rgba(0,0,0,.09);" }}
                >
                  <p className="fontsz-14 mt-10 mr-15">Lời nhắn :</p>
                  <Input
                    className="ph-h-40 ph-w-340"
                    placeholder="Lưu ý cho người bán"
                    value={item.message}
                    onChange={(e) => onChangeMessage(e.target.value, item.id)}
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={4} style={{ color: "#00BFA5" }}>
                  <p className="pt-25 fontsz-14">Đơn vị vận chuyển</p>
                </Col>
                <Col span={4} className="pt-15">
                  <p className="fontsz-14 m-0">{item.transport?.name}</p>
                  <p className="fontsz-12">{dayTransport(item.transport.id)}</p>
                </Col>
                <Col
                  span={4}
                  className="pl-20 pt-25 flex justify-content-end pr-20"
                >
                  <Button
                    className="button-submit ph-h-30 ph-w-100"
                    style={{ opacity: 1 }}
                    onClick={() => onChangeTransport(item)}
                  >
                    Thay đổi
                  </Button>
                </Col>
                <Col className="text-end pt-30" span={2}>
                  ₫{FORMAT_PRICE(`${item.transport?.price}`)}
                </Col>
              </Row>
              <div
                className="p-25 flex justify-content-end"
                style={{ backgroundColor: "#fafdff" }}
              >
                <div className="flex">
                  <p className="mb-0 mt-5 mr-10 fontsz-14">
                    Tổng số tiền (1 sản phẩm):
                  </p>
                  <p className="fontsz-20 mb-0" style={{ color: "#ee4d2d" }}>
                    ₫
                    {FORMAT_PRICE(
                      `${item.transport?.price + item.order.cart.total}`
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {orderPayment.length > 0 && (
          <div className="" style={{ backgroundColor: "white" }}>
            <Row
              className="p-25"
              style={{ borderBottom: "1px solid rgba(0,0,0,.09)" }}
            >
              <Col span={15} className="fontsz-18">
                Phương thức thanh toán
              </Col>
              <Col span={4} className="fontsz-14 pt-5">
                {paymentNow.name_payment}
              </Col>
              <Col span={5} className="">
                <Button
                  className="button-submit ph-h-30 ph-w-100 ml-40"
                  style={{ opacity: 1 }}
                  onClick={() => setIsOpenPaymentMethod(true)}
                >
                  Thay đổi
                </Button>
              </Col>
            </Row>
            <div style={{ backgroundColor: "#fffefb" }} className="ptb-20">
              <Row className="plr-25 mb-10">
                <Col span={20}></Col>
                <Col span={2} className="fontsz-14">
                  Tổng tiền hàng
                </Col>
                <Col span={2} className="text-end">
                  ₫{totalPriceProduct()}
                </Col>
              </Row>
              <Row className="plr-25 mb-10">
                <Col span={20}></Col>
                <Col span={2} className="fontsz-14">
                  Phí vận chuyển
                </Col>
                <Col span={2} className="text-end">
                  ₫{totalTransport()}
                </Col>
              </Row>
              <Row className="plr-25 mb-10">
                <Col span={20}></Col>
                <Col span={2} className="fontsz-14 pt-7">
                  Tổng thanh toán
                </Col>
                <Col
                  span={2}
                  className="text-end fontsz-22"
                  style={{ color: "#ee4d2d" }}
                >
                  ₫{FORMAT_PRICE(`${totalPrice()}`)}
                </Col>
              </Row>
              <div className="flex justify-content-end plr-25">
                <Button
                  className="button-submit ph-w-282"
                  style={{ opacity: 1 }}
                  onClick={createOrder}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Transport
        open={isOpenTransport}
        id={idTransport}
        transport={transport}
        listTransport={listTransport}
        onCreate={onCreateTransport}
        onCancel={() => setIsOpenTransport(false)}
      />
      <Address
        address={addressNow}
        open={isOpenAddress}
        onCancel={() => setIsOpenAddress(false)}
        onCreate={onCreateAddress}
      />
      <PaymentMethod
        payment={paymentNow}
        open={isOpenPaymentMethod}
        onCancel={() => setIsOpenPaymentMethod(false)}
        onCreate={onCreatePaymentMethod}
        listPayment={listPayment}
      />
    </div>
  );
};

Payment.layout = CrmCMSLayout.HEADER_CUSTOMER;

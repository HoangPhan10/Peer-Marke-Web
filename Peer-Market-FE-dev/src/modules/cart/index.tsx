import { getCartsByUserId } from "@app/api/cart/list-cart-by-user-id";
import { getProfile } from "@app/api/user/get-profile";
import { CrmCMSLayout } from "@app/common/layout";
import { FORMAT_PRICE } from "@app/const/format-price";
import { useSubscription } from "@app/hooks/subscription";
import { getAccessToken, saveProductPayment } from "@app/services/auth";
import { Button, Checkbox, Col, Modal, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteCartById } from "@app/api/cart/delete-cart-by-id";
import { toast } from "react-toastify";
import { useAppDispatch } from "@app/hooks/redux/useAppDispatch";
import { addProductPayment } from "@app/redux/users/user-slice";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { addUser } from "@app/redux/users/user-slice";

const { confirm, warning } = Modal;
export const Cart = () => {
  const [listCart, setListCart] = useState<any>([]);
  const subscription = useSubscription();
  const [user, setUser] = useState<any>({});
  const [listChecked, setListChecked] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isRender, setIsRender] = useState<boolean>(false);
  useEffect(() => {
    getProfile({ jwt: getAccessToken() })
      .toPromise()
      .then((profile) => {
        setUser(profile.data);
      });
  }, []);
  useEffect(() => {
    const carts = getCartsByUserId(user.id).subscribe((res) => {
      setListCart(res.data);
    });
    subscription.add(carts);
  }, [user, isRender]);

  const onPayment = () => {
    if (listChecked.length === 0) {
      warning({ title: "Vui lòng chọn đơn hàng để thanh toán." });
      return;
    }
    const listProductPayment = listCart.filter((el) => {
      return listChecked.includes(el.cart.id);
    });
    dispatch(addUser(user));
    dispatch(addProductPayment(listProductPayment));
    router.push("/payment");
  };
  const onchangeCheckBoxAll = (checked: boolean) => {
    if (!checked) {
      setListChecked([]);
      return;
    }
    const checkeds = listCart.map((el) => el.cart.id);
    setListChecked(checkeds);
  };

  const onchangeCheckBox = (checked: boolean, id: number) => {
    if (checked) {
      setListChecked([...listChecked, id]);
      return;
    }
    const start = listChecked.indexOf(id);
    const listCheckedClone = [...listChecked];
    listCheckedClone.splice(start, 1);
    setListChecked(listCheckedClone);
  };

  useEffect(() => {
    let totalPrice = 0;
    listCart.forEach((el) => {
      if (listChecked.includes(el.cart.id)) {
        totalPrice += el.cart.total;
      }
    });
    setTotal(totalPrice);
  }, [listChecked]);

  const confirmDelete = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa nó khỏi giỏ hàng?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      okButtonProps: {},
      cancelText: "Không",
      onOk() {
        deleteCartById(id).subscribe(
          (res) => {
            toast.success("Xóa dữ liệu khỏi giỏ hàng thành công.");
            setIsRender(!isRender);
          },
          (err) => {}
        );
      },
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ backgroundColor: "white" }} className="ph-h-80 mb-30">
        <div className="container">
          <h2 style={{ color: "#ee4d2d" }} className="pt-20">
            Giỏ Hàng
          </h2>
        </div>
      </div>
      <div
        className="container"
        style={{ backgroundColor: "white", height: 60, borderRadius: 5 }}
      >
        <Row className="pt-20">
          <Col span={12}>
            <Checkbox
              onChange={(e) => onchangeCheckBoxAll(e.target.checked)}
              checked={listChecked.length === listCart.length}
            >
              Sản Phẩm
            </Checkbox>
          </Col>
          <Col span={3}>Đơn Giá</Col>
          <Col span={3}>Số Lượng</Col>
          <Col span={3}>Số Tiền</Col>
          <Col span={3}>Thao Tác</Col>
        </Row>
      </div>
      <div
        className="container mt-30"
        style={{ backgroundColor: "white", height: "auto", borderRadius: 5 }}
      >
        {listCart.map((item, index) => (
          <Row
            key={index}
            className="pt-20 pb-30"
            style={{ borderBottom: "1px solid rgba(0,0,0,.09)" }}
          >
            <Col span={12} className="d-flex">
              <Checkbox
                className="mt-30"
                onChange={(e) =>
                  onchangeCheckBox(e.target.checked, item.cart.id)
                }
                checked={!!listChecked.find((el) => el === item.cart.id)}
              ></Checkbox>
              <div className="ml-7">
                <div className="d-flex">
                  <div
                    className="image-bg-detail"
                    style={{
                      height: 100,
                      width: 100,
                      backgroundImage: `url(${item.productResponse.images[0].urls[0]})`,
                    }}
                  ></div>
                  <div className="ml-10 mt-30">
                    <p className="m-0 over-flow" style={{ color: "#ee4d2d" }}>
                      {item.productResponse.product.title}
                    </p>
                    <div className="d-flex">
                      <p
                        className="pr-5"
                        style={{ borderRight: "1px solid #ccc" }}
                      >
                        Số lượng : {item.cart.quantity}
                      </p>
                      {item.cart.color && (
                        <p className="pr-5 pl-5">Màu sắc : {item.cart.color}</p>
                      )}
                      {item.cart.size && (
                        <p
                          className="pl-5"
                          style={{ borderLeft: "1px solid #ccc" }}
                        >
                          Size : {item.cart.size}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={3} className="mt-30">
              <p>₫{FORMAT_PRICE(`${item.productResponse.product.price}`)}</p>
            </Col>
            <Col span={3} className="mt-30">
              <p className="pl-20">{item.cart.quantity}</p>
            </Col>
            <Col span={3} className="mt-30">
              <p style={{ color: "#ee4d2d" }}>
                ₫{FORMAT_PRICE(`${item.cart.total}`)}
              </p>
            </Col>
            <Col span={3} className="mt-30">
              <Button onClick={() => confirmDelete(item.cart.id)}>Xóa</Button>
            </Col>
          </Row>
        ))}
        <div className="d-flex justify-content-between m-20 pb-20">
          <div></div>
          <div className="d-flex">
            <p className="mt-10">{`Tổng thanh toán (${listChecked.length} Sản phẩm):`}</p>
            <p className="m-10" style={{ color: "#ee4d2d" }}>
              ₫{FORMAT_PRICE(`${total}`)}
            </p>
            <Button
              className="button-submit ph-w-150"
              onClick={() => onPayment()}
            >
              Mua Hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.layout = CrmCMSLayout.HEADER_CUSTOMER;

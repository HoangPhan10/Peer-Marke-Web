import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCartsByUserId } from "@app/api/cart/list-cart-by-user-id";
import { getProductById } from "@app/api/product/get-product-by-id";
import { getListType } from "@app/api/type/get-list-type";
import { getProfile } from "@app/api/user/get-profile";
import { FORMAT_PRICE } from "@app/const/format-price";
import { useSession } from "@app/hooks/session";
import { useSubscription } from "@app/hooks/subscription";
import { clearUserCredential, getAccessToken } from "@app/services/auth";
import { Button, Dropdown, Input, MenuProps, Popover, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
interface ChannelSellerLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export function HeaderCustomerLayout(props: ChannelSellerLayoutProps) {
  const subscription = useSubscription();
  const router = useRouter();
  const [listCart, setListCart] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listTypes, setListTypes] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  const OrderDetail = ({ data }) => {
    const router = useRouter();
    return (
      <div style={{ width: 500 }}>
        {data.length > 0 ? (
          <>
            {data.slice(0, 5).map((item) => (
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div
                    className="image-bg-detail"
                    style={{
                      backgroundImage: `url(${item.productResponse.images[0].urls[0]})`,
                    }}
                  ></div>
                  <div className="ml-10 mt-10">
                    <p className="m-0 over-flow">
                      {item.productResponse.product.title}
                    </p>
                    <div className="d-flex">
                      <p
                        className="fontsz-13 pr-5"
                        style={{ borderRight: "1px solid #ccc" }}
                      >
                        Số lượng : {item.cart.quantity}
                      </p>
                      {item.cart.color && (
                        <p className="fontsz-13 pr-5 pl-5">
                          Màu sắc : {item.cart.color}
                        </p>
                      )}
                      {item.cart.size && (
                        <p
                          className="fontsz-13 pl-5"
                          style={{ borderLeft: "1px solid #ccc" }}
                        >
                          Size : {item.cart.size}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <p
                  className="mt-20"
                  style={{ color: "#ee4d2d" }}
                >{`₫${FORMAT_PRICE(`${item.cart.total}`)}`}</p>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-15">
              <p></p>
              <Button
                className="button-submit"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/cart");
                }}
              >
                Xem Giỏ Hàng
              </Button>
            </div>
          </>
        ) : (
          <p className="middle">Chưa có sản phẩm nào thêm vào giỏ hàng.</p>
        )}
      </div>
    );
  };

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
  }, [user, router]);

  useEffect(() => {
    const types = getListType().subscribe((res) => {
      setListTypes(res.data);
    });
    subscription.add(types);
  }, []);

  const items = [
    {
      key: "1",
      label: <Link href="/account/profile">Tài khoản của tôi</Link>,
    },
    {
      key: "2",
      label: <Link href="/account/purchase">Đơn mua</Link>,
    },
    {
      key: "3",
      label: (
        <p
          onClick={() => {
            clearUserCredential();
            router.push("/auth/login");
          }}
          className="m-0"
        >
          Đăng xuất
        </p>
      ),
    },
  ];
  const onSearch = () => {
    if (search.trim().length > 0) {
      router.push("/list-product?search=" + search.trim());
      setSearch("");
    }
  };
  return (
    <section className="vh-100 product-view">
      <Row
        className=" w-100 pt-3 product-view-header"
        style={{ position: "fixed", zIndex: 16 }}
      >
        <Row className="container d-flex justify-content-between">
          <div className="d-flex mb-10">
            <Link
              href={"/channel-seller/login"}
              className="m-0 mr-15 color-white"
            >
              Kênh người bán
            </Link>
            <p className="m-0 ml-15 color-white">
              <Link href={"#"} className="m-0 mr-15 color-white">
                Tải ứng dụng
              </Link>
            </p>
          </div>
          {user.username ? (
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              className="dropdown-header"
            >
              <p className="p-0 m-0 color-white fontsz-16 cursor-pointer d-flex">
                <UserOutlined className="pt-3 mr-5" />
                <span>{user.username}</span>
              </p>
            </Dropdown>
          ) : (
            <div className="d-flex fontsz-14" style={{ color: "white" }}>
              <p
                className="cursor-pointer"
                onClick={() => router.push("/auth/login")}
              >
                Đăng Nhập
              </p>
              <p className="plr-5">/</p>
              <p
                className="cursor-pointer"
                onClick={() => router.push("/auth/register")}
              >
                {" "}
                Đăng ký
              </p>
            </div>
          )}
        </Row>
        <Row className="container d-flex justify-content-between">
          <img
            onClick={() => router.push("/")}
            src="/assets/images/logo/logo-header-customer.png"
            height={50}
            className="cursor-pointer"
          />
          <div>
            <div className="d-flex header-search">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm"
              />
              <Button onClick={onSearch}>
                <SearchOutlined />
              </Button>
            </div>
            <div className="flex ">
              {listTypes.map((type, index) => (
                <Link href={`/list-product?type=${type.id}`} key={index}>
                  <p
                    className="mb-0 ptb-5 mr-15 fontsz-14 cursor-pointer"
                    style={{ color: "white" }}
                  >
                    {type.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <Popover
              content={<OrderDetail data={listCart} />}
              title="Sản phẩm mới thêm"
              trigger="hover"
              placement="bottomLeft"
              onOpenChange={() => {
                setIsOpen(!isOpen);
              }}
              open={isOpen}
            >
              <p className="color-white pt-8">
                <ShoppingCartOutlined className="fontsz-30 cursor-pointer" />
              </p>
            </Popover>
          </div>
        </Row>
      </Row>
      <Row
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "auto",
          paddingBottom: 50,
        }}
        className="pt-100"
      >
        {props.children}
      </Row>
    </section>
  );
}

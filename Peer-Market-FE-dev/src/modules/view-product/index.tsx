import { CrmCMSLayout } from "@app/common/layout";
import { Button, Col, Rate, Row } from "antd";
import { useRouter } from "next/router";
import {
  LeftOutlined,
  RightOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProductById } from "@app/api/product/get-product-by-id";
import { useSubscription } from "@app/hooks/subscription";
import { FORMAT_PRICE } from "@app/const/format-price";
import { Loading } from "@app/common/components/Loading";
import { getProfile } from "@app/api/user/get-profile";
import { getAccessToken } from "@app/services/auth";
import { toast } from "react-toastify";
import { createCart } from "@app/api/cart/create-cart";
import { getCartsById } from "@app/api/cart/get-cart-by-id";
import { useAppDispatch } from "@app/hooks/redux/useAppDispatch";
import { addProductPayment, addUser } from "@app/redux/users/user-slice";
import { listCommentsByProductId } from "@app/api/comment/list-comment-by-product-id";
import { getProductByShopId } from "@app/api/product/get-list-product-by-shop-id";
// import 'react-slideshow-image/dist/styles.css'

const listImages = [
  "/assets/images/avatar1.jpg",
  "/assets/images/avatar2.jpg",
  "/assets/images/avatar3.jpg",
  "/assets/images/avatar4.jpg",
];

export const ViewProduct = () => {
  const router = useRouter();
  const [numProductByShop, setNumProductByShop] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(100);
  const [idColor, setIdColor] = useState<number>(-1);
  const [idSize, setIdSize] = useState<number>(-1);
  const [num, setNum] = useState<number>(1);
  const [idProductReview, setIdProductReview] = useState<number>(0);
  const subscription = useSubscription();
  const [listColor, setListColor] = useState<any>([]);
  const [listSize, setListSize] = useState<any>([]);
  const [listImage, setListImage] = useState<any>([]);
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [commentsRate, setCommentsRate] = useState<any>([]);
  const dispatch = useAppDispatch();
  const [listComment, setListComment] = useState<any>([]);
  const [rateAver, setRateAver] = useState<number>(0);
  const [listProductReview, setListProductReview] = useState<any>([
    {
      id: 0,
      title: "Tất cả",
    },
    {
      id: 5,
      title: "5 Sao (0)",
    },
    {
      id: 4,
      title: "4 Sao (0)",
    },
    {
      id: 3,
      title: "3 Sao (0)",
    },
    {
      id: 2,
      title: "2 Sao (0)",
    },
    {
      id: 1,
      title: "1 Sao (0)",
    },
  ]);

  const {
    query: { id },
  } = router;

  useEffect(() => {
    setIsLoading(true);
    const getProduct = getProductById(+id).subscribe(
      (res) => {
        getProductByShopId(res.data.product.shop.id).subscribe(res =>{
          setNumProductByShop(res.data.length);
        })
        const { product, images, sizes, colors } = res.data;
        const imageList = images[0]["urls"];
        if (colors[0]) {
          const colorList = colors[0]["colors"].map((col, index) => {
            return {
              id: index + 1,
              name: `Màu ${col}`,
            };
          });
          setListColor(colorList);
        }
        if (sizes[0]) {
          const sizeList = sizes[0]["sizes"].map((size, index) => {
            return {
              id: index + 1,
              name: `Size ${size}`,
            };
          });
          setListSize(sizeList);
        }
        setProduct(product);
        setListImage(imageList);
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
      }
    );
    subscription.add(getProduct);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    const lists = listCommentsByProductId(+id).subscribe((res) => {
      setListComment(res.data);
      setCommentsRate(res.data);
      setListProductReview([
        {
          id: 0,
          title: "Tất cả",
        },
        {
          id: 5,
          title: `5 Sao (${res.data.filter((el) => el.rate === 5).length})`,
        },
        {
          id: 4,
          title: `4 Sao (${res.data.filter((el) => el.rate === 4).length})`,
        },
        {
          id: 3,
          title: `3 Sao (${res.data.filter((el) => el.rate === 3).length})`,
        },
        {
          id: 2,
          title: `2 Sao (${res.data.filter((el) => el.rate === 2).length})`,
        },
        {
          id: 1,
          title: `1 Sao (${res.data.filter((el) => el.rate === 1).length})`,
        },
      ]);
      setIsLoading(false);
    });
    subscription.add(lists);
  }, [id]);

  useEffect(() => {
    if (listComment.length > 0) {
      let total = 0;
      listComment.map((comment) => (total += comment.rate));
      setRateAver(total / listComment.length);
    }
  }, [listComment]);

  const [imageIndex, setImageIndex] = useState<number>(0);

  const nextImage = () => {
    setImageIndex(imageIndex + 1);
  };

  const prevImage = () => {
    setImageIndex(imageIndex - 1);
  };

  const subNum = () => {
    setNum((n) => {
      if (n > 1) {
        return n - 1;
      }
      return n;
    });
  };
  const addNum = () => {
    setNum((n) => {
      if (n === quantity) {
        return n;
      }
      return n + 1;
    });
  };

  useEffect(() => {
    getProfile({ jwt: getAccessToken() })
      .toPromise()
      .then((profile) => {
        setUser(profile.data);
      });
  }, []);

  const onchangeRate = (item: any) => {
    setIdProductReview(item.id);
    const data = listComment.filter((el) => {
      if (item.id === 0) return el;
      return item.id === el.rate;
    });
    setCommentsRate(data);
  };

  const paramCart = (id: any) => {
    if (!user.id) {
      router.push("/auth/login?callback=" + router.asPath);
      return;
    }

    if (listColor.length > 0 && !listColor[idColor]) {
      toast.warning("Vui lòng chọn màu sắc.");
      return;
    }
    if (listSize.length > 0 && !listSize[idSize]) {
      toast.warning("Vui lòng chọn size.");
      return;
    }
    const sizeValue = listSize[idSize];
    const colorValue = listColor[idColor];
    const cartRequest = {
      color: colorValue?.name,
      size: sizeValue?.name,
      userId: id,
      productId: product.id,
      quantity: num,
      total: product.price * num,
    };

    createCart(cartRequest).subscribe((res) => {
      if (id === 9) {
        getCartsById(res.data.id).subscribe((carts) => {
          router.push("/payment");
          dispatch(addUser(user));
          dispatch(addProductPayment([carts.data]));
        });

        return;
      }
      toast.success("Thêm vào giỏ hàng thành công");
      router.push("/cart");
    });
  };

  const addCart = () => {
    paramCart(user.id);
  };

  const addPayment = () => {
    paramCart(9);
  };

  return (
    <div className="container pb-80" style={{ height: "auto" }}>
      <Loading show={isLoading} />
      {product.type && (
        <>
          <div
            className="slide-container mt-30"
            style={{ backgroundColor: "white" }}
          >
            <p className="fontsz-18 ml-60 mb-0 ptb-10">{product.type.name}</p>
            <Row className="flex justify-content-between">
              <Col className="ml-30">
                <div className="ml-30 ph-relative" style={{ width: "350px" }}>
                  <div
                    className="image cursor-pointer"
                    style={{
                      backgroundImage: `url(${listImage[imageIndex]})`,
                      width: "300px",
                      height: "400px",
                    }}
                  ></div>
                </div>
                <div className="d-flex m-10 ph-relative">
                  <p
                    onClick={() => {
                      imageIndex !== 0 && prevImage();
                    }}
                    style={{ cursor: imageIndex === 0 && "no-drop" }}
                    className="icon-prev-absolute"
                  >
                    <LeftOutlined className="fontsz-25 font-bold" />
                  </p>
                  <p
                    onClick={() => {
                      imageIndex !== listImage.length - 1 && nextImage();
                    }}
                    style={{
                      cursor: imageIndex === listImage.length - 1 && "no-drop",
                    }}
                    className="icon-next-absolute"
                  >
                    <RightOutlined className="fontsz-25 font-bold" />
                  </p>
                  {listImage.map((image, index) => (
                    <div
                      onClick={() => setImageIndex(index)}
                      className="image cursor-pointer mr-10"
                      style={{
                        backgroundImage: `url(${image})`,
                        width: "80px",
                        height: "80px",
                        border: index === imageIndex && "1px solid red",
                      }}
                    ></div>
                  ))}
                </div>
              </Col>
              <Col span={14}>
                <p className="fontsz-20 mb-0">{product.title}</p>
                <div className="d-flex">
                  <div className="d-flex pr-20">
                    <p className="m-0 fontsz-18" style={{ color: "#ee4d2d" }}>
                      {rateAver}
                    </p>
                    <Rate
                      disabled
                      allowHalf
                      value={rateAver}
                      style={{ color: "#ee4d2d" }}
                      className="fontsz-16 ml-5"
                    />
                  </div>
                  <div
                    className="d-flex fontsz-16 plr-10"
                    style={{
                      borderRight: "1px solid rgba(0,0,0,.14)",
                      borderLeft: "1px solid rgba(0,0,0,.14)",
                      height: 20,
                    }}
                  >
                    <p className="pr-10 font-bold">{listComment.length}</p>
                    <p style={{ color: "#767676" }}>Đánh giá</p>
                  </div>
                  <div className="d-flex fontsz-16 pl-10">
                    <p className="pr-10 font-bold">{product.sold}</p>
                    <p>Đã bán</p>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#fafafa",
                    color: "#ee4d2d",
                    width: 600,
                  }}
                >
                  <p className="fontsz-30 p-10">
                    ₫{FORMAT_PRICE(`${product.price}`)}
                  </p>
                </div>
                <div className="pl-10">
                  <div className="d-flex" style={{ width: 400 }}>
                    <p className="pt-5" style={{ width: 110 }}>
                      Số lượng
                    </p>
                    <div className="d-flex middle mr-15">
                      <p
                        className="pbt-5 plr-10 pointer"
                        style={{ border: "1px solid rgba(0,0,0,.09)" }}
                        onClick={subNum}
                      >
                        <MinusOutlined />
                      </p>
                      <p
                        style={{ border: "1px solid rgba(0,0,0,.09)" }}
                        className="pbt-5 plr-22 pt-15"
                      >
                        {num}
                      </p>
                      <p
                        className="pbt-5 plr-10 pointer"
                        style={{ border: "1px solid rgba(0,0,0,.09)" }}
                        onClick={addNum}
                      >
                        <PlusOutlined className="pb-5" />
                      </p>
                    </div>
                    <p className="pt-5 pointer">{product.quantity} sản phẩm có sẵn</p>
                  </div>
                  {listColor.length > 0 && (
                    <div className="d-flex mt-20" style={{ width: 600 }}>
                      <p className="mr-11" style={{ width: 100 }}>
                        Màu sắc
                      </p>
                      <div className="d-flex" style={{ flexWrap: "wrap" }}>
                        {listColor.map((el, index) => {
                          return (
                            <p
                              className="mr-10 middle pointer"
                              onClick={() => setIdColor(el.id)}
                              key={index}
                              style={{
                                border: `1px solid ${
                                  el.id === idColor
                                    ? "#ee4d2d"
                                    : "rgba(0,0,0,.09)"
                                }`,
                                color: el.id === idColor ? "#ee4d2d" : "black",
                                height: 25,
                                width: 100,
                              }}
                            >
                              {el.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {listSize.length > 0 && (
                    <div className="d-flex mt-20" style={{ width: 600 }}>
                      <p className="mr-0" style={{ width: 110 }}>
                        Kích cỡ
                      </p>
                      <div className="d-flex" style={{ flexWrap: "wrap" }}>
                        {listSize.map((el, index) => {
                          return (
                            <p
                              className="mr-10 middle pointer"
                              onClick={() => setIdSize(el.id)}
                              key={index}
                              style={{
                                border: `1px solid ${
                                  el.id === idSize
                                    ? "#ee4d2d"
                                    : "rgba(0,0,0,.09)"
                                }`,
                                color: el.id === idSize ? "#ee4d2d" : "black",
                                height: 25,
                                width: 100,
                              }}
                            >
                              {el.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="d-flex mt-30">
                    <Button
                      className="mr-20"
                      style={{
                        width: 210,
                        height: 45,
                        backgroundColor: "rgba(255,87,34,0.1)",
                        border: "1px solid #ee4d2d",
                        color: "#ee4d2d",
                      }}
                      onClick={() => addCart()}
                    >
                      <ShoppingCartOutlined className="fontsz-20" /> Thêm Vào
                      Giỏ Hàng
                    </Button>
                    <Button
                      onClick={() => addPayment()}
                      style={{
                        width: 110,
                        height: 45,
                        backgroundColor: "#ee4d2d",
                        color: "white",
                      }}
                    >
                      Mua Ngay
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div
            className="mt-20"
            style={{ height: 134, backgroundColor: "white" }}
          >
            <div className="flex">
              <div
                className="ph-w-80 ph-h-80 text-center m-25"
                style={{ backgroundColor: "#f5f5f5", borderRadius: "50%" }}
              >
                <UserOutlined
                  className="mt-25 fontsz-25"
                  style={{ color: "#c6c6c6" }}
                />
              </div>
              <div
                className="mt-25 pr-80 mb-25"
                style={{ borderRight: "1px solid red" }}
              >
                <p className="fontsz-16 m-0">{product.shop.name}</p>
                <p
                  className="fontsz-14 m-0 mb-10"
                  style={{ color: "rgba(0,0,0,.54" }}
                >
                  Online 2 Ngày Trước
                </p>
                <Button className="d-flex">
                  <ShopOutlined className="pt-4 mr-5" />
                  <p className="pt-1">Xem shop</p>
                </Button>
              </div>
              <div className="mt-45 plr-40">
                <div className="d-flex">
                  <p className="text-start" style={{ width: 140 }}>
                    Đánh giá
                  </p>
                  <p
                    className="text-start color-highlight"
                    style={{ width: 80 }}
                  >
                    0
                  </p>
                  <p className="text-start" style={{ width: 140 }}>
                    Tỉ Lệ Phản Hồi
                  </p>
                  <p
                    className="text-end color-highlight"
                    style={{ width: 140 }}
                  >
                    57%
                  </p>
                  <p className="text-start pl-80" style={{ width: 220 }}>
                    Tham Gia
                  </p>
                  <p
                    className="text-end color-highlight"
                    style={{ width: 140 }}
                  >
                    7 Tháng Trước
                  </p>
                </div>
                <div className="d-flex">
                  <p className="text-start" style={{ width: 140 }}>
                    Sản Phẩm
                  </p>
                  <p
                    className="text-start color-highlight"
                    style={{ width: 80 }}
                  >
                    {numProductByShop}
                  </p>
                  <p className="text-start" style={{ width: 140 }}>
                    Thời Gian Phản Hồi
                  </p>
                  <p
                    className="text-end color-highlight"
                    style={{ width: 140 }}
                  >
                    Trong vài giờ
                  </p>
                  <p className="text-start pl-80" style={{ width: 220 }}>
                    Người Theo Dõi
                  </p>
                  <p
                    className="text-end color-highlight"
                    style={{ width: 140 }}
                  >
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-20 p-20"
            style={{ backgroundColor: "white", height: "auto" }}
          >
            <div
              className="ph-h-50 pt-12"
              style={{ backgroundColor: "rgba(0,0,0,.02)" }}
            >
              <p className="fontsz-18 pl-18">CHI TIẾT SẢN PHẨM</p>
            </div>
            <div className="pl-18 mt-20">
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Danh mục
                </p>
                <div className="product-link">
                  <Link href={"#"} className="product-link">
                    {product.type.name}
                  </Link>
                </div>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Thương hiệu
                </p>
                <p>{product.productInformation.trade_mark}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Xuất xứ
                </p>
                <p>{product.productInformation.origin}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Phong cách
                </p>
                <p>{product.productInformation.style}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Chất liệu
                </p>
                <p>{product.productInformation.material}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Mẫu
                </p>
                <p>{product.productInformation.sample}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Mùa
                </p>
                <p>{product.productInformation.season}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Tall Fit
                </p>
                <p>{product.productInformation.tall_fit}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Rất lớn
                </p>
                <p>{product.productInformation.very_big}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Kiểu dáng
                </p>
                <p>{product.productInformation.design}</p>
              </div>
              <div className="d-flex">
                <p
                  className="ph-w-140 mb-5"
                  style={{ color: "rgba(0,0,0,.4)" }}
                >
                  Cổ tay
                </p>
                <p>{product.productInformation.collar}</p>
              </div>
            </div>
            <div
              className="ph-h-50 pt-12"
              style={{ backgroundColor: "rgba(0,0,0,.02)" }}
            >
              <p className="fontsz-18 pl-18">MÔ TẢ SẢN PHẨM</p>
            </div>
            <p className="pl-18 pt-10">{product.description}</p>
          </div>
          <div
            className="mt-20 p-20"
            style={{ backgroundColor: "white", height: "auto" }}
          >
            <p className="fontsz-18 pl-18">ĐÁNH GIÁ SẢN PHẨM</p>
            <div
              className="p-10 p-40 d-flex"
              style={{
                backgroundColor: "#fffbf8",
                border: "1px solid #f9ede5",
              }}
            >
              <div className="ph-w-150 middle">
                <p className="fontsz-20 mb-0" style={{ color: "#ee4d2d" }}>
                  {rateAver} trên 5
                </p>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={rateAver}
                  style={{ color: "#ee4d2d" }}
                  className="fontsz-20 ml-5"
                />
              </div>

              <div className="d-flex ml-80 mt-20">
                {listProductReview.map((el, index) => (
                  <p
                    className="mr-10 pt-5 middle pointer"
                    onClick={() => onchangeRate(el)}
                    key={index}
                    style={{
                      border: `1px solid ${
                        el.id === idProductReview
                          ? "#ee4d2d"
                          : "rgba(0,0,0,.09)"
                      }`,
                      color: el.id === idProductReview ? "#ee4d2d" : "black",
                      height: 30,
                      width: 100,
                    }}
                  >
                    {el.title}
                  </p>
                ))}
              </div>
            </div>
            {commentsRate.map((comment, index) => (
              <div key={index} className="d-flex m-20">
                <div
                  className="ph-w-50 ph-h-50 text-center"
                  style={{ backgroundColor: "#f5f5f5", borderRadius: "50%" }}
                >
                  <UserOutlined
                    className="mt-10 fontsz-25"
                    style={{ color: "#c6c6c6" }}
                  />
                </div>
                <div className="ml-20">
                  <p className="m-0">{comment.user.username}</p>
                  <Rate
                    disabled
                    defaultValue={comment.rate}
                    style={{ color: "#ee4d2d" }}
                    className="fontsz-12 ml-5"
                  />
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ViewProduct.layout = CrmCMSLayout.HEADER_CUSTOMER;

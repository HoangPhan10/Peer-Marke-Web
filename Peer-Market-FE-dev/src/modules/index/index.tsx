import { getProductAll } from "@app/api/product/get-list-all-product";
import { CrmCMSLayout, PageWrapper } from "@app/common/layout";
import { FORMAT_PRICE } from "@app/const/format-price";
import { useSubscription } from "@app/hooks/subscription";
import { Carousel } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export const Index = () => {
  const subscription = useSubscription();
  const router = useRouter();
  const [listProduct, setListProduct] = useState<any>([]);
  useEffect(() => {
    const getAllProduct = getProductAll().subscribe(
      (res) => {
        setListProduct(res.data);
      },
      (err) => {}
    );
    subscription.add(getAllProduct);
  }, []);
  return (
    <div>
      <div
        className="d-flex pl-110 ptb-20 mb-30"
        style={{ background: "white" }}
      >
        <div style={{ width: 900 }}>
          <Carousel autoplay>
            <div style={{ width: 900 }}>
              <img
                src="/assets/images/carousel/image1.jpg"
                width={900}
                height={235}
              />
            </div>
            <div style={{ width: 900 }}>
              <img
                src="/assets/images/carousel/image2.jpg"
                width={900}
                height={235}
              />
            </div>
            <div style={{ width: 900 }}>
              <img
                src="/assets/images/carousel/image3.png"
                width={900}
                height={235}
              />
            </div>
            <div style={{ width: 900 }}>
              <img
                src="/assets/images/carousel/image4.jpg"
                width={900}
                height={235}
              />
            </div>
            <div style={{ width: 900 }}>
              <img
                src="/assets/images/carousel/image5.jpg"
                width={900}
                height={235}
              />
            </div>
          </Carousel>
        </div>
        <div className="ml-10">
          <img
            className="mb-5"
            src="/assets/images/carousel/image6.jpg"
            height={115}
          />
          <img src="/assets/images/carousel/image7.png" height={115} />
        </div>
      </div>

      <div className="mlr-110">
        <div
          className="ph-h-60"
          style={{
            backgroundColor: "white",
            borderBottom: "4px solid #ee4d2d",
          }}
        >
          <p className="middle pt-20" style={{ color: "#ee4d2d" }}>
            TẤT CẢ SẢN PHẨM
          </p>
        </div>
        <div className="d-flex mlr-45" style={{flexWrap:"wrap"}}>
          {listProduct.map((product, index) => {
            return (
                <div
                  className="ph-h-282 ph-w-190 mlr-5 pointer product-home mt-20"
                  style={{ backgroundColor: "white" }}
                  key={index}
                  onClick={() => {
                    router.push(`/product/${product.product.id}`)
                  }}
                >
                  <div
                    className="display-product-home"
                    style={{
                      backgroundImage: `url(${product.images[0].urls[0]})`,
                    }}
                  ></div>
                  <p className="p-10 over-flow2">{product.product.title}</p>
                  <div
                    className="d-flex plr-10 justify-content-between"
                    style={{ color: "#ee4d2d" }}
                  >
                    <div className="d-flex">
                      <span>₫</span>
                      <p>{FORMAT_PRICE(`${product.product.price}`)}</p>
                    </div>
                    <p
                      className="fontsz-12"
                      style={{ color: "rgba(0,0,0,.54)" }}
                    >
                      Đã bán {product.product.sold}
                    </p>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
Index.layout = CrmCMSLayout.HEADER_CUSTOMER;

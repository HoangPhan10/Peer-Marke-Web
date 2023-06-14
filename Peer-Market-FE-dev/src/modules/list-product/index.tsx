import { getProductAll } from "@app/api/product/get-list-all-product";
import { getProductByTypeId } from "@app/api/product/get-list-product-by-type";
import { CrmCMSLayout, PageWrapper } from "@app/common/layout";
import { FORMAT_PRICE } from "@app/const/format-price";
import { removeVn } from "@app/const/removeVn";
import { useSubscription } from "@app/hooks/subscription";
import { Carousel, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TRUE } from "sass";
const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export const ListProduct = () => {
  const subscription = useSubscription();
  const router = useRouter();
  const [isSpinning, setIsPinning] = useState<boolean>(false);
  const [listProduct, setListProduct] = useState<any>([]);
  useEffect(() => {
    if (router.query?.type) {
      const id = router.query.type as string;
      setIsPinning(true);
      const getAllProduct = getProductByTypeId(+id).subscribe(
        (res) => {
          setListProduct(res.data);
          setIsPinning(false);
        },
        (err) => {}
      );
      subscription.add(getAllProduct);
    }
    if (router.query?.search) {
      const search = router.query.search as string;
      setIsPinning(true);
      const getAllProduct = getProductAll().subscribe(
        (res) => {
          const data = res.data.filter((el) => {
            const title = removeVn(el.product.title.toLowerCase());
            if (title.includes(removeVn(search.toLowerCase()))) {
              return el;
            }
          });
          setIsPinning(false);
          setListProduct(data);
        },
        (err) => {}
      );
      subscription.add(getAllProduct);
    }
  }, [router]);

  return (
    <div style={{ minHeight: 630 }}>
      <Spin spinning={isSpinning}>
        <div className="mlr-110">
          {router.query?.type ? (
            <h5 className="mlr-45 pt-30">
              Tìm kiếm sản phẩm theo ngành hàng :{" "}
              {listProduct[0]?.product?.type?.name}
            </h5>
          ) : (
            <h5 className="mlr-45 pt-30">
              Tìm kiếm theo tên: {router.query?.search}
            </h5>
          )}
          <div className="d-flex mlr-45" style={{ flexWrap: "wrap" }}>
            {listProduct.map((product, index) => {
              return (
                <div
                  className="ph-h-282 ph-w-190 mlr-5 pointer product-home mt-20"
                  style={{ backgroundColor: "white" }}
                  key={index}
                  onClick={() => {
                    router.push(`/product/${product.product.id}`);
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
      </Spin>
    </div>
  );
};
ListProduct.layout = CrmCMSLayout.HEADER_CUSTOMER;

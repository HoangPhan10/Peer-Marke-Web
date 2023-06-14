import { Button, Modal, Pagination, Popconfirm, Slider, message } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { deleteProductById } from "@app/api/product/delete-product-by-id";
import { useRouter } from "next/router";
import { LIMIT, LIST_TYPE } from "@app/const/common.const";
import { getProfile } from "@app/api/user/get-profile";
import { getAccessToken } from "@app/services/auth";
import { getShopByUserId } from "@app/api/shop/get-shop-by-user-id";
import { getProductByPage } from "@app/api/product/get-list-product-page";
import { FORMAT_PRICE } from "@app/const/format-price";
import {ExclamationCircleFilled} from '@ant-design/icons'
import { toast } from "react-toastify";

const {confirm,warning} = Modal;
interface PropsProduct {
  type: string;
}

function AllProduct(props: PropsProduct) {
  const router = useRouter();
  const { type } = props;
  const [isRender, setIsRender]  = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    if (type !== LIST_TYPE.OUT_OF_STOCK) {
      getProfile({ jwt: getAccessToken() })
        .toPromise()
        .then((profile) => {
          getShopByUserId(profile.data.id)
            .toPromise()
            .then((shop) => {
              getProductByPage(page, shop.data.id)
                .toPromise()
                .then((product) => {
                  const dataList = product.data.productResponses.map((elm) => {
                    return {
                      id: elm.product.id,
                      link: `/product/${elm.product.id}`,
                      url: elm.images[0].urls[0],
                      name: elm.product.title,
                      price: FORMAT_PRICE(`${elm.product.price}`),
                      description: elm.product.description,
                      sales: 0,
                    };
                  });
                  setData(dataList);
                  setNumPage(product.data.total);
                  setTotal(product.data.totalElement);
                })
                .finally(() => {});
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  }, [page,isRender]);

  const onDeleteProduct = (id: number) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      icon: <ExclamationCircleFilled />,
      okText: 'Có',
      okType: 'danger',
      okButtonProps: {
        // disabled: true,
      },
      cancelText: 'Không',
      onOk() {
        deleteProductById(id).subscribe((res) => {
          setIsRender(!isRender);
          toast.success("Xóa sản phẩm thành công.")
        });
      },
    });
  }

  return (
    <div className="all-product-portal">
      <div className="d-flex justify-content-between">
        <div>
          <strong>{total} Sản Phẩm</strong>
          <Slider className="m-0" min={0} max={100} value={total} />
          <span className="d-block text-span">
            Có thể đăng tải thêm {1000 - total} sản phẩm
          </span>
        </div>
        <div>
          <Button
            className="button-submit-active"
            onClick={() => {
              router.push("/portal/product/new");
            }}
          >
            <PlusOutlined style={{ fontSize: 16 }} /> Thêm 1 sản phẩm mới
          </Button>
        </div>
      </div>
      <div
        className={`mt-40 d-flex ${
          data.length >= 5 && "justify-content-between"
        } product-content`}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="item-product"
              style={{ marginRight: data.length < 5 && "30px" }}
            >
              <Link href={item.link} className="cursor-pointer">
                <div
                  className="image cursor-pointer"
                  style={{ backgroundImage: `url(${item.url})` }}
                ></div>
              </Link>
              <div className="p-10 pb-0">
                <span className="font-bold pb-2 over-flow">{item.name}</span>
                <div className="d-flex justify-content-between item-product-content">
                  <span className="color-highlight" style={{ marginRight: 10 }}>
                    ₫{item.price}
                  </span>
                  <span className="color-8c over-flow">{item.description}</span>
                </div>
                <div className="d-flex justify-content-between item-product-content-sales">
                  <span></span>
                  <span>Doanh số {item.sales}</span>
                </div>
                <div className="d-flex justify-content-between pt-1">
                  <Button
                    className="button-bg-none"
                    style={{ borderRight: "1px solid #dcdce0" }}
                  >
                    <EditOutlined className="button-bg-none-icon" />
                  </Button>
                    <Button className="button-bg-none" onClick={() => onDeleteProduct(item.id)}>
                      <DeleteOutlined className="button-bg-none-icon" />
                    </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {numPage > 1 && (
        <div className="d-flex justify-content-center mt-50">
          <Pagination
            current={page}
            total={total}
            pageSize={LIMIT}
            onChange={(value) => setPage(value)}
          />
        </div>
      )}
    </div>
  );
}

export default AllProduct;

import { createProductColor } from "@app/api/product-detail/create-colors";
import { createProductImage } from "@app/api/product-detail/create-images";
import { createProductSize } from "@app/api/product-detail/create-sizes";
import { createProduct } from "@app/api/product_info/create-product";
import { createProductInfo } from "@app/api/product_info/create-product-info";
import { getShopByUserId } from "@app/api/shop/get-shop-by-user-id";
import { getListType } from "@app/api/type/get-list-type";
import { getProfile } from "@app/api/user/get-profile";
import InputNumber from "@app/common/input-number";
import { LIST_SELECT, OPTION_COLOR, OPTION_SIZE } from "@app/const/content";
import { useSubscription } from "@app/hooks/subscription";
import { getAccessToken } from "@app/services/auth";
import { uploadImage } from "@app/services/firebase/upload-image";
import readXlsxFile from "read-excel-file";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Spin,
  Tag,
  UploadFile,
  UploadProps,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Upload, { RcFile } from "antd/lib/upload";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ListNameProduct } from "./list-name";
export const ProductNew = () => {
  const subscription = useSubscription();
  const router = useRouter();
  const [listType, setListType] = useState([]);
  const [shop, setShop] = useState<any>({});
  useEffect(() => {
    getProfile({ jwt: getAccessToken() })
      .toPromise()
      .then((profile) => {
        getShopByUserId(profile.data.id)
          .toPromise()
          .then((shop) => {
            setShop(shop.data);
          });
      });
  }, []);

  useEffect(() => {
    const types = getListType().subscribe((res) => {
      const data = res.data.map((el) => {
        return {
          value: el.id,
          label: el.name,
        };
      });
      setListType(data);
    });
    subscription.add(types);
  }, []);

  const onFinish = (values: any) => {
    setIsSpin(true);
    const {
      trade_mark,
      material,
      sample,
      style,
      origin,
      season,
      tall_fit,
      very_big,
      design,
      collar,
      id_type,
      title,
      price,
      description,
      quantity,
      sizes,
      colors,
    } = values;
    const product_info = {
      trade_mark,
      material,
      sample,
      style,
      origin,
      season,
      tall_fit,
      very_big,
      design,
      collar,
    };
    createProductInfo(product_info)
      .toPromise()
      .then((res) => {
        const product = {
          id_type,
          product_info_id: res.data.id,
          id_shop: shop.id,
          quantity: +quantity,
          description,
          price: +price,
          title,
        };
        createProduct(product)
          .toPromise()
          .then((res) => {
            const image = {
              title: "images",
              id_product: res.data.id,
              urls: listImage,
            };
            createProductImage(image)
              .toPromise()
              .then((images) => {
                if (sizes) {
                  const size = {
                    id_product: res.data.id,
                    sizes: sizes,
                  };
                  createProductSize(size)
                    .toPromise()
                    .then((sizes) => {});
                }
                if (colors) {
                  const color = {
                    id_product: res.data.id,
                    colors: colors,
                  };
                  createProductColor(color)
                    .toPromise()
                    .then((colors) => {});
                }
                setIsSpin(false);
                router.push("/portal/product/list");
              });
          });
      });
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listImage, setImageList] = useState<any>([]);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [dataRow, setDataRow] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const list = [];
    fileList.forEach((file) => {
      const data = {
        email: shop.user.email,
        name: file.name,
        file: file.originFileObj,
        uid: file.uid,
      };
      uploadImage(data).then((res) => {
        list.push(res);
      });
    });
    setImageList(list);
  }, [fileList]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        onClose={onClose}
        style={{ marginRight: 5 }}
      >
        {label}
      </Tag>
    );
  };
  const onCreate = (values: any) => {
    const dataRow = values;
    const colors = dataRow[6] as any;
    const sizes = dataRow[7] as any;
    const data = {
      title: dataRow[1],
      id_type: listType.find((el) => el.label === dataRow[2])?.value,
      description: dataRow[3],
      price: dataRow[4],
      quantity: dataRow[5],
      sizes: sizes?.split(","),
      colors: colors?.split(","),
      trade_mark: dataRow[8],
      material: dataRow[9],
      sample: dataRow[10],
      tall_fit: dataRow[11],
      design: dataRow[12],
      style: dataRow[13],
      origin: dataRow[14],
      season: dataRow[15],
      very_big: dataRow[16],
      collar: dataRow[17],
      before: dataRow[18],
      status: dataRow[19],
      sku: dataRow[20],
    };
    form.setFieldsValue(data);
    setIsOpen(false);
  };

  const onChangeFile = (e: any) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      rows.shift();
      setDataRow(rows);
    });
  };

  useEffect(() => {
    if (dataRow.length === 0) return;
    setIsOpen(true);
  }, [dataRow]);

  return (
    <div className="product-new">
      <Spin spinning={isSpin} style={{ top: "68%" }}>
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            initialValues={{}}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="product-new-info">
              <div className="flex justify-content-between">
                <h5 className="font-bold">Thông tin cơ bản</h5>
                <input type="file" onChange={onChangeFile} />
              </div>
              <Form.Item
                label="Hình ảnh sản phẩm"
                name="images"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp hình ảnh cho sản phẩm.",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 4 && (
                    <p
                      style={{ color: "#ee4d2d", fontSize: 12 }}
                      className="font-bold"
                    >{`Thêm hình ảnh (${fileList.length}/4)`}</p>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                label="Tên sản phẩm"
                name="title"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm." },
                ]}
              >
                <Input className="ph-h-40" placeholder="Nhập tên sản phẩm" />
              </Form.Item>
              <Form.Item
                label="Ngành hàng"
                name="id_type"
                rules={[
                  { required: true, message: "Vui lòng chọn ngành hàng." },
                ]}
              >
                <Select
                  // className="ph-h-40"
                  showSearch
                  placeholder="Tên ngành hàng"
                  optionFilterProp="children"
                  // onChange={onChange}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listType}
                />
              </Form.Item>
              <Form.Item
                label="Mô tả sản phẩm"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả về sản phẩm.",
                  },
                ]}
              >
                <TextArea
                  style={{ height: 120, resize: "none" }}
                  placeholder="Nhập mô tả sản phẩm"
                />
              </Form.Item>
            </div>
            <div className="product-new-info mt-4">
              <h5 className="font-bold">Thông tin bán hàng</h5>
              <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá." }]}
              >
                <InputNumber
                  className="ph-h-40 ph-w-330"
                  placeholder="Nhập giá"
                />
              </Form.Item>
              <Form.Item
                label="Kho hàng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập số lượng." }]}
              >
                <InputNumber className="ph-h-40 ph-w-330" placeholder="Nhập" />
              </Form.Item>
              <Form.Item
                label="Màu sắc"
                name="colors"
                // rules={[{ required: true, message: "Vui lòng chọn màu sắc." }]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  style={{ width: "100%" }}
                  options={OPTION_COLOR}
                />
              </Form.Item>
              <Form.Item
                label="Size"
                name="sizes"
                // rules={[{ required: true, message: "Vui lòng chọn size." }]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  style={{ width: "100%" }}
                  options={OPTION_SIZE}
                />
              </Form.Item>
            </div>
            <div className="product-new-info mt-4">
              <h5 className="font-bold">Thông tin chi tiết</h5>
              <p style={{ color: "#999" }}>
                Điền các thông tin sau để tăng mức độ hiện thị cho sản phẩm
              </p>
              {LIST_SELECT.map((el, index) => (
                <Row key={index} className="d-flex justify-content-around mb-2">
                  {el.list.map((elm, ind) => (
                    <Col key={ind} span={10}>
                      <Form.Item
                        label={elm.label}
                        name={elm.name}
                        rules={[{ required: true, message: elm.message }]}
                      >
                        <Select
                          // className="ph-h-40"
                          showSearch
                          placeholder="Vui lòng chọn"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={elm.options}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
            <div className="product-new-info mt-4">
              <h5 className="font-bold">Thông tin khác</h5>
              <Form.Item label="Hàng đặt trước" name="before">
                <Radio.Group className="mt-2" defaultValue={2}>
                  <Radio value={1}>Không</Radio>
                  <Radio value={2}>Đồng ý</Radio>
                </Radio.Group>
                <p style={{ color: "#999" }}>
                  Tôi sẽ gửi hàng trong 2 ngày (không bao gồm các ngày nghỉ lễ,
                  Tết và những ngày đơn vị vận chuyển không làm việc)
                </p>
              </Form.Item>
              <Form.Item label="Tình trạng" name="status">
                <Select
                  className="ph-w-330"
                  optionFilterProp="children"
                  defaultValue={"Mới"}
                  options={[
                    {
                      value: "Mới",
                      label: "Mới",
                    },
                    {
                      value: "Đã sử dụng",
                      label: "Đã sử dụng",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="SKU sản phẩm" name="sku">
                <InputNumber className="ph-h-40 ph-w-330" />
              </Form.Item>
            </div>
            <Form.Item wrapperCol={{ offset: 20 }} style={{ marginTop: 20 }}>
              <Button type="primary" className="ph-w-130" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
      <ListNameProduct
        open={isOpen}
        onCreate={onCreate}
        onCancel={() => setIsOpen(false)}
        listProduct={dataRow}
      />
    </div>
  );
};

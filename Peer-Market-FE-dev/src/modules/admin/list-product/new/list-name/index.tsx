import { CheckOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  listProduct: any;
}

export const ListNameProduct: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  listProduct,
}) => {
  const [form] = Form.useForm();
  const [productNow, setProductNow] = useState<any>([]);

  return (
    <Modal
      open={open}
      title="Chọn sản phẩm muốn thêm."
      okText="Hoàn Thành"
      cancelText="Trở Lại"
      onCancel={onCancel}
      width={600}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.resetFields();
            onCreate(productNow);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {listProduct.map((product, index) => (
        <div
          key={index}
          style={{ borderLeft: `4px solid ${product[0] === productNow[0] ? '#ee4d2d' : '#e3e3e3'}` }}
          className="ptb-10 flex justify-content-between cursor-pointer mb-5"
          onClick={() => setProductNow(product)}
        >
            <p className="fontsz-14 pl-20 ph-h-50 ph-w-450 m-0">
              {product[1]}
            </p>
          <CheckOutlined
            className={`fontsz-20 pr-20 pt-20 ${
              product[0] === productNow[0] ? "display" : "none-display"
            }`}
            style={{ color: "#ee4d2d" }}
          />
        </div>
      ))}
    </Modal>
  );
};

import { CheckOutlined } from "@ant-design/icons";
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  payment: {};
  listPayment: any;
}

export const PaymentMethod: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  payment,
  listPayment,
}) => {
  const [form] = Form.useForm();
  const [paymentNow, setpaymentNow] = useState<any>(payment);

  useEffect(() => {
    setpaymentNow(payment);
  },[payment])

  return (
    <Modal
      open={open}
      title="Chọn đơn vị vận chuyển"
      okText="Hoàn Thành"
      cancelText="Trở Lại"
      onCancel={onCancel}
      width={600}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.resetFields();
            onCreate(paymentNow);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {listPayment.map((pay, index) => (
        <div
          key={index}
          style={{ borderLeft: `4px solid ${pay.id === paymentNow.id ? '#ee4d2d' : '#e3e3e3'}` }}
          className="ptb-10 flex justify-content-between cursor-pointer mb-5"
          onClick={() => setpaymentNow(pay)}
        >
          <div className="pl-20 pt-10">
            <p className="fontsz-16">
              {pay.name_payment}
            </p>
          </div>
          <CheckOutlined
            className={`fontsz-20 pr-20 pt-20 ${
              pay.id === paymentNow.id ? "display" : "none-display"
            }`}
            style={{ color: "#ee4d2d" }}
          />
        </div>
      ))}
    </Modal>
  );
};

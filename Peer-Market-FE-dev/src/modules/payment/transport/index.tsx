import { getListTransport } from "@app/api/transport/get-list-transport";
import { useSubscription } from "@app/hooks/subscription";
import { Form, Input, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { FORMAT_PRICE, dayTransport } from "@app/const/format-price";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: any,id:number) => void;
  onCancel: () => void;
  transport: {};
  id: number;
  listTransport: any;
}

export const Transport: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  transport,
  id,
  listTransport,
}) => {
  const [form] = Form.useForm();
  const [transportNow, setTransportNow] = useState<any>(transport);

  useEffect(() => {
    setTransportNow(transport);
  },[id])

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
            onCreate(transportNow,id);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <p className="fontsz-14 mb-0" style={{ color: "#929292" }}>
        KÊNH VẬN CHUYỂN LIÊN KẾT VỚI PEERMARKET
      </p>
      <p className="fontsz-12" style={{ color: "#BBBBBB" }}>
        Bạn có thể theo dõi đơn hàng trên ứng dụng PeerMaket khi chọn một trong
        các đơn vị vận chuyển:
      </p>
      {listTransport.map((trans, index) => (
        <div
          key={index}
          style={{ borderLeft: `4px solid ${trans.id === transportNow.id ? '#ee4d2d' : '#e3e3e3'}` }}
          className="ptb-10 flex justify-content-between cursor-pointer mb-5"
          onClick={() => setTransportNow(trans)}
        >
          <div className="pl-20 pt-10">
            <p className="mb-0">
              {trans.name} <span className="ml-10" style={{color:"#ee4d2d"}}>₫{FORMAT_PRICE(`${trans.price}`)}</span>
            </p>
            <p className="fontsz-12" style={{ color: "#929292" }}>
              {dayTransport(trans.id)}
            </p>
          </div>
          <CheckOutlined
            className={`fontsz-20 pr-20 pt-20 ${
              trans.id === transportNow.id ? "display" : "none-display"
            }`}
            style={{ color: "#ee4d2d" }}
          />
        </div>
      ))}
    </Modal>
  );
};

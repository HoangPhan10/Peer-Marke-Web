import { getListTransport } from "@app/api/transport/get-list-transport";
import { useSubscription } from "@app/hooks/subscription";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { FORMAT_PRICE, dayTransport } from "@app/const/format-price";
import { CollectionCreateForm } from "@app/modules/channel-seller/onboarding/add-address";
import { useSelector } from "react-redux";
import { getUser } from "@app/redux/users/user-slice";
import { getAddressByUserId } from "@app/api/address/list-address-by-user-id";
import { createAddress } from "@app/api/address/create-address";
import { toast } from "react-toastify";
interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  address: {};
}

export const Address: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  address,
}) => {
  const [form] = Form.useForm();
  const [addressNow, setAddressNow] = useState<any>(address);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listAddress, setListAddress] = useState<any>([]);
  const subscription = useSubscription();
  const userSelected = useSelector(getUser);
  const [isRender, setIsRender] = useState<boolean>(false);
  useEffect(() => {
    const addresses = getAddressByUserId(userSelected.id).subscribe((res) => {
      setListAddress(res.data);
    });
    subscription.add(addresses);
  }, [isRender]);

  useEffect(() => {
    setAddressNow(address);
  }, [address]);

  const onCreateAddress = (value: any) => {
    const data = { ...value, userId: userSelected.id };
    createAddress(data).subscribe(
      (res) => {
        setIsRender(!isRender);
      },
      (err) => {
        toast.warning("Số điện thoại này đã được đăng ký!.");
      }
    );
    setIsOpen(false);
  };
  return (
    <Modal
      open={open}
      title="Địa Chỉ Của Tôi"
      okText="Xác nhận"
      cancelText="Hủy"
      onCancel={onCancel}
      width={600}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.resetFields();
            onCreate(addressNow);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {listAddress.map((addr, index) => (
        <div
          key={index}
          style={{
            borderLeft: `4px solid ${
              addr.id === addressNow?.id ? "#ee4d2d" : "#e3e3e3"
            }`,
          }}
          className="ptb-10 flex justify-content-between cursor-pointer mb-5"
          onClick={() => setAddressNow(addr)}
        >
          <div className="pl-20 pt-10">
            <p className="mb-0">
              {addr.name_receiver} <span>{`(+84) ${addr.phone}`}</span>
            </p>
            <p className="fontsz-12 over-flow" style={{ color: "#929292" }}>
              {addr.address}
            </p>
          </div>
          <CheckOutlined
            className={`fontsz-20 pr-20 pt-20 ${
              addr.id === addressNow?.id ? "display" : "none-display"
            }`}
            style={{ color: "#ee4d2d" }}
          />
        </div>
      ))}
      <Button className="button-submit mt-20" onClick={() => setIsOpen(true)}>
        Thêm Địa Chỉ Mới
      </Button>
      <CollectionCreateForm
        onCancel={() => setIsOpen(false)}
        onCreate={onCreateAddress}
        open={isOpen}
      />
    </Modal>
  );
};

import { createAddress } from "@app/api/address/create-address";
import { getAddressByUserId } from "@app/api/address/list-address-by-user-id";
import { getProfile } from "@app/api/user/get-profile";
import { CrmCMSLayout } from "@app/common/layout";
import { useSubscription } from "@app/hooks/subscription";
import { CollectionCreateForm } from "@app/modules/channel-seller/onboarding/add-address";
import { getAccessToken } from "@app/services/auth";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteAddressById } from "@app/api/address/delete-address-by-id";
import { updateAddress } from "@app/api/address/update-address";
const { confirm } = Modal;
export const AccountAddress = () => {
  const [user, setUser] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listAddress, setListAddress] = useState<any>([]);
  const [address, setAddress] = useState<any>({});
  const [isRender, setIsRender] = useState<boolean>(false);
  const subscription = useSubscription();
  useEffect(() => {
    getProfile({ jwt: getAccessToken() })
      .toPromise()
      .then((profile) => {
        setUser(profile.data);
      });
  }, []);

  useEffect(() => {
    if (user?.id) {
      const address = getAddressByUserId(user?.id).subscribe((res) => {
        setListAddress(res.data);
      });
      subscription.add(address);
    }
  }, [user, isOpen, isRender]);

  const onCreate = (data: any) => {
    const dataAddress = {
      ...data,
      userId: user.id,
    };
    createAddress(dataAddress).subscribe(
      (res) => {
        toast.success("Thêm địa chỉ thành công");
        setIsOpen(false);
      },
      (err) => {
        toast.warning("Số điện thoại có thể đã được đăng ký trước đó!");
      }
    );
  };

  const onUpdate = (data: any, id: number) => {
    const req = { ...data, userId: id };
    updateAddress(req).subscribe(
      (res) => {
        toast.success("Sửa địa chỉ thành công");
        setIsOpen(false);
      },
      (err) => {
        toast.warning("Số điện thoại có thể đã được đăng ký trước đó!");
      }
    );
  };

  const confirmDelete = (id: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa địa chỉ này?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      okButtonProps: {},
      cancelText: "Không",
      onOk() {
        deleteAddressById(id).subscribe(
          (res) => {
            toast.success("Đã xóa địa chỉ thành công.");
            setIsRender(!isRender);
          },
          (err) => {}
        );
      },
    });
  };

  return (
    <div
      style={{ backgroundColor: "white", width: "100%", minHeight: 580 }}
      className="mt-13"
    >
      <div
        className="d-flex justify-content-between p-20"
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <p className="fontsz-20">Địa chỉ của tôi</p>
        <Button
          className="button-submit ph-w-200 pt-10 middle"
          style={{ opacity: 1 }}
          onClick={() => setIsOpen(true)}
        >
          <p>Thêm Địa Chỉ Mới</p>
        </Button>
      </div>
      <div>
        {listAddress.map((address, index) => (
          <div
            className="d-flex justify-content-between m-20 pb-20"
            style={{ borderBottom: "1px solid #ccc" }}
            key={index}
          >
            <div>
              <div className="d-flex">
                <p
                  className="m-0 pr-10"
                  style={{ borderRight: "1px solid #ccc" }}
                >
                  {address.name_receiver}
                </p>
                <p className="m-0 pl-10">(+84) {address.phone}</p>
              </div>
              <p className="mtb-5" style={{ color: "#0000008A" }}>
                {address.address}
              </p>
              <Tag color="#ee4d2d">Địa chỉ nhận hàng</Tag>
            </div>
            <div className="d-flex mt-20">
              <Button
                className="ph-h-30 mr-10 ph-w-100"
                onClick={() => confirmDelete(address.id)}
              >
                Xóa
              </Button>
              <Button
                className="button-submit ph-h-30 ph-w-100"
                style={{ opacity: 1 }}
                onClick={() => {
                  setAddress(address);
                  setIsOpen(true);
                }}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CollectionCreateForm
        onCancel={() => {
          setIsOpen(false);
          setAddress({});
        }}
        onCreate={onCreate}
        open={isOpen}
        data={address}
        onUpdate={onUpdate}
      />
    </div>
  );
};
AccountAddress.layout = CrmCMSLayout.USER_LAYOUT;

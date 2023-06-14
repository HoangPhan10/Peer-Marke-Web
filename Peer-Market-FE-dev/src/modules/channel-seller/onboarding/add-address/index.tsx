import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useAppDispatch } from "@app/hooks/redux/useAppDispatch";
import { useSelector } from "react-redux";
import { addAddress, getAddress, getUser } from "@app/redux/users/user-slice";
import { useSubscription } from "@app/hooks/subscription";
import { createAddress } from "@app/api/address/create-address";
import { toast } from "react-toastify";
interface Values {
  name_receive: string;
  address: string;
  phone: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  data?: any;
  onUpdate?: (values: Values, id: number) => void;
}

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  data,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const address = useSelector(getAddress);
  useEffect(() => {
    if (address) {
      form.setFieldsValue(address);
    }
  }, [address]);

  useEffect(() => {
    if (data) {
      form.resetFields()
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      title={data?.id ? "Sửa Địa Chỉ" :"Thêm Địa Chỉ Mới"}
      okText="Lưu"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            if (data.id) {
              onUpdate(values,data.id);
              return;
            }
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name_receiver"
          label="Họ & Tên"
          rules={[
            {
              required: true,
              message: "Họ tên là trường bắt buộc!",
            },
          ]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Số điện thoại là trường bắt buộc!",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Địa chỉ là trường bắt buộc!",
            },
          ]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
interface PropsAddress {
  open: boolean;
  setOpen: (op: boolean) => void;
}
const AddAddress = (props: PropsAddress) => {
  const { open, setOpen } = props;
  const useDispatch = useAppDispatch();
  const onCreate = (values: any) => {
    useDispatch(addAddress(values));
    setOpen(false);
    // const create = createAddress({
    //   ...values,userId:user.id
    // }).subscribe((res)=>{
    //   useDispatch(addIdAddress(res.data.id))
    // },(err)=>{
    //   toast.error("Số điện thoại đã được đăng ký")
    // })
    // subscription.add(create)
  };

  return (
    <div>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddAddress;

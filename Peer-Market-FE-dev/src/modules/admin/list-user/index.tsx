import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { CrmCMSLayout } from "@app/common/layout";
import { getListUsers } from "@app/api/user/list-users";
import { useSubscription } from "@app/hooks/subscription";
import {
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteUserById } from "@app/api/user/delete-user";
import { toast } from "react-toastify";
import { updateUserById } from "@app/api/user/update-user";
interface DataType {
  key: number;
  name: string;
  email: string;
  username: string;
  role: string;
}

export const ListUsersAdmin = () => {
  const [listUser, setListUser] = useState<any>([]);
  const LIMIT = 8;
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const subscription = useSubscription();
  const [isRender, setIsRender] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(null);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, { role }) => {
        let color = "red";
        if (role === "admin") {
          color = "red";
        } else if (role === "shipper") {
          color = "volcano";
        } else {
          color = "green";
        }
        return (
          <>
            <Tag color={color} key={1}>
              {role.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Hoạt động",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) =>
        text ? (
          <Tag color={"green"} key={2}>
            Đang hoạt động
          </Tag>
        ) : (
          <Tag color={"red"} key={3}>
            Đã xóa
          </Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          style={{ fontSize: 15 }}
          className="action"
          aria-disabled
        >
          <Button
            disabled={!_.isActive ||  _.role === "admin"}
            className="iconEdit cursor-pointer p-0"
            onClick={() => handleEdit(_)}
          >
            <EditOutlined />
          </Button>
          <Button
            disabled={!_.isActive || _.role === "admin"}
            className="iconDel cursor-pointer p-0"
            onClick={() => confirm(_.key)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const confirm = (id: number) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa tài khoản này?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => onOk(id),
    });
  };

  const onOk = (id: number) => {
    deleteUserById(id).subscribe(
      (res) => {
        toast.success("Xóa tài khoản thành công.");
        setIsRender(!isRender);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    const list = getListUsers(LIMIT, page).subscribe((res: any) => {
      setTotal(res.data.total);
      const data = res.data.users.map((elm: any, index: number) => {
        return {
          key: elm.id,
          name: elm.name,
          email: elm.email,
          username: elm.username,
          role: elm.role.name,
          isActive: elm.isActive,
        };
      });
      setListUser(data);
    });
    subscription.add(list);
  }, [page, isRender]);
  const onchangePagination = (cur: number, pageSize: number) => {
    setPage(cur);
  };

  const handleEdit = (data: any) => {
    setIdDelete(data.key);
    setIsOpen(true);
    form.setFieldsValue(data);
  };

  const  onUpdateUser = (data: any) => {
    updateUserById(data,idDelete).subscribe((res) => {
      form.setFieldsValue({});
      toast.success("Cập nhật thông tin tài khoản thành công");
      setIsOpen(false);
      setIsRender(!isRender);
    },(err)=>{
      toast.warn("Email này đã được đăng ký trước đó!")
    })
  };
  return (
    <>
      <Table columns={columns} dataSource={listUser} pagination={false} />{" "}
      <Pagination
        style={{ justifyContent: "end", display: "flex", marginTop: 20 }}
        current={page}
        total={LIMIT * total}
        pageSize={LIMIT}
        onChange={onchangePagination}
      />
      <Modal
        open={isOpen}
        title="Cập nhật thông tin người dùng"
        okText="Cập nhật"
        cancelText="Hủy"
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onUpdateUser(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="role"
            label="Role"
            rules={[
              { required: true, message: "Vui lòng chọn role người dùng." },
            ]}
          >
            <Select
              options={[
                { value: "customer", label: "Customer" },
                { value: "admin", label: "Admin" },
                { value: "shipper", label: "Shipper" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email." }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên đầy đủ"
            rules={[{ required: true, message: "Vui lòng nhập tên đầy đủ." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập." },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ListUsersAdmin.layout = CrmCMSLayout.DASKBOARD_ADMIN;

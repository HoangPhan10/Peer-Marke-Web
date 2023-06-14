import React, { useState } from "react";
import { Button, Form, Input, Modal, Radio, Rate } from "antd";

export const Comment = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Đánh Giá Sản Phẩm"
      okText="Hoàn thành"
      cancelText="Huỷ"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
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
        initialValues={{ rate:1}}
      >
        <Form.Item
          name="rate"
          label="Đánh giá sao"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Rate defaultValue={1} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng nhập bình luận của bạn.",
            },
          ]}
          name="comment"
          label="Comment"
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

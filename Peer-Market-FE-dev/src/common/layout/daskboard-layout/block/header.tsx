import { Avatar, Button, Form, Input, Menu } from 'antd';
import React, { Fragment, useCallback } from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSession } from '@app/hooks/session';
import { openModal, ModalProps, confirm } from '@app/common/modal';
import { useSubscription } from '@app/hooks/subscription';
import { changePass } from '@app/api/auth/change-pass';
import { SUCCESS_CODE } from '@app/const/common.const';
import { toast } from 'react-toastify';

const { SubMenu } = Menu


function Header(props) {
  const subscription = useSubscription();
  const [form] = Form.useForm();
  const handleConfirmLogout = useCallback(() => {
    confirm({ content: 'Bạn có muốn đăng nhập lại?', titleSubmitBtn: 'Đăng xuất' }).subscribe(answer => {
      if (!answer) return;

      logout();
    })
  }, []);

  const onChangePass = (values) => {
    const changePassSub = changePass(values).subscribe(res=>{
      if (res.responseCode === SUCCESS_CODE) {
        toast.success("Thay đổi thành công");
        form.resetFields();
        handleConfirmLogout();
        return;
      }
      toast.error(res.message);
    },(err=>toast.error(err.message)))
    
    subscription.add(changePassSub)
  }

  function ModalChangePass(props: ModalProps) {
    return (
      <Form
        layout='vertical'
        onFinish={onChangePass}
        form={form}
      >
        <div className='modal-body p-3'>
          <div className='modal-title de-mb-2 modal-title-2'>
            Đổi mật khẩu
          </div>
          <Form.Item
            label='Mật khẩu cũ'
            name='oldPassword'
          >
            <Input.Password  />
          </Form.Item>
          <Form.Item
            label='Mật khẩu mới'
            name='newPassword'
          >
            <Input.Password  />
          </Form.Item>
          <div className='modal-actions'>
            <Button onClick={()=>props.modalRef.close()} danger className='w-50 me-3'>
              Huỷ
            </Button>
            <Button onClick={() => props.modalRef.close(form.getFieldsValue())} type='primary' className='btn btn-primary w-50'>
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </Form>
    )
  } 
  const {toggleCollapsed, collapsed} = props;
  const {logout, userInfo} = useSession();
  const openModalChangePass = () => {
    const modalChange = openModal(ModalChangePass,{ dialogClassName: 'de-modal-md modal-custom', closeButton: true});
    modalChange.afterClosed().subscribe(data=>{
      if (!data) {
        return
      }
      onChangePass(data);
    })
  };
  return (
    <Menu key="user" mode="horizontal" className={`header ${collapsed ? 'collapsed' : ''}`} style={{height: '72px'}}>
      <li>
        {/* <Button onClick={toggleCollapsed} className='btn-collapsed'>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
      </li>
      {/* <div className="rightContainer"> */}
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                Hi,
              </span>
              <span>{userInfo?.name}</span>
              <Avatar style={{ marginLeft: 8 }} src={userInfo?.avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="ChangePassWord" onClick={openModalChangePass}>
            Thay đổi mật khẩu
          </Menu.Item>
          <Menu.Item key="SignOut" onClick={logout}>
            Đăng xuất
          </Menu.Item>
        </SubMenu>
      {/* </div> */}
    </Menu>
  )
}

export default Header
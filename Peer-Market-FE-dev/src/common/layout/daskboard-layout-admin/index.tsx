/* eslint-disable no-return-await */
import { ModalPortal } from '@app/common/modal';
import React, { useState } from 'react';
import Header from './block/header';
import Menu from './block/menu';

interface DaskboardLayoutProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNode;
  data?: any;
}

export function DaskboardLayoutAdmin(props: DaskboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='app__main'>
      <div className="d-flex">
        <Menu collapsed={collapsed}/>
        <div className={`cms-main ${collapsed ? 'collapsed' : ''}`} style={{backgroundColor: '#f0f2f5'}}>
          <Header toggleCollapsed={toggleCollapsed} collapsed={collapsed}/> 
          <main className='content'>
            {props.children}
          </main>
        </div>
      </div>
      <ModalPortal />
    </div>
  )
}

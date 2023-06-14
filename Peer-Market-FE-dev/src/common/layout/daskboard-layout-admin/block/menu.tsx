import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { menuAdmin } from "@app/const/menu-admin";
import iconMap from "@app/utils/iconMap";
import { Button, MenuProps, MenuTheme } from "antd";
import { Menu as MenuAntd, Switch } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ScrollBar from "../../scrollbar";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Menu = (props) => {
  const { collapsed } = props;
  const [theme, setTheme] = useState<MenuTheme>("light");
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <>
      <div
        style={{
          maxWidth: `${collapsed ? "80px" : "256px"}`,
          backgroundColor: `${!collapsed ? "#ee4d2d" : "white"}`,
        }}
        className="menuContainer"
      >
        <div className="brand">
          <div className="logo">
            {!collapsed && <h1 className="text-white cursor-pointer" onClick={() => router.push("/")}>PeerMarket</h1>}
          </div>
        </div>
        <ScrollBar
          options={{
            // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
            suppressScrollX: true,
          }}
          style={{ backgroundColor: "white" }}
        >
          <MenuAntd
            theme={theme}
            onClick={onClick}
            defaultOpenKeys={menuAdmin
              .filter((item) => item.isOpen === current)
              .map((e) => `${e.key}`)}
            selectedKeys={[current]}
            mode="inline"
            inlineCollapsed={collapsed}
            selectable={true}
            items={menuAdmin}
          />
          {/* {generateMenus(data)} */}
          {/* </MenuAntd> */}
          {/* {!collapsed && (
            <div className="switchTheme">
              <span>
                <BulbOutlined />
                Switch Theme
              </span>
              <Switch
                onChange={changeTheme}
                defaultChecked={theme === 'dark'}
                checkedChildren={'Dark'}
                unCheckedChildren={'Light'}
              />
            </div>
          )} */}
        </ScrollBar>
      </div>
    </>
  );
};

export default Menu;

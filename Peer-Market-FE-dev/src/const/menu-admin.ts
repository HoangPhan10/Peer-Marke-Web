import iconMap from "@app/utils/iconMap";

export const menuAdmin = [
  {
    label: "Quản lý sản phẩm",
    key: 1,
    isOpen: "/admin/users",
    icon: iconMap["posts"],
    children: [
      {
        label: 'Tất cả sản phẩm',
        key: '/admin/list-product',
        icon: iconMap['list'],
      },
    ]
  },
  {
    label: "Quản lý đơn hàng",
    key: 2,
    isOpen: "/admin/users",
    icon: iconMap["posts"],
    children: [
      {
        label: 'Tất cả đơn hàng',
        key: '/admin/list-order',
        icon: iconMap['list'],
      },
    ]
  },
  {
    label: "Quản lý người dùng",
    key: 3,
    isOpen: "/admin/users",
    icon: iconMap["posts"],
    children: [
      {
        label: 'Tất cả người dùng',
        key: '/admin/list-user',
        icon: iconMap['list'],
      },
    ]
  },
];

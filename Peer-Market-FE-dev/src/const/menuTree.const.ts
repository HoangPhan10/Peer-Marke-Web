import iconMap from "@app/utils/iconMap";

export const menuTree = [
  {
    label: "Quản lý sản phẩm",
    key: 1,
    isOpen: "/admin/users",
    icon: iconMap["posts"],
    children: [
      {
        label: 'Tất cả sản phẩm',
        key: '/portal/product/list',
        icon: iconMap['list'],
      },
      {
        label: 'Thêm sản phẩm mới',
        key: '/portal/product/new',
        icon: iconMap['create'],
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
        key: '/portal/order',
        icon: iconMap['list'],
      },
    ]
  },
];

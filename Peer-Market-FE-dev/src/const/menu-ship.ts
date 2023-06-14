import iconMap from "@app/utils/iconMap";

export const menuShip = [
  {
    label: "Đơn hàng vận chuyển",
    key: 2,
    isOpen: "/admin/users",
    icon: iconMap["posts"],
    children: [
      {
        label: 'Tất cả đơn hàng',
        key: '/portal/ship',
        icon: iconMap['list'],
      },
    ]
  },
];

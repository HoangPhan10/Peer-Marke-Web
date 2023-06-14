export const TRADEMARK = [
  { value: "No brand", label: "No brand" },
  { value: "ADAM STORE", label: "ADAM STORE" },
  { value: "ALOHA", label: "ALOHA" },
  { value: "GENZ", label: "GENZ" },
  { value: "CHENNY", label: "CHENNY" },
  { value: "DEVIL", label: "DEVIL" },
  { value: "GLORIA JEANS", label: "GLORIA JEANS" },
  { value: "JK CLOTHING", label: "JK CLOTHING" },
  { value: "DISCOVERY", label: "DISCOVERY" },
  { value: "BI LUXURY", label: "BI LUXURY" },
  { value: "CLEMENT", label: "CLEMENT" },
  { value: "COVERMALE", label: "COVERMALE" },
  { value: "GREEN VALLEY", label: "GREEN VALLEY" },
  { value: "COOL MEN", label: "COOL MEN" },
  { value: "UNIQUE", label: "UNIQUE" },
];

export const MATERIAL = [
  { value: "Chinos", label: "Chinos" },
  { value: "Cotton", label: "Cotton" },
  { value: "Denim", label: "Denim" },
  { value: "Lông vũ", label: "Lông vũ" },
  { value: "Nỉ", label: "Nỉ" },
  { value: "Nỉ mỏng", label: "Nỉ mỏng" },
  { value: "Lông cừu", label: "Lông cừu" },
  { value: "Lông", label: "Lông" },
];

export const ORIGIN = [
  { value: "Trung Quốc", label: "Trung Quốc" },
  { value: "Ấn Độ", label: "Ấn Độ" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Nhật Bản", label: "Nhật Bản" },
  { value: "Hàn Quốc", label: "Hàn Quốc" },
  { value: "Đài Loan", label: "Đài Loan" },
  { value: "Thái Lan", label: "Thái Lan" },
  { value: "Mỹ", label: "Mỹ" },
  { value: "Việt Nam", label: "Việt Nam" },
  { value: "Brasil", label: "Brasil" },
  { value: "Argentina", label: "Argentina" },
];

export const STYLE = [
  { value: "Thể thao", label: "Thể thao" },
  { value: "Cơ bản", label: "Cơ bản" },
  { value: "Boho", label: "Boho" },
  { value: "Hàn Quốc", label: "Hàn Quốc" },
  { value: "Retro", label: "Retro" },
  { value: "Đường phố", label: "Đường phố" },
  { value: "Công sở", label: "Công sở" },
  { value: "Nhiệt đới", label: "Nhiệt đới" },
];

export const SAMPLE = [
  { value: "Họa tiết", label: "Họa tiết" },
  { value: "Sọc caro", label: "Sọc caro" },
  { value: "Hoa", label: "Hoa" },
  { value: "Trơn", label: "Trơn" },
  { value: "Chấm bi", label: "Chấm bi" },
  { value: "In", label: "In" },
  { value: "Sọc", label: "Sọc" },
];
export const ANSWER = [
  { value: "Có", label: "Có" },
  { value: "Không", label: "Không" },
];

export const DESIGNS = [
  { value: "Cổ điển", label: "Cổ điển" },
  { value: "Rộng", label: "Rộng" },
  { value: "Cơ bắp", label: "Cơ bắp" },
  { value: "Oversized", label: "Oversized" },
  { value: "Slim", label: "Slim" },
  { value: "Ôm sát", label: "Ôm sát" },
];

export const SEASON = [
  { value: "Mùa đông", label: "Mùa đông" },
  { value: "Mùa hè", label: "Mùa hè" },
  { value: "Mùa thu", label: "Mùa thu" },
  { value: "Mùa xuân", label: "Mùa xuân" },
];

export const COLLAR_STYLE = [
  { value: "Spread Collar", label: "Spread Collar" },
  { value: "Pinned Collar", label: "Pinned Collar" },
  { value: "Mandarin Collar", label: "Mandarin Collar" },
  { value: "Grandad Collar", label: "Grandad Collar" },
  { value: "Club Collar", label: "Club Collar" },
  { value: "Truyền thống", label: "Truyền thống" },
];

export const LIST_SELECT = [
  {
    list: [
      {
        label: "Thương hiệu",
        name: "trade_mark",
        message: "Vui lòng chọn thương hiệu.",
        options: TRADEMARK,
      },
      {
        label: "Phong cách",
        name: "style",
        message: "Vui lòng chọn phong cách.",
        options: STYLE,
      },
    ],
  },
  {
    list: [
      {
        label: "Chất liệu",
        name: "material",
        message: "Vui lòng chọn chất liệu.",
        options: MATERIAL,
      },
      {
        label: "Xuất xứ",
        name: "origin",
        message: "Vui lòng chọn xuất xứ.",
        options: ORIGIN,
      },
    ],
  },
  {
    list: [
      {
        label: "Mẫu",
        name: "sample",
        message: "Vui lòng chọn mẫu.",
        options: SAMPLE,
      },
      {
        label: "Mùa",
        name: "season",
        message: "Vui lòng chọn mùa.",
        options: SEASON,
      },
    ],
  },
  {
    list: [
      {
        label: "Tall Fit",
        name: "tall_fit",
        message: "Vui lòng chọn.",
        options: ANSWER,
      },
      {
        label: "Rất lớn",
        name: "very_big",
        message: "Vui lòng chọn.",
        options: ANSWER,
      },
    ],
  },
  {
    list: [
      {
        label: "Kiểu dáng",
        name: "design",
        message: "Vui lòng chọn.",
        options: DESIGNS,
      },
      {
        label: "Cổ tay",
        name: "collar",
        message: "Vui lòng chọn.",
        options: COLLAR_STYLE,
      },
    ],
  },
];

export const OPTION_COLOR = [
  { value: "Black" },
  { value: "Lime" },
  { value: "Red" },
  { value: "Yellow" },
  { value: "Blue" },
  { value: "Fuchsia" },
  { value: "Silver" },
  { value: "Navy" },
  { value: "Teal" },
  { value: "Purple" },
];
export const OPTION_SIZE = [
  { value: "XS" },
  { value: "S" },
  { value: "M" },
  { value: "L" },
  { value: "XL" },
  { value: "2XL" },
  { value: "3XL" },
  { value: "4XL" },
  { value: "5XL" },
];

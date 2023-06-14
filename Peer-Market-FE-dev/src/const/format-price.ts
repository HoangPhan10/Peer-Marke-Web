export const FORMAT_PRICE = (price:string) => {
  const format = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return format;
}

export const dayTransport = (id: number) => {
  const day = new Date();
  if (id === 1) {
    return `Nhận hàng vào ${day.getDate() + 4} Th0${day.getMonth() + 1} - ${
      day.getDate() + 6
    } Th0${day.getMonth() + 1}`;
  }
  if (id === 2) {
    return `Nhận hàng vào ${day.getDate() + 6} Th0${day.getMonth() + 1} - ${
      day.getDate() + 8
    } Th0${day.getMonth() + 1}`;
  }
  return `Nhận hàng vào ${day.getDate() + 2} Th0${day.getMonth() + 1} - ${
    day.getDate() + 4
  } Th0${day.getMonth() + 1}`;
};
import { createAddress } from "@app/api/address/create-address";
import { createShop } from "@app/api/shop/create-shop";
import { useSubscription } from "@app/hooks/subscription";
import {
  Button,
  Col,
  Row,
  Switch
} from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

interface ShopTransportProps {
  data: any;
  prev: () => void;
  next:()=>void;
}

const ShopTransport = (props: ShopTransportProps) => {
  const { data, prev,next } = props;
  const [isExpress, setIsExpress] = useState<boolean>(true);
  const [isStandard, setIsStandard] = useState<boolean>(true);
  const [isEconomy, setIsEconomy] = useState<boolean>(true);
  const subscription = useSubscription();
  const onSubmit = () => {
    if (isExpress || isEconomy || isStandard) {
      const listTransport = [];
      if (isExpress) listTransport.push(1);
      if (isEconomy) listTransport.push(3);
      if (isStandard) listTransport.push(2);
      const dataAddress = {
        ...data.address,
        userId: data.id_user,
      };
      const create = createAddress(dataAddress).subscribe(
        (res) => {
          const dataShop = {
            name: data.name,
            id_user: data.id_user,
            id_address: res.data.id,
            list_transport: listTransport,
          };
          createShop(dataShop).subscribe(
            (res) => {
              next()
            },
            (err) => {
              console.timeLog("Tạo shop không thành công");
            }
          );
        },
        (err) => {
          toast.error("Tạo địa chỉ giao hàng không thành công");
        }
      );
      subscription.add(create);
    }
  };
  return (
    <>
      <Row className="d-flex justify-content-center shop-transport">
        <Col span={18}>
          <div className="text-start shop-transport-title">
            <p className="mb-0">Phương thức vận chuyển</p>
            <p className="shop-transport-title-msg">
              Kích hoạt phương thức vận chuyển phù hợp
            </p>
          </div>
          <div className="text-start mt-2">
            <p className="mb-3">Express</p>
            <div className="d-flex justify-content-between shop-transport-content">
              <p>
                Hỏa Tốc{" "}
                <span className="shop-transport-content-warning">
                  {"[COD đã được kích hoạt]"}
                </span>
              </p>
              <Switch checked={isExpress} onChange={setIsExpress} />
            </div>
          </div>
          <div className="text-start mt-2">
            <p className="mb-3">Standard</p>
            <div className="d-flex justify-content-between shop-transport-content">
              <p>
                Nhanh{" "}
                <span className="shop-transport-content-warning">
                  {"[COD đã được kích hoạt]"}
                </span>
              </p>
              <Switch checked={isStandard} onChange={setIsStandard} />
            </div>
          </div>
          <div className="text-start mt-2">
            <p className="mb-3">Economy</p>
            <div className="d-flex justify-content-between shop-transport-content">
              <p>
                Tiết kiệm{" "}
                <span className="shop-transport-content-warning">
                  {"[COD đã được kích hoạt]"}
                </span>
              </p>
              <Switch checked={isEconomy} onChange={setIsEconomy} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between shop-transport-footer">
        <Button className="button-normal" onClick={prev}>
          Quay lại
        </Button>
        <Button className="button-danger" onClick={onSubmit}>
          Hoàn tất
        </Button>
      </Row>
    </>
  );
};

export default ShopTransport;
import { AuthLayout } from './auth-layout';
import { ChannelSellerRegister } from './channel-seller-Register';
import { ChannelSellerLayout } from './channel-seller-layout';
import { DaskboardLayout } from './daskboard-layout';
import { DaskboardLayoutShip } from './daskboard-layout copy';
import { DaskboardLayoutAdmin } from './daskboard-layout-admin';
import { HeaderCustomerLayout } from './header-customer-layout';
import UserLayout from './user-layout';

export { PageWrapper } from './page-wrapper';

export enum CrmCMSLayout {
  DASKBOARD,
  AUTH,
  CHANNEL_SELLER,
  CHANNEL_SELLER_REGISTER,
  HEADER_CUSTOMER,
  DASKBOARD_SHIP,
  DASKBOARD_ADMIN,
  USER_LAYOUT
}

const availableLayout = {
  [CrmCMSLayout.AUTH]: AuthLayout,
  [CrmCMSLayout.DASKBOARD]: DaskboardLayout,
  [CrmCMSLayout.DASKBOARD_SHIP]: DaskboardLayoutShip,
  [CrmCMSLayout.DASKBOARD_ADMIN]: DaskboardLayoutAdmin,
  [CrmCMSLayout.CHANNEL_SELLER]: ChannelSellerLayout,
  [CrmCMSLayout.CHANNEL_SELLER_REGISTER]: ChannelSellerRegister,
  [CrmCMSLayout.HEADER_CUSTOMER]: HeaderCustomerLayout,
  [CrmCMSLayout.USER_LAYOUT]: UserLayout,

}

export function getLayout(layout?: CrmCMSLayout) {
  return availableLayout[layout || CrmCMSLayout.DASKBOARD];
}

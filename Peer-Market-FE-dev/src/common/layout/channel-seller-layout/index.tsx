import { Row } from "antd";
import React from "react";
import { useRouter } from "next/router";
import { checkPathReturnTitle } from "@app/utils/titlePage";
import Link from "next/link";
interface ChannelSellerLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export function ChannelSellerLayout(props: ChannelSellerLayoutProps) {
  const router = useRouter();
  return (
    <section className="vh-100 channel-sell">
      <Row className=" w-100 py-3 channel-sell-header">
        <Row className="container d-flex">
        <Link href={"/"}>
              <img className="cursor-pointer"  src="/assets/images/logo/logo2.svg" />
            </Link>
          <h4 className="pt-16">{checkPathReturnTitle(router.asPath)}</h4>
        </Row>
      </Row>
      <Row>{props.children}</Row>
    </section>
  );
}

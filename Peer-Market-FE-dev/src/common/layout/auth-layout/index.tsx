import { Col, Row } from "antd";
import React, { useEffect } from "react";
import Logo from "styles/uikit/media/iconset/Logo.svg";

interface AuthLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export function AuthLayout(props: AuthLayoutProps) {
  return (
    <section className="vh-100 auth-page">
      <Row className="h-100">
        <Col span={8} className="bg-primary">
          <div>
            <div className="title">
              CMS
            </div>
            <div className="sub-title">
              Discover Start<br/>
              with great build tools
            </div>
            <div className="bg-img"></div>
          </div>
        </Col>
        <Col span={16}>
          <div className="auth-form">
            {props.children}
          </div>
        </Col>
      </Row>
    </section>
  );
}

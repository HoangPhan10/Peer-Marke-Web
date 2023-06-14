import { CrmCMSLayout, getLayout } from "@app/common/layout";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.scss";

import { store } from "@app/redux/store";
import { checkUserLogin } from "@app/services/auth";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type NextPageWithLayout = NextPage & {
  layout?: CrmCMSLayout;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CrmCMSApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = getLayout(Component.layout);
  const [showLoading, setShowLoading] = useState(true);
  const hideLoading = () => {
    setTimeout(() => {
      setShowLoading(false);
    }, 500);
  };

  useEffect(() => {
    window.onload = () => {
      hideLoading();
    };
  }, []);
  const router = useRouter();
  useEffect(() => {
    hideLoading();
    if (!router.asPath.includes("/register")) {
      if (!checkUserLogin()) {
        // router.push("/channel-seller/login");
      }
    }
  }, [router.asPath]);

  return (
    <Provider store={store}>
      <Layout>
        {/* <Loading show={showLoading} /> */}
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
      </Layout>
    </Provider>
  );
}

export default CrmCMSApp;

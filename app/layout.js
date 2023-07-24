import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "animate.css";

import { WebInfoProvider } from "context/webinfoContext";
import { MenuProvider } from "context/menuContext";
import { CartProvider } from "context/cartContext";
import Footer from "components/Generals/Footer";
import { AuthProvider } from "context/authContext";
import { ToastContainer } from "react-toastify";
import { PayProvider } from "context/payContext";
import { NotificationProvider } from "context/notificationContext";
import Header from "components/Generals/Header";
import MobileFooter from "components/Generals/MobileFooter";
import { SearchProvider } from "context/searchContext";
import { SearchWheelProvider } from "context/searchWheelContext";
import { SideSearchProvider } from "context/sideSearchContext";
import { SearchSetProductProvider } from "context/searchSetProductContext";
import { SearchProductProvider } from "context/searchProductContext";
import { Suspense } from "react";
import Loader from "components/Generals/Loader";

export const metadata = {
  title: `Gotire.mn - автомашины дугуй, обудын худалдаа`,
  description: "Gotire.mn - автомашины дугуй, обудын худалдаа",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loader />}>
          <NotificationProvider>
            <AuthProvider>
              <SearchProductProvider>
                <SearchSetProductProvider>
                  <SideSearchProvider>
                    <SearchWheelProvider>
                      <SearchProvider>
                        <PayProvider>
                          <CartProvider>
                            <MenuProvider>
                              <WebInfoProvider>
                                <Header />
                                {children}
                                <MobileFooter />
                                <Footer />
                                <ToastContainer
                                  position="top-right"
                                  autoClose={5000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                />
                              </WebInfoProvider>
                            </MenuProvider>
                          </CartProvider>
                        </PayProvider>
                      </SearchProvider>
                    </SearchWheelProvider>
                  </SideSearchProvider>
                </SearchSetProductProvider>
              </SearchProductProvider>
            </AuthProvider>
          </NotificationProvider>
        </Suspense>
      </body>
    </html>
  );
}

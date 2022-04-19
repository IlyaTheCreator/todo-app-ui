import React from "react";

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element;
}

/**
 * AUX component for setting general layout for the app
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

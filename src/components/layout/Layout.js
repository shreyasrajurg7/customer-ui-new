import "./Layout.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Content from "../content/Content";
import Footer from "../footer/Footer";
const Layout = () => {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import Announcement from "../components/Anoucement";
import Navbar from "../components/Navbar";

function Layout() {
    return (
      <div className="layout">
        <div className="navbar">
        <Announcement/>
          
          <Navbar />
        </div>
        <div className="content">
          <Outlet/>
        </div>
      </div>
    );
  }
  export default Layout;
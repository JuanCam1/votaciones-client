/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";
const minutes = 10;
const milliseconds = minutes * 60 * 1000;

const DashboardPage = () => {
  const logout = useAuthStore((state) => state.logoutUser);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    let logoutTimer = setTimeout(() => {
      onLogout();
    }, milliseconds);

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        onLogout();
      }, milliseconds);
    };

    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keydown", resetLogoutTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keydown", resetLogoutTimer);
    };
  }, [milliseconds, onLogout]);

  return (
    <section className="h-full">
      <Navbar />
      <div className="flex h-full pt-16 ">
        <Sidebar />
        <div className="max-lg:pl-10 pl-60 flex-1">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;

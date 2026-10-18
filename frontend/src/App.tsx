import React, { useState, useEffect } from "react";
import { PortfolioData } from "./types";
import { fetchPortfolioData, initialPortfolioData } from "./lib/api";
import { Portfolio } from "./pages/Portfolio";
import { Admin } from "./pages/Admin";
import { Toaster } from "sonner";

export const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname === "/admin" || window.location.hash === "#admin"
      ? "/admin"
      : "/";
  });

  const loadData = async () => {
    const res = await fetchPortfolioData();
    setData(res);
  };

  useEffect(() => {
    loadData();

    const handlePopState = () => {
      if (window.location.pathname === "/admin" || window.location.hash === "#admin") {
        setCurrentRoute("/admin");
      } else {
        setCurrentRoute("/");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    window.history.pushState({}, "", route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {currentRoute === "/admin" ? (
        <Admin
          data={data}
          onRefresh={loadData}
          onNavigateHome={() => navigateTo("/")}
        />
      ) : (
        <Portfolio
          data={data}
          onNavigateAdmin={() => navigateTo("/admin")}
        />
      )}
      <Toaster position="bottom-right" theme="dark" richColors />
    </>
  );
};

export default App;

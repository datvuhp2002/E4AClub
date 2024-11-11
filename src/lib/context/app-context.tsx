"use client";

// import ConfigService from "@/services/config-service";
import Script from "next/script";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [webInfo, setWebInfo] = useState();
  //   useEffect(() => {
  //     GetConfigDocument();
  //   }, []);
  //   const GetConfigDocument = async () => {
  //     var res = await ConfigService.GetConfigDocument("webinfo");
  //     setWebInfo(res.Data);
  //   };
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, webInfo }}
    >
      {children}
      {typeof window !== "undefined" &&
      window.navigator.userAgent.indexOf("Mobi") > -1 ? (
        <></>
      ) : (
        <Script src={process.env.FILE_URL + "js/mudim.js"} />
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = (): any => useContext(AppContext);

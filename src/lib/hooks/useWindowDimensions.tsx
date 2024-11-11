import { useEffect, useState } from "react";



const useWindowDimensions = () => {
    const getWindowDimensions = () => {
      if (typeof window !== "undefined") {
        return { width: window.innerWidth, height: window.innerHeight }
      }
      return { width: undefined, height: undefined }
    }
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }
  export default useWindowDimensions;
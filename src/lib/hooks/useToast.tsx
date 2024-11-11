import React, { useState } from "react";
interface IConfigToast {
  type: String;
  content: String;
}
const useToast = () => {
  let [showToast, setShowToast] = useState(false);
  let [configToast, setConfigToast] = useState<IConfigToast>({
    type: "",
    content: "",
  });

  let HandleOpenToast = (config: IConfigToast) => {
    setShowToast(true);
    setConfigToast(config);
  };

  return { showToast, setShowToast, configToast, HandleOpenToast };
};

export default useToast;

"use client"
import BootstrapIcon from "../bootstrap-icon";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
interface Props {
  
}
const Index = (props: Props) => {
  const [clientInfo, setClientInfo] = useState<any>();
  useEffect(() => {
    getClientMachine();
  }, [])
  const getClientMachine = async () => {
    try
    {
      const response = await axios.get('http://ip-api.com/json/');
      const data = response.data;
      setClientInfo(data)
    }
    catch
    {
      setClientInfo({
        city : "",
        country : "Vietnam"
      }) 
    }
  }
  return (
    <div className="row">
    <div className={"col-sm-12 text-center " + styles["location-current"]}>
      <span className="text-white">{clientInfo && <>
        <BootstrapIcon iconName='GeoAltFill' style={{ marginTop: -3, marginRight: 5 }} />
        {(clientInfo.city ?  clientInfo.city + "," : "") + clientInfo.country}
      </>}</span>
    </div>
  </div>
  );
};

export default Index;

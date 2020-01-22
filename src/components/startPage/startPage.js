import services from "../../services";
import "./startPage.css";


export const fetcher = async () => {
  const response = await services.getAllAds();
  console.log("response :", response);
};

fetcher();
